// ============================================
// THITRONIK Quiz Page
// ============================================

import { Auth } from '../auth.js';
import { API } from '../store.js';
import { renderProgressBar, showToast, Icons } from '../components.js';

export function renderQuiz(params) {
  const user = Auth.getCurrentUser();
  const lessonId = params.id;
  const lesson = API.getLesson(lessonId);
  const questions = API.getQuestions(lessonId);
  const content = document.getElementById('page-content');

  if (!lesson || questions.length === 0) {
    content.innerHTML = '<div class="empty-state"><div class="empty-state-icon">❓</div><div class="empty-state-title">Keine Fragen vorhanden</div></div>';
    return;
  }

  let currentQ = 0;
  let answers = {};
  let submitted = false;
  let showExplanation = false;

  function renderQuestion() {
    const q = questions[currentQ];
    const isMultiple = q.multipleCorrect || q.type === 'multiple';
    const userAnswer = answers[q.id] || [];
    const percent = Math.round(((currentQ + (submitted ? 1 : 0)) / questions.length) * 100);

    content.innerHTML = `
      <div class="quiz-container">
        <div class="lesson-nav">
          <a class="lesson-nav-back" href="#/lessons/${lessonId}">${Icons.chevronLeft} Zurück zur Lektion</a>
        </div>

        <div class="quiz-header animate-fade-in">
          <div class="quiz-progress">
            <span class="quiz-progress-text">Frage ${currentQ + 1} von ${questions.length}</span>
            <div style="flex:1">${renderProgressBar(percent)}</div>
          </div>
          ${isMultiple ? '<div style="font-size:var(--fs-caption);color:var(--gray-dark)">Mehrere Antworten möglich</div>' : ''}
        </div>

        <div class="quiz-question-card">
          <div class="quiz-question-text">${q.questionText}</div>
          ${isMultiple ? '<div class="quiz-question-hint">Wählen Sie alle zutreffenden Antworten.</div>' : ''}
          
          <div class="quiz-options">
            ${q.options.map(opt => {
              const isSelected = userAnswer.includes(opt.id);
              let cls = '';
              if (submitted) {
                if (opt.isCorrect) cls = 'correct';
                else if (isSelected && !opt.isCorrect) cls = 'incorrect';
              } else if (isSelected) {
                cls = 'selected';
              }
              return `
                <div class="quiz-option ${cls} ${isMultiple ? 'quiz-option-checkbox' : ''}" data-option="${opt.id}" ${submitted ? '' : 'style="cursor:pointer"'}>
                  <div class="quiz-option-marker">
                    ${submitted ? (opt.isCorrect ? '✓' : (isSelected ? '✕' : '')) : (isSelected ? '●' : '')}
                  </div>
                  <span class="quiz-option-text">${opt.text}</span>
                </div>
              `;
            }).join('')}
          </div>

          ${submitted && q.explanation ? `
            <div class="quiz-explanation ${userAnswer.length > 0 && q.options.filter(o => o.isCorrect).every(o => userAnswer.includes(o.id)) && userAnswer.every(id => q.options.find(o => o.id === id)?.isCorrect) ? 'correct' : 'incorrect'}">
              <strong>${q.options.filter(o => o.isCorrect).every(o => userAnswer.includes(o.id)) && userAnswer.every(id => q.options.find(o => o.id === id)?.isCorrect) ? '✅ Richtig!' : '❌ Leider falsch.'}</strong><br>
              ${q.explanation}
            </div>
          ` : ''}
        </div>

        <div class="quiz-actions">
          ${currentQ > 0 && !submitted ? `<button class="btn btn-secondary" id="quiz-prev">Zurück</button>` : '<div></div>'}
          <div class="btn-group">
            ${!submitted ? `
              <button class="btn btn-primary" id="quiz-check" ${userAnswer.length === 0 ? 'disabled' : ''}>Antwort prüfen</button>
            ` : `
              ${currentQ < questions.length - 1 ? `
                <button class="btn btn-primary" id="quiz-next">Nächste Frage ${Icons.chevronRight}</button>
              ` : `
                <button class="btn btn-success" id="quiz-finish">Ergebnis anzeigen</button>
              `}
            `}
          </div>
        </div>
      </div>
    `;

    // Event listeners
    if (!submitted) {
      content.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', () => {
          const optId = opt.dataset.option;
          if (isMultiple) {
            const current = answers[q.id] || [];
            if (current.includes(optId)) {
              answers[q.id] = current.filter(id => id !== optId);
            } else {
              answers[q.id] = [...current, optId];
            }
          } else {
            answers[q.id] = [optId];
          }
          renderQuestion();
        });
      });
    }

    const prevBtn = document.getElementById('quiz-prev');
    if (prevBtn) prevBtn.onclick = () => { currentQ--; submitted = false; renderQuestion(); };

    const checkBtn = document.getElementById('quiz-check');
    if (checkBtn) checkBtn.onclick = () => { submitted = true; renderQuestion(); };

    const nextBtn = document.getElementById('quiz-next');
    if (nextBtn) nextBtn.onclick = () => { currentQ++; submitted = false; renderQuestion(); };

    const finishBtn = document.getElementById('quiz-finish');
    if (finishBtn) finishBtn.onclick = () => finishQuiz();
  }

  function finishQuiz() {
    let correct = 0;
    questions.forEach(q => {
      const userAns = answers[q.id] || [];
      const correctIds = q.options.filter(o => o.isCorrect).map(o => o.id);
      const isCorrect = correctIds.length === userAns.length && correctIds.every(id => userAns.includes(id));
      if (isCorrect) correct++;
    });

    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= 70;

    API.saveQuizAttempt({
      id: API.generateId(), userId: user.id, lessonId, courseId: lesson.courseId,
      score, correct, total: questions.length, passed, date: new Date().toISOString(), answers
    });

    if (passed) {
      API.saveProgress({
        userId: user.id, lessonId, courseId: lesson.courseId,
        status: 'completed', quizPassed: true, quizScore: score, completedAt: new Date().toISOString()
      });
    }

    window.location.hash = `/results/${lessonId}`;
  }

  renderQuestion();
}
