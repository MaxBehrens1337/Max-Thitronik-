"use client";

import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { BookOpen, Edit2, Trash2, Plus, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

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
        <button className="btn btn-back" onClick={() => setEditingCourse(null)} style={{ marginBottom: 'var(--sp-6)' }}>
          <ArrowLeft size={16} /> Abbrechen
        </button>
        <h1 className="page-title">{editingCourse.id ? 'Kurs bearbeiten' : 'Neuen Kurs anlegen'}</h1>
        
        <form onSubmit={handleSave} className="card admin-form">
          <div className="card-body">
            <div className="admin-form-grid-2">
              <div className="form-group">
                <label>Modul Titel</label>
                <input required type="text" value={editingCourse.title} onChange={e => setEditingCourse({...editingCourse, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Slug (URL-Pfad)</label>
                <input required type="text" value={editingCourse.slug} onChange={e => setEditingCourse({...editingCourse, slug: e.target.value})} />
              </div>
            </div>

            <div className="admin-form-grid-3">
              <div className="form-group">
                <label>Status</label>
                <select value={editingCourse.status} onChange={e => setEditingCourse({...editingCourse, status: e.target.value})}>
                  <option value="published">Veröffentlicht / Pilot</option>
                  <option value="placeholder">Platzhalter</option>
                  <option value="incomplete">Unvollständig</option>
                </select>
              </div>
              <div className="form-group">
                <label>Sortierung (Zahl)</label>
                <input required type="number" value={editingCourse.sortOrder} onChange={e => setEditingCourse({...editingCourse, sortOrder: parseInt(e.target.value) || 0})} />
              </div>
              <div className="form-group">
                <label>Icon (Emoji)</label>
                <input type="text" maxLength={5} value={editingCourse.icon || ''} onChange={e => setEditingCourse({...editingCourse, icon: e.target.value})} />
              </div>
            </div>

            <div className="form-group">
              <label>Einleitung / Kurzbeschreibung</label>
              <textarea rows={3} value={editingCourse.intro || ''} onChange={e => setEditingCourse({...editingCourse, intro: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Lernziele (Eins pro Zeile)</label>
              <textarea rows={4} value={editingCourse.learningGoalsStr || ''} onChange={e => setEditingCourse({...editingCourse, learningGoalsStr: e.target.value})} placeholder="- Ziel 1&#10;- Ziel 2" />
            </div>

            <label className="admin-form-checkbox">
              <input type="checkbox" checked={editingCourse.hasVideo} onChange={e => setEditingCourse({...editingCourse, hasVideo: e.target.checked})} />
              Enthält Video-Material
            </label>

            <div className="admin-form-footer">
              <button type="submit" className="btn btn-primary">Speichern</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="page-header admin-page-header animate-fade-in-up">
        <div>
          <h1 className="page-title">Kursverwaltung</h1>
          <p className="page-subtitle">Alle Lernmodule im Überblick.</p>
        </div>
        <button className="btn btn-success" onClick={handleCreate}><Plus size={18} /> Neuer Kurs</button>
      </div>

      <div className="card animate-fade-in-up stagger-1" style={{ overflow: 'hidden' }}>
        <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Modul</th>
              <th>Status</th>
              <th>Inhalt</th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(c => (
              <tr key={c.id}>
                <td className="td-muted">{c.sortOrder}</td>
                <td className="td-name">
                  <div className="cell-inline">
                    <span style={{ fontSize: '20px' }}>{c.icon}</span> {c.title}
                  </div>
                </td>
                <td>
                  <span className={`badge ${c.status === 'published' ? 'badge--success' : c.status === 'placeholder' ? 'badge--neutral' : 'badge--warning'}`}>
                    {c.status.toUpperCase()}
                  </span>
                </td>
                <td className="td-secondary">
                  {c.questionCount} Qs
                </td>
                <td>
                  <button onClick={() => handleEdit(c)} className="icon-btn icon-btn--edit" title="Bearbeiten"><Edit2 size={18}/></button>
                  <button onClick={() => handleDelete(c.id)} className="icon-btn icon-btn--delete" title="Löschen"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
