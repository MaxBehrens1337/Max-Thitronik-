"use client";

import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { BookOpen, Edit2, Trash2, Plus, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminCoursesPage() {
  const { Auth, currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    setMounted(true);
    if (!currentUser || (!Auth.isAdmin() && !Auth.isTrainer())) {
      window.location.href = '/dashboard';
      return;
    }
    loadCourses();
  }, [currentUser, Auth]);

  const loadCourses = () => {
    setCourses(API.getCourses().sort((a, b) => a.sortOrder - b.sortOrder));
  };

  const handleCreate = () => {
    const newCourse = {
      id: API.generateId(),
      title: 'Neuer Modul-Titel',
      slug: 'neues-modul',
      status: 'placeholder',
      sortOrder: (courses[courses.length - 1]?.sortOrder || 0) + 1,
      icon: '📚',
      intro: '',
      learningGoals: [],
      hasVideo: false,
      hasImages: false,
      questionCount: 0
    };
    setEditingCourse(newCourse);
  };

  const handleEdit = (course) => {
    setEditingCourse({ ...course, learningGoalsStr: (course.learningGoals || []).join('\n') });
  };

  const handleDelete = (id) => {
    if (window.confirm('Möchten Sie dieses Modul wirklich löschen? Alle zugehörigen Lektionen und Fragen bleiben als Waise zurück oder müssen manuell gelöscht werden.')) {
      API.deleteCourse(id);
      loadCourses();
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const goals = editingCourse.learningGoalsStr
      ? editingCourse.learningGoalsStr.split('\n').map(s => s.trim()).filter(Boolean)
      : [];
      
    const toSave = { ...editingCourse, learningGoals: goals };
    delete toSave.learningGoalsStr;

    API.saveCourse(toSave);
    setEditingCourse(null);
    loadCourses();
  };

  if (!mounted || !currentUser) return null;

  if (editingCourse) {
    return (
      <div className="admin-page">
        <button className="btn btn-secondary" onClick={() => setEditingCourse(null)} style={{ marginBottom: 'var(--sp-6)' }}>
          <ArrowLeft size={16} /> Abbrechen
        </button>
        <h1 className="page-title">{editingCourse.id ? 'Kurs bearbeiten' : 'Neuen Kurs anlegen'}</h1>
        
        <form onSubmit={handleSave} className="card" style={{ maxWidth: '800px', marginTop: 'var(--sp-6)' }}>
          <div className="card-body" style={{ display: 'grid', gap: 'var(--sp-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
              <div>
                <label className="label">Modul Titel</label>
                <input required type="text" className="input" value={editingCourse.title} onChange={e => setEditingCourse({...editingCourse, title: e.target.value})} />
              </div>
              <div>
                <label className="label">Slug (URL-Pfad)</label>
                <input required type="text" className="input" value={editingCourse.slug} onChange={e => setEditingCourse({...editingCourse, slug: e.target.value})} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--sp-4)' }}>
              <div>
                <label className="label">Status</label>
                <select className="input" value={editingCourse.status} onChange={e => setEditingCourse({...editingCourse, status: e.target.value})}>
                  <option value="published">Veröffentlicht / Pilot</option>
                  <option value="placeholder">Platzhalter</option>
                  <option value="incomplete">Unvollständig</option>
                </select>
              </div>
              <div>
                <label className="label">Sortierung (Zahl)</label>
                <input required type="number" className="input" value={editingCourse.sortOrder} onChange={e => setEditingCourse({...editingCourse, sortOrder: parseInt(e.target.value) || 0})} />
              </div>
              <div>
                <label className="label">Icon (Emoji)</label>
                <input type="text" className="input" maxLength={5} value={editingCourse.icon || ''} onChange={e => setEditingCourse({...editingCourse, icon: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="label">Einleitung / Kurzbeschreibung</label>
              <textarea className="input" rows={3} value={editingCourse.intro || ''} onChange={e => setEditingCourse({...editingCourse, intro: e.target.value})} />
            </div>

            <div>
              <label className="label">Lernziele (Eins pro Zeile)</label>
              <textarea className="input" rows={4} value={editingCourse.learningGoalsStr || ''} onChange={e => setEditingCourse({...editingCourse, learningGoalsStr: e.target.value})} placeholder="- Ziel 1&#10;- Ziel 2" />
            </div>

            <div style={{ display: 'flex', gap: 'var(--sp-4)', marginTop: 'var(--sp-4)', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={editingCourse.hasVideo} onChange={e => setEditingCourse({...editingCourse, hasVideo: e.target.checked})} />
                Enthält Video-Material
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--sp-4)', marginTop: 'var(--sp-6)', paddingTop: 'var(--sp-4)', borderTop: '1px solid var(--border-color)' }}>
              <button type="submit" className="btn btn-primary">Speichern</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="page-header animate-fade-in-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Kursverwaltung</h1>
          <p className="page-subtitle">Alle Lernmodule im Überblick.</p>
        </div>
        <button className="btn btn-success" onClick={handleCreate}><Plus size={18} /> Neuer Kurs</button>
      </div>

      <div className="card animate-fade-in-up stagger-1" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--gray-soft)', borderBottom: '1px solid var(--border-color)', fontSize: '13px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
            <tr>
              <th style={{ padding: '16px' }}>Order</th>
              <th style={{ padding: '16px' }}>Modul</th>
              <th style={{ padding: '16px' }}>Status</th>
              <th style={{ padding: '16px' }}>Inhalt</th>
              <th style={{ padding: '16px', textAlign: 'right' }}>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s', ':hover': { background: 'var(--gray-soft)' } }}>
                <td style={{ padding: '16px', color: 'var(--text-tertiary)' }}>{c.sortOrder}</td>
                <td style={{ padding: '16px', fontWeight: '500' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{c.icon}</span> {c.title}
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500',
                    background: c.status === 'published' ? 'var(--color-success-bg)' : c.status === 'placeholder' ? 'var(--gray-soft)' : 'var(--color-warning-bg)',
                    color: c.status === 'published' ? 'var(--color-success)' : c.status === 'placeholder' ? 'var(--text-tertiary)' : 'var(--color-warning)'
                  }}>
                    {c.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {c.questionCount} Qs
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <button onClick={() => handleEdit(c)} className="btn" style={{ padding: '6px', color: 'var(--th-blue-secondary)' }} title="Bearbeiten"><Edit2 size={18}/></button>
                  <button onClick={() => handleDelete(c.id)} className="btn" style={{ padding: '6px', color: 'var(--color-error)' }} title="Löschen"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
