// ============================================
// THITRONIK Results & Profile Pages
// ============================================

import { Auth } from '../auth.js';
import { API } from '../store.js';
import { renderProgressBar, statusBadge, Icons } from '../components.js';

export function renderResults(params) {
  const user = Auth.getCurrentUser();
  const lessonId = params.id;
  const lesson = API.getLesson(lessonId);
  const attempts = API.getQuizAttempts(user.id, lessonId);
  const lastAttempt = attempts[attempts.length - 1];
  const content = document.getElementById('page-content');

  if (!lastAttempt) {
    content.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📊</div><div class="empty-state-title">Kein Ergebnis vorhanden</div><div class="empty-state-text"><a href="#/courses">Zurück zu den Kursen</a></div></div>';
    return;
  }

  const passed = lastAttempt.passed;

  content.innerHTML = `
    <div style="max-width:600px;margin:0 auto">
      <div class="results-card animate-scale-in">
        <div class="results-icon">${passed ? '🎉' : '📝'}</div>
        <h2 style="color:var(--th-blue-primary);margin-bottom:var(--sp-2)">${passed ? 'Bestanden!' : 'Nicht bestanden'}</h2>
        <p style="color:var(--gray-dark);margin-bottom:var(--sp-6)">${lesson ? lesson.title : 'Quiz'}</p>
        
        <div class="results-score" style="color:${passed ? 'var(--color-success)' : 'var(--color-error)'}">${lastAttempt.score}%</div>
        <div class="results-label">${passed ? 'Herzlichen Glückwunsch!' : 'Mindestens 70% zum Bestehen erforderlich.'}</div>

        <div class="results-detail">
          <div class="results-detail-item">
            <div class="results-detail-value text-success">${lastAttempt.correct}</div>
            <div class="results-detail-label">Richtig</div>
          </div>
          <div class="results-detail-item">
            <div class="results-detail-value text-error">${lastAttempt.total - lastAttempt.correct}</div>
            <div class="results-detail-label">Falsch</div>
          </div>
          <div class="results-detail-item">
            <div class="results-detail-value text-primary">${lastAttempt.total}</div>
            <div class="results-detail-label">Gesamt</div>
          </div>
        </div>

        ${renderProgressBar(lastAttempt.score, 'progress-bar-lg')}

        <div class="btn-group" style="justify-content:center;margin-top:var(--sp-8)">
          <button class="btn btn-secondary" onclick="window.location.hash='/quiz/${lessonId}'">Quiz wiederholen</button>
          <button class="btn btn-primary" onclick="window.location.hash='/courses/${lesson ? lesson.courseId : ''}'">Zum Kurs</button>
        </div>

        ${attempts.length > 1 ? `
          <div style="margin-top:var(--sp-8);text-align:left">
            <h3 style="font-size:var(--fs-body);font-weight:var(--fw-bold);margin-bottom:var(--sp-3)">Bisherige Versuche</h3>
            ${attempts.map((a, i) => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--sp-2) 0;border-bottom:1px solid var(--gray-soft);font-size:var(--fs-body-sm)">
                <span>Versuch ${i + 1}</span>
                <span>${a.score}% ${a.passed ? '✅' : '❌'}</span>
                <span style="color:var(--gray-dark)">${new Date(a.date).toLocaleDateString('de-DE')}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

export function renderProfile() {
  const user = Auth.getCurrentUser();
  const courses = API.getCourses();
  const enrollments = API.getEnrollments(user.id);
  const allAttempts = API.getAllQuizAttempts().filter(a => a.userId === user.id);
  const content = document.getElementById('page-content');

  const completedCourses = courses.filter(c => {
    const p = API.getCourseProgress(user.id, c.id);
    return p.percent === 100;
  });

  const initials = (user.firstName?.[0] || '') + (user.lastName?.[0] || '');

  content.innerHTML = `
    <div class="page-header"><h1 class="page-title">Mein Profil</h1></div>

    <div class="profile-header animate-fade-in-up">
      <div class="profile-avatar">${initials}</div>
      <div class="profile-info">
        <h2>${user.firstName} ${user.lastName}</h2>
        <div class="profile-role">${statusBadge(user.role === 'admin' ? 'published' : user.role === 'trainer' ? 'review' : 'draft')} ${user.role === 'admin' ? 'Administrator' : user.role === 'trainer' ? 'Trainer' : 'Lernender'}</div>
        <div style="font-size:var(--fs-caption);color:var(--gray-dark);margin-top:var(--sp-1)">${user.email}</div>
      </div>
      <div class="profile-stats">
        <div class="profile-stat">
          <div class="profile-stat-value">${enrollments.length}</div>
          <div class="profile-stat-label">Kurse</div>
        </div>
        <div class="profile-stat">
          <div class="profile-stat-value">${completedCourses.length}</div>
          <div class="profile-stat-label">Abgeschlossen</div>
        </div>
        <div class="profile-stat">
          <div class="profile-stat-value">${allAttempts.filter(a => a.passed).length}</div>
          <div class="profile-stat-label">Quizze bestanden</div>
        </div>
      </div>
    </div>

    <div class="section animate-fade-in-up stagger-2">
      <h3 class="section-title" style="margin-bottom:var(--sp-6)">Kurs-Fortschritt</h3>
      <div class="card">
        <div class="card-body" style="padding:0">
          ${courses.filter(c => c.status === 'published').map(c => {
            const p = API.getCourseProgress(user.id, c.id);
            return `
              <div class="course-progress-item" onclick="window.location.hash='/courses/${c.id}'">
                <div class="course-progress-icon" style="background:var(--gray-soft)">${c.icon}</div>
                <div class="course-progress-info">
                  <div class="course-progress-name">${c.title}</div>
                  <div style="margin-top:4px">${renderProgressBar(p.percent)}</div>
                </div>
                <div class="course-progress-percent">${p.percent}%</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}
