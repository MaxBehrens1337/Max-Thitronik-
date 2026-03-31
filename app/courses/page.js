"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import Link from 'next/link';
import { BookOpen, AlertTriangle, AlertCircle } from 'lucide-react';

export default function CoursesPage() {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // API.getCourses holt automatisch die Daten aus dem localStorage
    // Dank initializeSeedData(API) wurden diese zuvor schon up-to-date reingeladen
    const loadedCourses = API.getCourses().sort((a, b) => a.sortOrder - b.sortOrder);
    setCourses(loadedCourses);
  }, []);

  if (!currentUser) return null;

  return (
    <div className="courses-page">
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">Kursübersicht</h1>
        <p className="page-subtitle">Entdecken Sie alle verfügbaren Schulungsmodule der THITRONIK Lernplattform.</p>
      </div>

      <div className="grid-cols-1 grid-cols-md-2 grid-cols-lg-3">
        {courses.map((course, index) => {
          const isPilot = course.status === 'published';
          const isPlaceholder = course.status === 'placeholder';
          const isIncomplete = course.status === 'incomplete';

          return (
            <Link href={`/courses/${course.id}`} key={course.id} className="card card-hover animate-fade-in-up" style={{ animationDelay: `${index * 50}ms`, display: 'flex', flexDirection: 'column' }}>
              <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-4)' }}>
                  <div style={{ fontSize: '40px', background: 'rgba(59, 169, 211, 0.1)', padding: 'var(--sp-3)', borderRadius: 'var(--radius-md)' }}>
                    {course.icon}
                  </div>
                  
                  {isPilot && (
                    <span className="badge" style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)', fontSize: '12px', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>PILOT</span>
                  )}
                  {isPlaceholder && (
                    <span className="badge" style={{ background: 'var(--bg-page)', color: 'var(--text-tertiary)', border: '1px solid var(--border-color)', fontSize: '12px', padding: '4px 8px', borderRadius: '4px' }}>Platzhalter</span>
                  )}
                  {isIncomplete && (
                    <span className="badge" style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning)', fontSize: '12px', padding: '4px 8px', borderRadius: '4px' }}>Unvollständig</span>
                  )}
                </div>

                <h3 style={{ marginBottom: 'var(--sp-2)', fontSize: '18px' }}>{course.title}</h3>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-body-sm)', flex: 1, marginBottom: 'var(--sp-4)' }}>
                  {course.intro || 'Keine Beschreibung verfügbar.'}
                </p>

                <div style={{ display: 'flex', gap: 'var(--sp-3)', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--sp-3)', fontSize: 'var(--fs-caption)', color: 'var(--text-tertiary)' }}>
                  {isPilot ? (
                    <>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                         <BookOpen size={14} /> {course.questionCount} Fragen
                      </div>
                    </>
                  ) : (
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                       {isIncomplete ? <AlertTriangle size={14} /> : <AlertCircle size={14} />} 
                       Inhaltsmigration läuft...
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <style jsx>{`
        .grid-cols-1 { display: grid; gap: var(--sp-6); grid-template-columns: 1fr; }
        @media (min-width: 768px) { .grid-cols-md-2 { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .grid-cols-lg-3 { grid-template-columns: repeat(3, 1fr); } }
      `}</style>
    </div>
  );
}
