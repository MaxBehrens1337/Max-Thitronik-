"use client";

import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { useEffect, useState } from 'react';
import { BookOpen, Award, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const [data, setData] = useState({ courses: [], stats: {} });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!currentUser) return;

    const allCourses = API.getCourses().filter(c => c.status !== 'incomplete' && c.status !== 'placeholder');
    
    const courseProgress = allCourses.map(course => {
      const prog = API.getCourseProgress(currentUser.id, course.id);
      return { ...course, progress: prog };
    });

    const totalCompleted = courseProgress.reduce((acc, c) => acc + (c.progress.percent === 100 ? 1 : 0), 0);
    const avgScore = totalCompleted * 100 || 0;
    
    setData({
      courses: courseProgress,
      stats: {
        enrolled: courseProgress.length,
        completed: totalCompleted,
        avgScore: avgScore > 0 ? '100%' : '0%'
      }
    });
  }, [currentUser]);

  if (!mounted || !currentUser) return null;

  return (
    <div className="profile-page">
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">Mein Fortschritt</h1>
        <p className="page-subtitle">Ihre persönlichen Lernziele und Zertifikate im Überblick.</p>
      </div>

      {/* KPI Row */}
      <div className="stats-grid animate-fade-in-up stagger-1">
        <div className="card">
          <div className="card-body stat-card-body">
            <div className="stat-icon stat-icon--info">
              <BookOpen size={24} />
            </div>
            <div>
              <div className="stat-label">Eingeschrieben</div>
              <div className="stat-value">{data.stats.enrolled} Kurse</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body stat-card-body">
            <div className="stat-icon stat-icon--success">
              <Award size={24} />
            </div>
            <div>
              <div className="stat-label">Zertifikate</div>
              <div className="stat-value">{data.stats.completed}</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body stat-card-body">
            <div className="stat-icon stat-icon--warning">
              <BarChart3 size={24} />
            </div>
            <div>
              <div className="stat-label">Durchschnitts-Score</div>
              <div className="stat-value">{data.stats.avgScore}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Meine Kurse List */}
      <div className="card animate-fade-in-up stagger-2">
        <div className="card-header-section">
          <h2 className="section-title" style={{ marginBottom: 0 }}>Meine aktiven Kurse</h2>
        </div>
        
        <div className="course-list">
          {data.courses.length === 0 ? (
            <div className="empty-state">
              Bisher keine Kurse verfügbar.
            </div>
          ) : (
            data.courses.map((course, idx) => (
              <div key={course.id} className={`course-list-item ${idx !== data.courses.length - 1 ? 'course-list-item--bordered' : ''}`}>
                {/* Thumbnail instead of emoji */}
                <div className="course-list-thumb">
                  {course.image ? (
                    <img src={course.image} alt={course.title} loading="lazy" />
                  ) : (
                    <div className="course-list-thumb-fallback">
                      <BookOpen size={24} style={{ color: 'var(--th-blue-secondary)' }} />
                    </div>
                  )}
                </div>
                
                <div className="course-list-info">
                  <h3>{course.title}</h3>
                  <div className="course-list-meta">
                    <span className="course-card-footer-item"><BookOpen size={14}/> {course.questionCount || 0} Fragen</span>
                    {course.progress.percent === 100 && (
                      <span className="course-list-passed"><Award size={14}/> Bestanden</span>
                    )}
                  </div>
                </div>
                
                <div className="course-list-progress">
                  <div className="course-list-progress-header">
                    <span>Fortschritt</span>
                    <span className={course.progress.percent === 100 ? 'text-success' : 'text-primary-blue'}>{course.progress.percent}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div 
                      className={`progress-bar-fill ${course.progress.percent === 100 ? 'progress-bar-fill--success' : ''}`}
                      style={{ width: `${course.progress.percent}%` }} 
                    />
                  </div>
                </div>
                
                <div className="course-list-action">
                  <Link href={`/courses/${course.id}`} className="btn btn-secondary">
                    {course.progress.percent === 100 ? 'Wiederholen' : 'Weiterlernen'}
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

