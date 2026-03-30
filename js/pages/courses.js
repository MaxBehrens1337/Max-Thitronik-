// ============================================
// THITRONIK Courses Page
// ============================================

import { Auth } from '../auth.js';
import { API } from '../store.js';
import { renderProgressBar, statusBadge, Icons } from '../components.js';

export function renderCourses() {
  const user = Auth.getCurrentUser();
  const courses = API.getCourses().sort((a, b) => a.sortOrder - b.sortOrder);
  const content = document.getElementById('page-content');

  let activeFilter = 'all';

  function render() {
    const filtered = courses.filter(c => {
      if (activeFilter === 'all') return c.status === 'published' || Auth.isAdmin();
      if (activeFilter === 'enrolled') return API.isEnrolled(user.id, c.id);
      if (activeFilter === 'completed') {
        const p = API.getCourseProgress(user.id, c.id);
        return p.percent === 100;
      }
      if (activeFilter === 'in_progress') {
        const p = API.getCourseProgress(user.id, c.id);
        return p.percent > 0 && p.percent < 100;
      }
      return true;
    });

    content.innerHTML = `
      <div class="page-header">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Kursübersicht</h1>
            <p class="page-subtitle">${courses.filter(c => c.status === 'published').length} Kurse verfügbar</p>
          </div>
        </div>
      </div>

      <div class="courses-filters">
        <button class="filter-chip ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">Alle Kurse</button>
        <button class="filter-chip ${activeFilter === 'enrolled' ? 'active' : ''}" data-filter="enrolled">Eingeschrieben</button>
        <button class="filter-chip ${activeFilter === 'in_progress' ? 'active' : ''}" data-filter="in_progress">In Bearbeitung</button>
        <button class="filter-chip ${activeFilter === 'completed' ? 'active' : ''}" data-filter="completed">Abgeschlossen</button>
      </div>

      <div class="grid-auto">
        ${filtered.map((c, i) => {
          const p = API.getCourseProgress(user.id, c.id);
          const lessons = API.getLessons(c.id);
          const enrolled = API.isEnrolled(user.id, c.id);
          return `
            <div class="card card-clickable course-card animate-fade-in-up stagger-${Math.min(i + 1, 6)}" onclick="window.location.hash='/courses/${c.id}'">
              ${c.status !== 'published' ? `<div class="course-card-status">${statusBadge(c.status)}</div>` : ''}
              <div class="course-card-thumb">
                <span>${c.icon}</span>
              </div>
              <div class="card-body">
                <h3 class="card-title">${c.title}</h3>
                <p class="card-text">${c.description}</p>
                <div class="card-meta">
                  <span class="card-meta-item">${Icons.lesson} ${lessons.length} Lektionen</span>
                  <span class="card-meta-item">${Icons.clock} ${c.estimatedDuration}</span>
                </div>
                ${enrolled ? `
                  <div style="margin-top:var(--sp-3)">
                    ${renderProgressBar(p.percent)}
                    <div class="progress-text">${p.percent}% abgeschlossen</div>
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      ${filtered.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">📚</div>
          <div class="empty-state-title">Keine Kurse gefunden</div>
          <div class="empty-state-text">Für den gewählten Filter gibt es keine passenden Kurse.</div>
        </div>
      ` : ''}
    `;

    content.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        activeFilter = chip.dataset.filter;
        render();
      });
    });
  }

  render();
}
