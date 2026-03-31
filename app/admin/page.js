"use client";

import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { BookOpen, HelpCircle, Users, BarChart3, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { Auth, currentUser } = useAuth();
  const [stats, setStats] = useState({ courses: 0, questions: 0, users: 0, attempts: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!currentUser) return;
    
    // Check if user is Admin or Trainer
    if (!Auth.isAdmin() && !Auth.isTrainer()) {
      window.location.href = '/dashboard';
      return;
    }

    setStats({
      courses: API.getCourses().length,
      questions: API.getLessons().reduce((sum, lesson) => sum + API.getQuestions(lesson.id).length, 0),
      users: API.getUsers().length,
      attempts: API.getAllQuizAttempts().length
    });
  }, [currentUser, Auth]);

  if (!mounted || !currentUser) return null;

  const quickLinks = [
    { title: 'Kurse verwalten', desc: 'Module anlegen, editieren und strukturieren.', icon: BookOpen, href: '/admin/courses', color: 'var(--th-blue-primary)' },
    { title: 'Fragen verwalten', desc: 'Quiz-Inhalte und Erklärungen pflegen.', icon: HelpCircle, href: '/admin/questions', color: 'var(--color-warning)' },
    { title: 'Berichte & Analysen', desc: 'Lernerfolge und Testversuche einsehen.', icon: BarChart3, href: '/admin/reporting', color: 'var(--color-success)' }
  ];

  if (Auth.isAdmin()) {
    quickLinks.push({ title: 'Benutzerverwaltung', desc: 'Rollen und Zugänge administrieren.', icon: Users, href: '/admin/users', color: 'var(--color-info)' });
  }

  return (
    <div className="admin-dashboard">
      <div className="page-header animate-fade-in-up">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--th-red-brand)', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Settings size={16} /> Admin Bereich
        </div>
        <h1 className="page-title">Willkommen im Control Center</h1>
        <p className="page-subtitle">Zentrale Verwaltung der THITRONIK Lernplattform.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--sp-4)', marginBottom: 'var(--sp-8)' }} className="animate-fade-in-up stagger-1">
        <div className="card" style={{ padding: '24px', textAlign: 'center', borderTop: '4px solid var(--th-blue-primary)' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.courses}</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>Lernmodule</div>
        </div>
        <div className="card" style={{ padding: '24px', textAlign: 'center', borderTop: '4px solid var(--color-warning)' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.questions}</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>Fragen in der Datenbank</div>
        </div>
        {Auth.isAdmin() && (
          <div className="card" style={{ padding: '24px', textAlign: 'center', borderTop: '4px solid var(--color-info)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.users}</div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>Registrierte Accounts</div>
          </div>
        )}
        <div className="card" style={{ padding: '24px', textAlign: 'center', borderTop: '4px solid var(--color-success)' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.attempts}</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>Absolvierte Quizze</div>
        </div>
      </div>

      <h2 style={{ marginBottom: 'var(--sp-4)' }} className="animate-fade-in-up stagger-2">Schnellzugriff</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--sp-6)' }} className="animate-fade-in-up stagger-2">
        {quickLinks.map((link, idx) => (
          <Link key={idx} href={link.href} className="card card-hover" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
            <div className="card-body" style={{ flex: 1, display: 'flex', gap: '16px' }}>
              <div style={{ color: link.color, flexShrink: 0 }}>
                <link.icon size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{link.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{link.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
