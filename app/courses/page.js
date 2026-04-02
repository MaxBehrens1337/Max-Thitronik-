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

      <div className="courses-grid" role="list">
        {courses.map((course, index) => {
          const isPilot = course.status === 'published';
          const isPlaceholder = course.status === 'placeholder';
          const isIncomplete = course.status === 'incomplete';

          return (
            <Link
              href={`/courses/${course.id}`}
              key={course.id}
              className="card card-hover course-card animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
              role="listitem"
              aria-label={`Kurs: ${course.title}`}
            >
              <div className="card-body">
                <div className="course-card-header">
                  <div className="course-card-icon">
                    {course.icon}
                  </div>
                  
                  {isPilot && (
                    <span className="badge badge--success">PILOT</span>
                  )}
                  {isPlaceholder && (
                    <span className="badge badge--neutral">Platzhalter</span>
                  )}
                  {isIncomplete && (
                    <span className="badge badge--warning">Unvollständig</span>
                  )}
                </div>

                <h3>{course.title}</h3>
                
                <p className="course-card-desc">
                  {course.intro || 'Keine Beschreibung verfügbar.'}
                </p>

                <div className="course-card-footer">
                  {isPilot ? (
                    <div className="course-card-footer-item">
                       <BookOpen size={14} /> {course.questionCount} Fragen
                    </div>
                  ) : (
                    <div className="course-card-footer-item">
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
    </div>
  );
}
