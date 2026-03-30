// ============================================
// THITRONIK Course Detail Page
// ============================================

import { Auth } from '../auth.js';
import { API } from '../store.js';
import { renderProgressBar, statusBadge, showToast, Icons } from '../components.js';

export function renderCourseDetail(params) {
  const user = Auth.getCurrentUser();
  const course = API.getCourse(params.id);
  const content = document.getElementById('page-content');

  if (!course) {
    content.innerHTML = '<div class="empty-state"><div class="empty-state-icon">❌</div><div class="empty-state-title">Kurs nicht gefunden</div></div>';
    return;
  }

  const lessons = API.getLessons(course.id);
  const progress = API.getCourseProgress(user.id, course.id);
  const enrolled = API.isEnrolled(user.id, course.id);

  content.innerHTML = `
    <div class="lesson-nav">
      <a class="lesson-nav-back" href="#/courses">${Icons.chevronLeft} Zurück zur Übersicht</a>
    </div>

    <div class="course-hero animate-fade-in-up">
      <div class="course-hero-content">
        <div style="font-size:48px;margin-bottom:var(--sp-4)">${course.icon}</div>
        <h1>${course.title}</h1>
        <p class="course-hero-desc">${course.description}</p>
        <div class="course-hero-meta">
          <span class="course-hero-meta-item">${Icons.lesson} ${lessons.length} Lektionen</span>
          <span class="course-hero-meta-item">${Icons.clock} ${course.estimatedDuration}</span>
          <span class="course-hero-meta-item">${statusBadge(course.status)}</span>
        </div>
        ${enrolled ? `
          <div style="margin-top:var(--sp-6);max-width:400px">
            ${renderProgressBar(progress.percent, 'progress-bar-lg')}
            <div class="progress-text" style="color:rgba(255,255,255,0.8)">${progress.percent}% abgeschlossen (${progress.completed}/${progress.total})</div>
          </div>
        ` : `
          <button class="btn btn-primary btn-lg" style="margin-top:var(--sp-6);background:var(--th-blue-secondary)" id="enroll-btn">
            Kurs starten
          </button>
        `}
      </div>
    </div>

    <div class="section animate-fade-in-up stagger-2">
      <h2 class="section-title" style="margin-bottom:var(--sp-6)">Lektionen</h2>
      <div class="lesson-list">
        ${lessons.length === 0 ? `
          <div class="callout callout-info">
            <div class="callout-title">Keine Lektionen</div>
            Für diesen Kurs sind noch keine Lektionen vorhanden.
          </div>
        ` : lessons.map((l, i) => {
          const lp = API.getLessonProgress(user.id, l.id);
          const status = lp ? lp.status : 'not_started';
          const numClass = status === 'completed' ? 'completed' : (status === 'in_progress' ? 'active' : '');
          return `
            <div class="lesson-item animate-fade-in-up stagger-${Math.min(i + 1, 6)}" onclick="window.location.hash='/lessons/${l.id}'">
              <div class="lesson-number ${numClass}">
                ${status === 'completed' ? Icons.check : (i + 1)}
              </div>
              <div class="lesson-info">
                <div class="lesson-title">${l.title}</div>
                <div class="lesson-duration">${Icons.clock} ${l.estimatedDuration} ${l.hasQuiz ? '· 📝 Quiz' : ''}</div>
              </div>
              <div class="lesson-status">
                ${statusBadge(status)}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  const enrollBtn = document.getElementById('enroll-btn');
  if (enrollBtn) {
    enrollBtn.addEventListener('click', () => {
      API.enroll(user.id, course.id);
      showToast('Erfolgreich eingeschrieben!', 'success');
      renderCourseDetail(params);
    });
  }
}
