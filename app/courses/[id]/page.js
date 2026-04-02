"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, CheckCircle, Video, BookOpen, AlertCircle, Image as ImageIcon } from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser, Auth } = useAuth();
  
  const [data, setData] = useState({ course: null, lessons: [], questions: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser || !params?.id) return;
    
    const course = API.getCourse(params.id);
    if (!course) { router.push('/courses'); return; }
    
    const lessons = API.getLessons(course.id);
    let questions = [];
    if (lessons.length > 0) questions = API.getQuestions(lessons[0].id);

    setData({ course, lessons, questions });
    setIsLoading(false);
  }, [currentUser, params, router]);

  if (isLoading || !data.course) return null;

  const { course, questions, lessons } = data;
  const isPilot = course.status === 'published';
  const isIncomplete = course.status === 'incomplete';
  
  const progress = API.getCourseProgress(currentUser?.id, course.id);
  const isCompleted = progress.percent === 100;
  
  const startLessonLink = lessons.length > 0 ? `/courses/${course.id}/lesson/${lessons[0].id}` : '#';

  return (
    <div className="course-detail-page animate-fade-in-up">
      <div className="page-header" style={{ marginBottom: 'var(--sp-6)' }}>
        <Link href="/courses" className="btn btn-back" style={{ marginBottom: 'var(--sp-4)', display: 'inline-flex' }}>
          <ArrowLeft size={16} /> Zurück zur Übersicht
        </Link>
        <div className="course-detail-header">
          <div className="course-detail-icon" aria-hidden="true">{course.icon}</div>
          <div>
            <h1 className="page-title">{course.title}</h1>
            <p className="page-subtitle" style={{ maxWidth: '800px' }}>{course.intro || 'Keine Beschreibung verfügbar.'}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--sp-6)' }}>
        
        {/* CTA: Kurs starten */}
        {isPilot && lessons.length > 0 && (
          <div className={`card stagger-1 ${isCompleted ? 'course-cta--completed' : 'course-cta'}`}>
            <div className="card-body course-cta-inner">
              <div>
                <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>
                  {isCompleted ? 'Kurs bereits bestanden!' : 'Bereit für das Quiz?'}
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {isCompleted ? 'Du hast dieses Modul erfolgreich absolviert. Du kannst es zur Auffrischung beliebig oft wiederholen.' : `Löse ${questions.length} interaktive Fragen, um dir das Wissen anzueignen.`}
                </p>
              </div>
              <Link href={startLessonLink} className={isCompleted ? "btn btn-secondary" : "btn btn-primary"} style={{ padding: '16px 32px', fontSize: '18px', borderRadius: '12px' }}>
                <PlayCircle size={24} /> {isCompleted ? 'Quiz Wiederholen' : 'Lektion Starten'}
              </Link>
            </div>
          </div>
        )}

        {/* Metadata */}
        {isPilot && (
          <div className="card stagger-2">
            <div className="card-body course-meta-grid">
              <div>
                <div className="course-meta-label">Inhalt</div>
                <div className="course-meta-value">
                  <BookOpen size={20} color="var(--th-blue-secondary)" /> {questions.length} Fragen
                </div>
              </div>
              <div>
                <div className="course-meta-label">Medien</div>
                <div className="course-meta-value">
                  {course.hasImages ? <ImageIcon size={20} color="var(--th-blue-secondary)" /> : (course.hasVideo ? <Video size={20} color="var(--th-blue-secondary)" /> : <BookOpen size={20} color="var(--text-tertiary)" />)}
                  {course.hasImages ? 'Mit echten Bildbeispielen' : (course.hasVideo ? 'Video vorhanden' : 'Textbasiert')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder Warning */}
        {!isPilot && (
          <div className="card stagger-1 course-warning">
            <div className="card-body course-warning-inner">
              <AlertCircle size={24} color="var(--color-warning)" />
              <div>
                <h3>Inhaltsmigration läuft</h3>
                <p style={{ color: 'var(--text-primary)' }}>
                  Dieses Modul befindet sich derzeit in Bearbeitung. {isIncomplete ? 'Aus dem vorliegenden Export fehlen einzelne Antwortblöcke.' : 'Die Fragenstruktur wird schrittweise auf die neue Plattform migriert.'} Bitte prüfen Sie das Modul später erneut.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Learning Goals */}
        {course.learningGoals && course.learningGoals.length > 0 && (
          <div className="card stagger-2">
            <div className="card-body">
              <h3 style={{ marginBottom: '16px' }}>Lernziele</h3>
              <ul className="course-goals-list" role="list">
                {course.learningGoals.map((goal, idx) => (
                  <li key={idx}>{goal}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Admin Preview */}
        {isPilot && questions.length > 0 && Auth.isAdmin() && (
          <div className="stagger-3 course-admin-preview" aria-label="Admin Vorschau">
            <h2><AlertCircle size={16} /> Admin Preview (Nur für Trainer/Admins sichtbar)</h2>
            <div>
              {questions.map((q, idx) => (
                <div key={q.id} className="course-admin-item">
                  <div style={{ fontWeight: '500' }}>{idx+1}. {q.question}</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-success)' }}>Richtige Antwort(en): {q.correctAnswers.join(' | ')}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
