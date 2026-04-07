"use client";

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import Link from 'next/link';
import { PlayCircle, Award, BookOpen, AlertCircle, Target, CheckCircle, XCircle, Clock, Zap } from 'lucide-react';

export default function Dashboard() {
  const { currentUser, Auth } = useAuth();
  const [data, setData] = useState({ courses: [], myAttempts: [] });
  const [dcState, setDcState] = useState({ selected: null, revealed: false, correct: false });

  useEffect(() => {
    if (!currentUser) return;
    const courses = API.getCourses().filter(c => c.status === 'published');
    const myAttempts = API.getAllQuizAttempts().filter(a => a.userId === currentUser.id);
    
    setData({ courses, myAttempts });
  }, [currentUser]);

  // Daily Challenge: deterministic random question based on today's date
  const dailyChallenge = useMemo(() => {
    if (!currentUser) return null;
    const allQuestions = API.getQuestions();
    if (allQuestions.length === 0) return null;
    
    const today = new Date().toDateString();
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = ((hash << 5) - hash) + today.charCodeAt(i);
      hash = hash & hash;
    }
    const idx = Math.abs(hash) % allQuestions.length;
    const question = allQuestions[idx];
    const course = API.getCourse(question.courseId);
    
    return { question, course };
  }, [currentUser]);

  if (!currentUser) return null;

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 10) return 'Guten Morgen';
    if (hr < 18) return 'Guten Tag';
    return 'Guten Abend';
  };

  const hoursUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.ceil((midnight - now) / (1000 * 60 * 60));
  };

  const coursesWithProgress = data.courses.map(course => ({
    ...course,
    progress: API.getCourseProgress(currentUser.id, course.id)
  }));

  const completedCount = coursesWithProgress.filter(c => c.progress.percent === 100).length;

  const handleDcAnswer = (answer) => {
    if (dcState.revealed || !dailyChallenge) return;
    const isCorrect = dailyChallenge.question.correctAnswers.includes(answer);
    setDcState({ selected: answer, revealed: true, correct: isCorrect });
  };

  return (
    <div className="dashboard-page">
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">{getGreeting()}, {currentUser.firstName}!</h1>
        <p className="page-subtitle">Willkommen zurück auf der THITRONIK Lernplattform.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="card card-hover animate-fade-in-up stagger-1">
          <div className="card-body stat-card-body">
            <div className="stat-icon stat-icon--blue">
              <BookOpen size={24} />
            </div>
            <div>
              <div className="stat-value">{data.courses.length}</div>
              <div className="stat-label">{(Auth.isAdmin() || Auth.isTrainer()) ? 'Veröffentlichte Kurse' : 'Verfügbare Kurse'}</div>
            </div>
          </div>
        </div>
        
        <div className="card card-hover animate-fade-in-up stagger-2">
          <div className="card-body stat-card-body">
            <div className="stat-icon stat-icon--green">
              <Award size={24} />
            </div>
            <div>
              <div className="stat-value">{completedCount}</div>
              <div className="stat-label">Abgeschlossen</div>
            </div>
          </div>
        </div>

        <div className="card card-hover animate-fade-in-up stagger-3">
          <div className="card-body stat-card-body">
            <div className="stat-icon stat-icon--amber">
              <PlayCircle size={24} />
            </div>
            <div>
              <div className="stat-value">{data.myAttempts.length}</div>
              <div className="stat-label">Quiz-Versuche</div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Challenge */}
      {dailyChallenge && (
        <div className="dc-card card animate-fade-in-up stagger-2">
          <div className="card-body">
            <div className="dc-header">
              <div className="dc-badge">
                <Target size={16} /> Daily Challenge
              </div>
              <div className="dc-timer">
                <Clock size={14} />
                <span>Nächste in {hoursUntilMidnight()}h</span>
              </div>
            </div>

            <div className="dc-question">
              {dailyChallenge.question.question}
            </div>

            {dailyChallenge.course && (
              <div className="dc-course-tag">
                <BookOpen size={14} /> {dailyChallenge.course.title}
              </div>
            )}

            <div className="dc-answers">
              {dailyChallenge.question.answers.map((answer, idx) => {
                const isCorrect = dailyChallenge.question.correctAnswers.includes(answer);
                const isSelected = dcState.selected === answer;
                let answerClass = 'dc-answer';
                if (dcState.revealed) {
                  if (isCorrect) answerClass += ' dc-answer--correct';
                  else if (isSelected && !isCorrect) answerClass += ' dc-answer--wrong';
                  else answerClass += ' dc-answer--faded';
                }

                return (
                  <button
                    key={idx}
                    className={answerClass}
                    onClick={() => handleDcAnswer(answer)}
                    disabled={dcState.revealed}
                  >
                    <img src={answer} alt={`Antwort ${idx + 1}`} loading="lazy" />
                    {dcState.revealed && isCorrect && (
                      <div className="dc-answer-icon dc-answer-icon--correct">
                        <CheckCircle size={24} />
                      </div>
                    )}
                    {dcState.revealed && isSelected && !isCorrect && (
                      <div className="dc-answer-icon dc-answer-icon--wrong">
                        <XCircle size={24} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {dcState.revealed && (
              <div className={`dc-result ${dcState.correct ? 'dc-result--correct' : 'dc-result--wrong'}`}>
                <div className="dc-result-icon">
                  {dcState.correct ? <Zap size={20} /> : <AlertCircle size={20} />}
                </div>
                <div>
                  <div className="dc-result-title">
                    {dcState.correct ? 'Richtig! Gut gemacht.' : 'Leider falsch'}
                  </div>
                  {dailyChallenge.question.explanation && (
                    <div className="dc-result-text">{dailyChallenge.question.explanation}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Letzte Aktivitäten + Admin */}
      <div className="animate-fade-in-up stagger-3" style={{ marginTop: 'var(--sp-6)' }}>
        <h2 style={{ marginBottom: 'var(--sp-4)' }}>Letzte Aktivitäten</h2>
        <div className="card">
          <div className="card-body">
            {data.myAttempts.length === 0 ? (
              <p className="activity-detail">Noch keine Aktivitäten vorhanden.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                {data.myAttempts.slice(-5).reverse().map((attempt, i) => {
                  const lesson = API.getLesson(attempt.lessonId);
                  const course = attempt.courseId ? API.getCourse(attempt.courseId) : null;
                  const passed = attempt.percent >= 80;
                  const dateStr = attempt.completedAt 
                    ? new Date(attempt.completedAt).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                    : '';
                  return (
                    <div key={i} className="activity-item">
                      <div className="activity-icon" style={{ color: passed ? 'var(--color-success)' : 'var(--color-error)' }}>
                        {passed ? <Award size={20} /> : <AlertCircle size={20} />}
                      </div>
                      <div>
                        <div className="activity-title">
                          Quiz {passed ? 'bestanden' : 'nicht bestanden'}
                          {course && <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}> · {course.title}</span>}
                        </div>
                        <div className="activity-detail">
                          {lesson?.title || 'Lektion'} — Score: {attempt.percent}%
                          {dateStr && <span> · {dateStr}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        {(Auth.isAdmin() || Auth.isTrainer()) && (
          <div className="card admin-promo" style={{ marginTop: 'var(--sp-6)' }}>
            <div className="card-body">
              <h3>Administration</h3>
              <p>Sie haben erweiterte Rechte. Verwalten Sie Kurse und Nutzer im Admin-Bereich.</p>
              <Link href="/admin" className="btn">Zum Admin Dashboard</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
