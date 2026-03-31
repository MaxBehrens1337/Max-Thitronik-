"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { ProgressBar } from '@/components/ui';
import Link from 'next/link';
import { PlayCircle, Award, BookOpen, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { currentUser, Auth } = useAuth();
  const [data, setData] = useState({ courses: [], myCourses: [], myAttempts: [] });

  useEffect(() => {
    if (!currentUser) return;
    const courses = API.getCourses().filter(c => c.status === 'published');
    const enrollments = API.getEnrollments(currentUser.id);
    const myCourses = enrollments.map(e => API.getCourse(e.courseId)).filter(Boolean);
    const myAttempts = API.getAllQuizAttempts().filter(a => a.userId === currentUser.id);
    
    setData({ courses, myCourses, myAttempts });
  }, [currentUser]);

  if (!currentUser) return null;

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 10) return 'Guten Morgen';
    if (hr < 18) return 'Guten Tag';
    return 'Guten Abend';
  };

  const completedCourses = data.myCourses.filter(c => API.getCourseProgress(currentUser.id, c.id).percent === 100);

  return (
    <div className="dashboard-page">
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">{getGreeting()}, {currentUser.firstName}! 👋</h1>
        <p className="page-subtitle">Willkommen zurück auf der THITRONIK Lernplattform.</p>
      </div>

      <div className="grid-cols-1 grid-cols-md-2 grid-cols-lg-4" style={{ marginBottom: 'var(--sp-8)' }}>
        <div className="card card-hover animate-fade-in-up stagger-1">
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
            <div style={{ padding: '12px', background: 'rgba(59, 169, 211, 0.1)', color: 'var(--th-blue-secondary)', borderRadius: 'var(--radius-full)' }}>
              <BookOpen size={24} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{data.myCourses.length}</div>
              <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-tertiary)' }}>Meine Kurse</div>
            </div>
          </div>
        </div>
        
        <div className="card card-hover animate-fade-in-up stagger-2">
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
            <div style={{ padding: '12px', background: 'rgba(22, 163, 74, 0.1)', color: 'var(--color-success)', borderRadius: 'var(--radius-full)' }}>
              <Award size={24} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{completedCourses.length}</div>
              <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-tertiary)' }}>Abgeschlossen</div>
            </div>
          </div>
        </div>

        <div className="card card-hover animate-fade-in-up stagger-3">
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
            <div style={{ padding: '12px', background: 'rgba(217, 119, 6, 0.1)', color: 'var(--color-warning)', borderRadius: 'var(--radius-full)' }}>
              <PlayCircle size={24} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{data.myAttempts.length}</div>
              <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-tertiary)' }}>Quiz-Versuche</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-cols-1 grid-cols-lg-3" style={{ gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)' }}>
        <div className="dashboard-main animate-fade-in-up stagger-1">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-4)' }}>
            <h2>Meine Lernfortschritte</h2>
            <Link href="/courses" className="btn btn-ghost btn-sm">Alle Kurse ansehen</Link>
          </div>

          <div className="course-list">
            {data.myCourses.length === 0 ? (
              <div className="card"><div className="card-body" style={{ textAlign: 'center', padding: 'var(--sp-8)' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--sp-4)' }}>Sie sind noch in keinen Kurs eingeschrieben.</p>
                <Link href="/courses" className="btn btn-primary">Kurse entdecken</Link>
              </div></div>
            ) : (
              data.myCourses.map(course => {
                const prog = API.getCourseProgress(currentUser.id, course.id);
                return (
                  <div key={course.id} className="card card-hover" style={{ marginBottom: 'var(--sp-4)' }}>
                    <div className="card-body" style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'center' }}>
                      <div style={{ fontSize: '32px' }}>{course.icon}</div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ marginBottom: '4px' }}>{course.title}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-caption)', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                          <span>{prog.completed} von {prog.total} Lektionen</span>
                          <span>{prog.percent}%</span>
                        </div>
                        <ProgressBar percent={prog.percent} />
                      </div>
                      <div>
                        <Link href={`/courses/${course.id}`} className="btn btn-secondary">
                          {prog.percent === 0 ? 'Starten' : prog.percent === 100 ? 'Wiederholen' : 'Fortsetzen'}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="dashboard-sidebar animate-fade-in-up stagger-2">
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>Letzte Aktivitäten</h2>
          <div className="card">
            <div className="card-body">
              {data.myAttempts.length === 0 ? (
                <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--fs-body-sm)' }}>Noch keine Aktivitäten vorhanden.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                  {data.myAttempts.slice(-5).reverse().map((attempt, i) => {
                    const lesson = API.getLesson(attempt.lessonId);
                    const passed = attempt.percent >= 80;
                    return (
                      <div key={i} style={{ display: 'flex', gap: 'var(--sp-3)', borderBottom: i < 4 ? '1px solid var(--border-color)' : 'none', paddingBottom: i < 4 ? 'var(--sp-3)' : 0 }}>
                        <div style={{ color: passed ? 'var(--color-success)' : 'var(--color-error)' }}>
                          {passed ? <Award size={20} /> : <AlertCircle size={20} />}
                        </div>
                        <div>
                          <div style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-medium)' }}>
                            Quiz {passed ? 'bestanden' : 'nicht bestanden'}
                          </div>
                          <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-tertiary)' }}>
                            {lesson?.title || 'Unbekannte Lektion'} - Score: {attempt.percent}%
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
            <div style={{ marginTop: 'var(--sp-6)' }}>
              <div className="card" style={{ background: 'linear-gradient(135deg, var(--th-blue-primary), var(--th-blue-primary-dark))', color: 'white' }}>
                <div className="card-body">
                  <h3 style={{ color: 'white', marginBottom: 'var(--sp-2)' }}>Administration</h3>
                  <p style={{ fontSize: 'var(--fs-body-sm)', opacity: 0.8, marginBottom: 'var(--sp-4)' }}>Sie haben erweiterte Rechte. Verwalten Sie Kurse und Nutzer im Admin-Bereich.</p>
                  <Link href="/admin" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', width: '100%' }}>Zum Admin Dashboard</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
