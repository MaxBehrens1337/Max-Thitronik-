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
              <div className="stat-value">{data.myCourses.length}</div>
              <div className="stat-label">Meine Kurse</div>
            </div>
          </div>
        </div>
        
        <div className="card card-hover animate-fade-in-up stagger-2">
          <div className="card-body stat-card-body">
            <div className="stat-icon stat-icon--green">
              <Award size={24} />
            </div>
            <div>
              <div className="stat-value">{completedCourses.length}</div>
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

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        <div className="animate-fade-in-up stagger-1">
          <div className="section-header">
            <h2>Meine Lernfortschritte</h2>
            <Link href="/courses" className="btn btn-secondary">Alle Kurse ansehen</Link>
          </div>

          <div className="course-list">
            {data.myCourses.length === 0 ? (
              <div className="card">
                <div className="card-body empty-state">
                  <p>Sie sind noch in keinen Kurs eingeschrieben.</p>
                  <Link href="/courses" className="btn btn-primary">Kurse entdecken</Link>
                </div>
              </div>
            ) : (
              data.myCourses.map(course => {
                const prog = API.getCourseProgress(currentUser.id, course.id);
                return (
                  <div key={course.id} className="card card-hover" style={{ marginBottom: 'var(--sp-4)' }}>
                    <div className="card-body course-item">
                      <div className="course-icon">{course.icon}</div>
                      <div className="course-info">
                        <h4>{course.title}</h4>
                        <div className="course-meta">
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

        <div className="animate-fade-in-up stagger-2">
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>Letzte Aktivitäten</h2>
          <div className="card">
            <div className="card-body">
              {data.myAttempts.length === 0 ? (
                <p className="activity-detail">Noch keine Aktivitäten vorhanden.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                  {data.myAttempts.slice(-5).reverse().map((attempt, i) => {
                    const lesson = API.getLesson(attempt.lessonId);
                    const passed = attempt.percent >= 80;
                    return (
                      <div key={i} className="activity-item">
                        <div className="activity-icon" style={{ color: passed ? 'var(--color-success)' : 'var(--color-error)' }}>
                          {passed ? <Award size={20} /> : <AlertCircle size={20} />}
                        </div>
                        <div>
                          <div className="activity-title">
                            Quiz {passed ? 'bestanden' : 'nicht bestanden'}
                          </div>
                          <div className="activity-detail">
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
            <div className="card admin-promo">
              <div className="card-body">
                <h3>Administration</h3>
                <p>Sie haben erweiterte Rechte. Verwalten Sie Kurse und Nutzer im Admin-Bereich.</p>
                <Link href="/admin" className="btn">Zum Admin Dashboard</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
