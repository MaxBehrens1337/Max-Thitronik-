"use client";

import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { BarChart3, Award, Download, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminReportingPage() {
  const { Auth, currentUser } = useAuth();
  const [reports, setReports] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!currentUser || (!Auth.isAdmin() && !Auth.isTrainer())) {
      window.location.href = '/dashboard';
      return;
    }
    
    // Generiere Report-Daten
    const users = API.getUsers().filter(u => u.role !== 'admin');
    const allCourses = API.getCourses().filter(c => c.status !== 'placeholder' && c.status !== 'incomplete');
    
    const userReports = users.map(user => {
      let completedCount = 0;
      let totalTimeStr = '0 Minuten'; // Platzhalter für spätere Zeit-Metriken
      
      allCourses.forEach(c => {
        const prog = API.getCourseProgress(user.id, c.id);
        if (prog.percent === 100) completedCount++;
      });
      
      const lastLogin = 'Heute, 09:42'; // Simulierte Meta-Daten

      return {
        ...user,
        completedCourses: completedCount,
        totalActiveCourses: allCourses.length,
        completionRate: allCourses.length > 0 ? Math.round((completedCount / allCourses.length) * 100) : 0,
        lastLogin
      };
    });

    setReports(userReports);
  }, [currentUser, Auth]);

  if (!mounted || !currentUser) return null;

  return (
    <div className="admin-page animate-fade-in-up">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 className="page-title">Berichte & Lernerfolge</h1>
          <p className="page-subtitle">Analysieren Sie den Fortschritt Ihrer Teilnehmer auf Modul-Ebene.</p>
        </div>
        
        <button className="btn btn-secondary" onClick={() => alert('CSV Export - Bald verfügbar')}>
          <Download size={18} /> CSV Export
        </button>
      </div>

      <div className="card stagger-1" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--gray-soft)', borderBottom: '1px solid var(--border-color)', fontSize: '13px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
            <tr>
              <th style={{ padding: '16px' }}>Teilnehmer</th>
              <th style={{ padding: '16px' }}>Letzter Status</th>
              <th style={{ padding: '16px', textAlign: 'center' }}>Absolvierte Module</th>
              <th style={{ padding: '16px' }}>Gesamtrate</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, idx) => (
              <tr key={r.id} style={{ borderBottom: idx !== reports.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>{r.firstName} {r.lastName}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>{r.email} ({r.role})</div>
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} color="var(--text-tertiary)"/> {r.lastLogin}</div>
                </td>
                <td style={{ padding: '16px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    {r.completedCourses === r.totalActiveCourses && r.totalActiveCourses > 0 ? (
                      <Award size={20} color="var(--color-success)" />
                    ) : (
                      <BarChart3 size={20} color="var(--th-blue-secondary)" />
                    )}
                    {r.completedCourses} / {r.totalActiveCourses}
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '120px', height: '6px', background: 'var(--gray-soft)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${r.completionRate}%`, height: '100%', background: r.completionRate === 100 ? 'var(--color-success)' : 'var(--th-blue-secondary)', transition: 'width 1s ease-out' }} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: r.completionRate === 100 ? 'var(--color-success)' : 'var(--text-secondary)' }}>
                      {r.completionRate}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {reports.length === 0 && (
        <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-tertiary)', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
          Es sind aktuell keine relevanten Teilnehmerdaten zum Auswerten vorhanden.
        </div>
      )}
    </div>
  );
}
