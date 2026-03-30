// ============================================
// THITRONIK Lesson Page
// ============================================

import { Auth } from '../auth.js';
import { API } from '../store.js';
import { showToast, Icons } from '../components.js';

export function renderLesson(params) {
  const user = Auth.getCurrentUser();
  const lesson = API.getLesson(params.id);
  const content = document.getElementById('page-content');

  if (!lesson) {
    content.innerHTML = '<div class="empty-state"><div class="empty-state-icon">❌</div><div class="empty-state-title">Lektion nicht gefunden</div></div>';
    return;
  }

  const course = API.getCourse(lesson.courseId);
  const lessons = API.getLessons(lesson.courseId);
  const currentIdx = lessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIdx > 0 ? lessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < lessons.length - 1 ? lessons[currentIdx + 1] : null;
  const hasQuiz = lesson.hasQuiz && API.getQuestions(lesson.id).length > 0;

  // Mark as in_progress
  API.enroll(user.id, lesson.courseId);
  const existingProgress = API.getLessonProgress(user.id, lesson.id);
  if (!existingProgress || existingProgress.status === 'not_started') {
    API.saveProgress({ userId: user.id, lessonId: lesson.id, courseId: lesson.courseId, status: 'in_progress', startedAt: new Date().toISOString() });
  }

  function renderBlock(block) {
    switch (block.type) {
      case 'text':
        return `<div class="content-block">${block.content}</div>`;
      case 'callout':
        return `<div class="callout callout-${block.variant || 'info'}">
          ${block.title ? `<div class="callout-title">${block.title}</div>` : ''}
          ${block.content}
        </div>`;
      case 'video':
        return `<div class="content-block content-block-video">
          <iframe src="${block.url}" frameborder="0" allowfullscreen></iframe>
        </div>`;
      case 'download':
        return `<div class="content-block-download">
          <span class="content-block-download-icon">${Icons.download}</span>
          <div class="content-block-download-info">
            <div class="content-block-download-name">${block.name}</div>
            <div class="content-block-download-size">${block.size || 'PDF'}</div>
          </div>
        </div>`;
      case 'steps':
        return `<div class="steps-block">
          ${(block.steps || []).map(s => `
            <div class="step-item">
              <div class="step-title">${s.title}</div>
              <div class="step-description">${s.description}</div>
            </div>
          `).join('')}
        </div>`;
      case 'image':
        return `<div class="content-block"><img src="${block.src}" alt="${block.alt || ''}" style="border-radius:var(--radius-md)"></div>`;
      default:
        return '';
    }
  }

  const blocks = lesson.contentBlocks || [];

  content.innerHTML = `
    <div class="lesson-page">
      <div class="lesson-nav">
        <a class="lesson-nav-back" href="#/courses/${lesson.courseId}">
          ${Icons.chevronLeft} ${course ? course.title : 'Zurück'}
        </a>
        <span style="font-size:var(--fs-caption);color:var(--gray-dark)">
          Lektion ${currentIdx + 1} von ${lessons.length}
        </span>
      </div>

      <div class="lesson-content animate-fade-in-up">
        <h1>${lesson.title}</h1>
        ${lesson.description ? `<p style="color:var(--gray-dark);font-size:var(--fs-body-sm);margin-bottom:var(--sp-6)">${lesson.description}</p>` : ''}
        
        ${blocks.length > 0 ? blocks.map(b => renderBlock(b)).join('') : `
          <div class="callout callout-warning">
            <div class="callout-title">Inhalt in Vorbereitung</div>
            Der Inhalt dieser Lektion wird derzeit erstellt. Bitte schauen Sie später wieder vorbei.
          </div>
        `}
      </div>

      ${hasQuiz ? `
        <div class="callout callout-info animate-fade-in-up stagger-2" style="margin-bottom:var(--sp-6)">
          <div class="callout-title">📝 Quiz verfügbar</div>
          Zu dieser Lektion gibt es ein Quiz. Testen Sie Ihr Wissen!
          <div style="margin-top:var(--sp-3)">
            <button class="btn btn-primary btn-sm" onclick="window.location.hash='/quiz/${lesson.id}'">Quiz starten</button>
          </div>
        </div>
      ` : ''}

      <div class="lesson-footer-nav animate-fade-in-up stagger-3">
        ${prevLesson ? `
          <a class="btn btn-secondary" href="#/lessons/${prevLesson.id}">
            ${Icons.chevronLeft} ${prevLesson.title}
          </a>
        ` : '<div></div>'}
        
        <div class="btn-group">
          ${!hasQuiz ? `
            <button class="btn btn-success" id="complete-lesson-btn">
              ${Icons.check} Als erledigt markieren
            </button>
          ` : ''}
          ${nextLesson ? `
            <a class="btn btn-primary" href="#/lessons/${nextLesson.id}">
              ${nextLesson.title} ${Icons.chevronRight}
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  const completeBtn = document.getElementById('complete-lesson-btn');
  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      API.saveProgress({
        userId: user.id, lessonId: lesson.id, courseId: lesson.courseId,
        status: 'completed', completedAt: new Date().toISOString()
      });
      showToast('Lektion abgeschlossen! ✅', 'success');
      if (nextLesson) {
        window.location.hash = `/lessons/${nextLesson.id}`;
      } else {
        window.location.hash = `/courses/${lesson.courseId}`;
      }
    });
  }
}
