// ============================================
// THITRONIK Dashboard Page
// ============================================

import { Auth } from '../auth.js';
import { API } from '../store.js';
import { renderProgressBar, statusBadge, Icons } from '../components.js';

export function renderDashboard() {
  const user = Auth.getCurrentUser();
  const courses = API.getCourses().filter(c => c.status === 'published' || Auth.isAdmin());
  const enrollments = API.getEnrollments(user.id);
  const allProgress = API.getProgress(user.id);
  const allAttempts = API.getAllQuizAttempts().filter(a => a.userId === user.id);

  // Stats
  const enrolledCount = enrollments.length;
  const completedCourses = courses.filter(c => {
    const p = API.getCourseProgress(user.id, c.id);
    return p.percent === 100;
  }).length;
  const totalQuizzes = allAttempts.length;
  const passedQuizzes = allAttempts.filter(a => a.passed).length;

  // Recent courses with progress
  const coursesWithProgress = courses.slice(0, 6).map(c => {
    const p = API.getCourseProgress(user.id, c.id);
    return { ...c, progress: p };
  });

  const content = document.getElementById('page-content');
  content.innerHTML = `
    <div class="dashboard-welcome animate-fade-in-up">
      <h2>Willkommen zurück, ${user.firstName}! 👋</h2>
      <p>Setzen Sie Ihre Schulungen fort und erweitern Sie Ihr Fachwissen.</p>
    </div>

    <div class="dashboard-stats">
      <div class="stat-card animate-fade-in-up stagger-1">
        <div class="stat-icon primary">📚</div>
        <div class="stat-content">
          <div class="stat-value">${courses.length}</div>
          <div class="stat-label">Verfügbare Kurse</div>
        </div>
      </div>
      <div class="stat-card animate-fade-in-up stagger-2">
        <div class="stat-icon secondary">📝</div>
        <div class="stat-content">
          <div class="stat-value">${enrolledCount}</div>
          <div class="stat-label">Eingeschrieben</div>
        </div>
      </div>
      <div class="stat-card animate-fade-in-up stagger-3">
        <div class="stat-icon lime">✅</div>
        <div class="stat-content">
          <div class="stat-value">${completedCourses}</div>
          <div class="stat-label">Abgeschlossen</div>
        </div>
      </div>
      <div class="stat-card animate-fade-in-up stagger-4">
        <div class="stat-icon error">🏆</div>
        <div class="stat-content">
          <div class="stat-value">${passedQuizzes}/${totalQuizzes}</div>
          <div class="stat-label">Quizze bestanden</div>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="section animate-fade-in-up">
        <div class="section-header">
          <h3 class="section-title">Ihre Kurse</h3>
          <a href="#/courses" class="btn btn-tertiary">Alle anzeigen ${Icons.chevronRight}</a>
        </div>
        <div class="card">
          <div class="card-body" style="padding:0">
            <div class="course-progress-list">
              ${coursesWithProgress.map(c => `
                <div class="course-progress-item" onclick="window.location.hash='/courses/${c.id}'">
                  <div class="course-progress-icon" style="background:var(--gray-soft)">${c.icon}</div>
                  <div class="course-progress-info">
                    <div class="course-progress-name">${c.title}</div>
                    <div style="margin-top:4px">${renderProgressBar(c.progress.percent)}</div>
                    <div class="course-progress-meta">${c.progress.completed}/${c.progress.total} Lektionen</div>
                  </div>
                  <div class="course-progress-percent">${c.progress.percent}%</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="section animate-fade-in-up stagger-2">
        <div class="section-header">
          <h3 class="section-title">Aktivität</h3>
        </div>
        <div class="card">
          <div class="card-body">
            ${allAttempts.length === 0 ? `
              <div class="empty-state" style="padding:var(--sp-8)">
                <div class="empty-state-icon">📝</div>
                <div class="empty-state-title">Noch keine Aktivität</div>
                <div class="empty-state-text">Starten Sie Ihren ersten Kurs, um Ihren Fortschritt zu verfolgen.</div>
              </div>
            ` : `
              <div style="display:flex;flex-direction:column;gap:var(--sp-3)">
                ${allAttempts.slice(-5).reverse().map(a => {
                  const lesson = API.getLesson(a.lessonId);
                  return `
                    <div style="display:flex;align-items:center;gap:var(--sp-3);padding:var(--sp-2) 0;border-bottom:1px solid var(--gray-soft)">
                      <span>${a.passed ? '✅' : '❌'}</span>
                      <div style="flex:1">
                        <div style="font-size:var(--fs-body-sm);font-weight:var(--fw-medium)">${lesson ? lesson.title : 'Quiz'}</div>
                        <div style="font-size:var(--fs-caption);color:var(--gray-dark)">${a.score}% – ${new Date(a.date).toLocaleDateString('de-DE')}</div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
}
