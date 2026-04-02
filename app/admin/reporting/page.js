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
    
    const users = API.getUsers().filter(u => u.role !== 'admin');
    const allCourses = API.getCourses().filter(c => c.status !== 'placeholder' && c.status !== 'incomplete');
    
    const userReports = users.map(user => {
      let completedCount = 0;
      
      allCourses.forEach(c => {
        const prog = API.getCourseProgress(user.id, c.id);
        if (prog.percent === 100) completedCount++;
      });
      
      const lastLogin = 'Heute, 09:42';

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
      <div className="page-header admin-page-header">
        <div>
          <h1 className="page-title">Berichte & Lernerfolge</h1>
          <p className="page-subtitle">Analysieren Sie den Fortschritt Ihrer Teilnehmer auf Modul-Ebene.</p>
        </div>
        
        <button className="btn btn-secondary" onClick={() => alert('CSV Export - Bald verfügbar')}>
          <Download size={18} /> CSV Export
        </button>
      </div>

      <div className="card stagger-1" style={{ overflow: 'hidden' }}>
        <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Teilnehmer</th>
              <th>Letzter Status</th>
              <th className="td-center">Absolvierte Module</th>
              <th>Gesamtrate</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.id}>
                <td>
                  <div className="td-name" style={{ marginBottom: '4px' }}>{r.firstName} {r.lastName}</div>
                  <div className="td-secondary">{r.email} ({r.role})</div>
                </td>
                <td className="td-secondary">
                  <div className="cell-inline"><Clock size={14} className="td-muted"/> {r.lastLogin}</div>
                </td>
                <td className="td-center">
                  <div className="cell-inline" style={{ justifyContent: 'center', fontSize: '18px', fontWeight: 'bold' }}>
                    {r.completedCourses === r.totalActiveCourses && r.totalActiveCourses > 0 ? (
                      <Award size={20} color="var(--color-success)" />
                    ) : (
                      <BarChart3 size={20} color="var(--th-blue-secondary)" />
                    )}
                    {r.completedCourses} / {r.totalActiveCourses}
                  </div>
                </td>
                <td>
                  <div className="progress-inline">
                    <div className="progress-inline-bar">
                      <div 
                        className="progress-inline-fill"
                        style={{ 
                          width: `${r.completionRate}%`, 
                          background: r.completionRate === 100 ? 'var(--color-success)' : 'var(--th-blue-secondary)' 
                        }} 
                      />
                    </div>
                    <span className={`progress-inline-label ${r.completionRate === 100 ? 'text-success' : 'td-secondary'}`}>
                      {r.completionRate}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      
      {reports.length === 0 && (
        <div className="empty-state card">
          Es sind aktuell keine relevanten Teilnehmerdaten zum Auswerten vorhanden.
        </div>
      )}
    </div>
  );
}
