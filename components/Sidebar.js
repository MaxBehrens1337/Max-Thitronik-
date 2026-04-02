"use client";

import { useAuth } from '@/lib/auth';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, BookOpen, User, Settings, Users, BarChart3, HelpCircle, LogOut, ClipboardList } from 'lucide-react';
import React from 'react';

export function Sidebar({ isOpen, onClose }) {
  const { Auth } = useAuth();
  const pathname = usePathname();
  const isAdmin = Auth.isAdmin();
  const isTrainer = Auth.isTrainer();

  const handleLogout = (e) => {
    e.preventDefault();
    Auth.logout();
    window.location.href = '/login';
  };

  const NavItem = ({ href, icon: Icon, label, exact = false }) => {
    const isActive = exact ? pathname === href : (pathname === href || pathname.startsWith(href + '/'));
    return (
      <Link href={href} className={`sidebar-item ${isActive ? 'active' : ''}`} onClick={onClose}>
        <Icon size={20} className="sidebar-icon" />
        <span className="sidebar-label">{label}</span>
      </Link>
    );
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <img 
              src="/logo.png" 
              alt="THITRONIK Logo" 
              style={{ width: '100%', maxWidth: '160px', height: 'auto' }} 
            />
          </div>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-section">
            <div className="sidebar-section-title">Lernen</div>
            <NavItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem href="/courses" icon={BookOpen} label="Kurse" />
            <NavItem href="/profile" icon={User} label="Mein Fortschritt" />
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-title">Tools</div>
            <NavItem href="/tools/arbeitskarte" icon={ClipboardList} label="Arbeitskarte" />
          </div>

          {(isAdmin || isTrainer) && (
            <div className="sidebar-section">
              <div className="sidebar-section-title">Administration</div>
              <NavItem href="/admin" icon={Settings} label="Admin Dashboard" exact={true} />
              <NavItem href="/admin/courses" icon={BookOpen} label="Kurse" />
              <NavItem href="/admin/questions" icon={HelpCircle} label="Fragen" />
              {isAdmin && <NavItem href="/admin/users" icon={Users} label="Benutzer" />}
              <NavItem href="/admin/reporting" icon={BarChart3} label="Reporting" />
            </div>
          )}
        </div>

        <div className="sidebar-footer">
          <a href="#" className="sidebar-item" onClick={handleLogout}>
            <LogOut size={20} className="sidebar-icon" />
            <span className="sidebar-label">Abmelden</span>
          </a>
        </div>
      </nav>
    </>
  );
}
