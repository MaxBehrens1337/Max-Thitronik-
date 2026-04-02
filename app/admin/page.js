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
        <div className="admin-badge">
          <Settings size={16} /> Admin Bereich
        </div>
        <h1 className="page-title">Willkommen im Control Center</h1>
        <p className="page-subtitle">Zentrale Verwaltung der THITRONIK Lernplattform.</p>
      </div>

      <div className="admin-stats-grid animate-fade-in-up stagger-1">
        <div className="card admin-stat-card admin-stat-card--blue">
          <div className="admin-stat-value">{stats.courses}</div>
          <div className="admin-stat-label">Lernmodule</div>
        </div>
        <div className="card admin-stat-card admin-stat-card--amber">
          <div className="admin-stat-value">{stats.questions}</div>
          <div className="admin-stat-label">Fragen in der Datenbank</div>
        </div>
        {Auth.isAdmin() && (
          <div className="card admin-stat-card admin-stat-card--teal">
            <div className="admin-stat-value">{stats.users}</div>
            <div className="admin-stat-label">Registrierte Accounts</div>
          </div>
        )}
        <div className="card admin-stat-card admin-stat-card--green">
          <div className="admin-stat-value">{stats.attempts}</div>
          <div className="admin-stat-label">Absolvierte Quizze</div>
        </div>
      </div>

      <h2 className="animate-fade-in-up stagger-2" style={{ marginBottom: 'var(--sp-4)' }}>Schnellzugriff</h2>
      <div className="quick-links-grid animate-fade-in-up stagger-2">
        {quickLinks.map((link, idx) => (
          <Link key={idx} href={link.href} className="card card-hover quick-link-card">
            <div className="card-body quick-link-body">
              <div className="quick-link-icon" style={{ color: link.color }}>
                <link.icon size={32} />
              </div>
              <div>
                <h3>{link.title}</h3>
                <p>{link.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
