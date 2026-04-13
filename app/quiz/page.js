"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Gamepad2, Plus, LogIn, Clock, Users, Trophy, Play, ArrowLeft } from 'lucide-react';
import { Store } from '@/lib/store';
import { getAvailableCourses, QUIZ_COURSES } from '@/lib/quiz/quiz-data';
import useQuizStore from '@/lib/quiz/quiz-store';

// ============================================
// Quiz Overview Page – Create, Join, or Solo
// ============================================

export default function QuizPage() {
  const router = useRouter();
  const { Auth, currentUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [availableCourses, setAvailableCourses] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);
  const createSession = useQuizStore(s => s.createSession);

  const isAdmin = Auth.isAdmin();
  const isTrainer = Auth.isTrainer();
  const canHost = isAdmin || isTrainer;

  useEffect(() => {
    setMounted(true);
    setAvailableCourses(getAvailableCourses());
    setPastSessions((Store.get('kahootSessions') || []).slice(-5).reverse());
  }, []);

  if (!mounted) return null;

  const handleCreateSession = (courseKey) => {
    const sessionId = createSession(courseKey, {
      questionCount: 20,
      difficulty: 'all',
      timeLimit: 20,
    });
    router.push(`/quiz/host/${sessionId}`);
  };

  const handleSoloPlay = (courseKey) => {
    const sessionId = createSession(courseKey, {
      questionCount: 20,
      difficulty: 'all',
      timeLimit: 30,
    });
    router.push(`/quiz/solo/${sessionId}`);
  };

  const handleJoinSession = () => {
    if (!joinCode.trim()) return;
    router.push(`/quiz/play/${joinCode.trim().toUpperCase()}`);
  };

  return (
    <div className="quiz-overview">
      {/* Zurück-Button */}
      <button className="btn btn-back" onClick={() => router.push('/dashboard')}>
        <ArrowLeft size={18} />
        Zurück
      </button>

      <div className="page-header">
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Gamepad2 size={32} style={{ color: 'var(--th-blue-secondary)' }} />
          Live-Quiz
        </h1>
        <p className="page-subtitle">
          Kahoot-Style Quiz für Schulungen – Spiele solo, erstelle eine Multiplayer-Session oder tritt einem Quiz bei.
        </p>
      </div>

      <div className="quiz-overview-grid">
        {/* Join section (all roles) */}
        <div className="card card-body quiz-overview-join">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <LogIn size={20} style={{ color: 'var(--th-accent-lime)' }} />
            Quiz beitreten
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-body-sm)', marginBottom: '16px' }}>
            Gib den 6-stelligen Session-Code ein, den der Trainer anzeigt.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              className="input"
              type="text"
              placeholder="z.B. A3X7K9"
              value={joinCode}
              onChange={e => setJoinCode(e.target.value.toUpperCase())}
              maxLength={6}
              style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-body-lg)', textAlign: 'center' }}
              onKeyDown={e => e.key === 'Enter' && handleJoinSession()}
            />
            <button
              className="btn btn-primary"
              onClick={handleJoinSession}
              disabled={joinCode.length < 6}
            >
              Beitreten
            </button>
          </div>
        </div>

        {/* Course cards section (ALL roles) */}
        <div className="quiz-overview-create">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Play size={20} style={{ color: 'var(--th-blue-secondary)' }} />
            Quiz starten
          </h3>
          <div className="quiz-course-cards">
            {availableCourses.map(course => (
              <div key={course.key} className="card quiz-course-card">
                <div className="quiz-course-card-image">
                  {course.image ? (
                    <img src={course.image} alt={course.title} />
                  ) : (
                    <span className="quiz-course-card-icon">{course.icon}</span>
                  )}
                </div>
                <div className="quiz-course-card-body">
                  <h4>{course.title}</h4>
                  <p>{course.description}</p>
                  <span className="quiz-course-card-count">{course.questionCount} Fragen</span>
                  <div className="quiz-course-card-actions">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleSoloPlay(course.key)}
                    >
                      <Play size={14} />
                      Solo spielen
                    </button>
                    {canHost && (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleCreateSession(course.key)}
                      >
                        <Users size={14} />
                        Multiplayer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {availableCourses.length === 0 && (
              <div className="empty-state">
                <p>Keine Kurse mit Quiz-Fragen verfügbar.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Past sessions */}
      {pastSessions.length > 0 && (
        <div className="quiz-overview-history">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Clock size={20} />
            Letzte Sessions
          </h3>
          <div className="quiz-history-list">
            {pastSessions.map((session, idx) => (
              <div key={session.id || idx} className="card card-body quiz-history-item">
                <div className="quiz-history-meta">
                  <strong>{QUIZ_COURSES[session.courseKey]?.title || session.courseKey}</strong>
                  <span className="quiz-history-date">
                    {new Date(session.date).toLocaleDateString('de-DE')}
                  </span>
                </div>
                <div className="quiz-history-stats">
                  <span><Users size={14} /> {session.playerCount} Spieler</span>
                  <span>{session.questionCount} Fragen</span>
                  {session.winner && (
                    <span><Trophy size={14} style={{ color: 'var(--quiz-answer-yellow)' }} /> {session.winner}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
