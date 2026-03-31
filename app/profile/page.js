"use client";

import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { useEffect, useState } from 'react';
import { BookOpen, Award, BarChart3, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const [data, setData] = useState({ courses: [], stats: {} });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!currentUser) return;

    // Wir holen alle Kurse
    const allCourses = API.getCourses().filter(c => c.status !== 'incomplete' && c.status !== 'placeholder');
    
    // Berechne Fortschritt für jeden dieser aktiven Kurse
    const courseProgress = allCourses.map(course => {
      const prog = API.getCourseProgress(currentUser.id, course.id);
      return {
        ...course,
        progress: prog
      };
    });

    // Dummy Stats für Demo: Berechnen aus dem Fortschritt
    const totalCompleted = courseProgress.reduce((acc, c) => acc + (c.progress.percent === 100 ? 1 : 0), 0);
    const avgScore = totalCompleted * 100 || 0; // Platzhalter für echte Punktzahl
    
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--sp-6)' }}>
        
        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-4)' }} className="animate-fade-in-up stagger-1">
          <div className="card">
            <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'var(--color-info-bg)', color: 'var(--color-info)', padding: '16px', borderRadius: '12px' }}>
                <BookOpen size={24} />
              </div>
              <div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Eingeschrieben</div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>{data.stats.enrolled} Kurse</div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)', padding: '16px', borderRadius: '12px' }}>
                <Award size={24} />
              </div>
              <div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Zertifikate</div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>{data.stats.completed}</div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning)', padding: '16px', borderRadius: '12px' }}>
                <BarChart3 size={24} />
              </div>
              <div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Durchschnitts-Score</div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>{data.stats.avgScore}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Meine Kurse List */}
        <div className="card animate-fade-in-up stagger-2" style={{ overflow: 'visible' }}>
          <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '20px' }}>Meine aktiven Kurse</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {data.courses.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                Bisher keine Kurse verfügbar.
              </div>
            ) : (
              data.courses.map((course, idx) => (
                <div key={course.id} style={{ 
                  display: 'flex', padding: '24px', gap: '24px', borderBottom: idx !== data.courses.length - 1 ? '1px solid var(--border-color)' : 'none',
                  alignItems: 'center', flexWrap: 'wrap'
                }}>
                  <div style={{ fontSize: '32px', background: 'rgba(59, 169, 211, 0.1)', padding: '16px', borderRadius: '12px' }}>
                    {course.icon || '📚'}
                  </div>
                  
                  <div style={{ flex: '1 1 300px' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{course.title}</h3>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: 'var(--text-secondary)', alignItems: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><BookOpen size={14}/> {course.questionCount || 0} Fragen</span>
                      {course.progress.percent === 100 && <span style={{ color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}><Award size={14}/> Bestanden</span>}
                    </div>
                  </div>
                  
                  <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '500' }}>
                      <span>Fortschritt</span>
                      <span style={{ color: course.progress.percent === 100 ? 'var(--color-success)' : 'var(--th-blue-primary)'}}>{course.progress.percent}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'var(--gray-soft)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${course.progress.percent}%`, height: '100%', background: course.progress.percent === 100 ? 'var(--color-success)' : 'var(--th-blue-secondary)', transition: 'width 0.5s ease-out' }} />
                    </div>
                  </div>
                  
                  <div style={{ marginLeft: 'auto' }}>
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
    </div>
  );
}
