"use client";

import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { HelpCircle, Edit2, Trash2, Plus, ArrowLeft, Save, Filter } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminQuestionsPage() {
  const { Auth, currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    setMounted(true);
    if (!currentUser || (!Auth.isAdmin() && !Auth.isTrainer())) {
      window.location.href = '/dashboard';
      return;
    }
    
    // Lade alle verfügbaren aktiven Kurse für den Filter
    const activeCourses = API.getCourses().filter(c => c.status !== 'placeholder');
    setCourses(activeCourses);
    if (activeCourses.length > 0) {
      setSelectedCourseId(activeCourses[0].id);
    }
  }, [currentUser, Auth]);

  // Wenn Course wechselt, lade die Fragen der ersten Lesson dieses Kurses
  useEffect(() => {
    if (selectedCourseId) {
      loadQuestions(selectedCourseId);
    }
  }, [selectedCourseId]);

  const loadQuestions = (courseId) => {
    const lessons = API.getLessons(courseId);
    if (lessons.length > 0) {
      setQuestions(API.getQuestions(lessons[0].id));
    } else {
      setQuestions([]);
    }
  };

  const currentCourse = courses.find(c => c.id === selectedCourseId);

  const handleCreate = () => {
    const lessons = API.getLessons(selectedCourseId);
    if (lessons.length === 0) {
      alert('Der gewählte Kurs hat noch keine Lektions-Struktur in der Datenbank (Lektion fehlt). Bitte den Admin kontaktieren.');
      return;
    }
    const newQuestion = {
      id: API.generateId(),
      courseId: selectedCourseId,
      lessonId: lessons[0].id,
      type: 'single',
      question: 'Neue Frage formulieren...',
      answers: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswers: ['Option 1'],
      explanation: '',
      sortOrder: (questions[questions.length - 1]?.sortOrder || 0) + 1
    };
    setEditingQuestion(newQuestion);
  };

  const handleEdit = (q) => {
    setEditingQuestion(JSON.parse(JSON.stringify(q))); // Deep copy um State-Mutations direkt zu vermeiden
  };

  const handleDelete = (id) => {
    if (window.confirm('Möchten Sie diese Frage aus dem Kurs wirklich entfernen?')) {
      API.deleteQuestion(id);
      loadQuestions(selectedCourseId);
    }
  };

  const updateEditingQuestion = (updater) => {
    setEditingQuestion(prev => ({ ...prev, ...updater }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingQuestion.answers.length < 2) {
      alert('Es müssen mindestens zwei Antwortmöglichkeiten existieren.');
      return;
    }
    if (editingQuestion.correctAnswers.length === 0) {
      alert('Es muss mindestens eine richtige Antwort markiert sein.');
      return;
    }

    API.saveQuestion(editingQuestion);
    
    // Update question count in Course
    const c = API.getCourse(editingQuestion.courseId);
    if (c) {
      // Re-evaluate total
      const lsns = API.getLessons(editingQuestion.courseId);
      const allQs = lsns.reduce((acc, l) => acc + API.getQuestions(l.id).length, 0);
      c.questionCount = allQs;
      API.saveCourse(c);
    }

    setEditingQuestion(null);
    loadQuestions(selectedCourseId);
  };

  if (!mounted || !currentUser) return null;

  if (editingQuestion) {
    return (
      <div className="admin-page">
        <button className="btn btn-back" onClick={() => setEditingQuestion(null)} style={{ marginBottom: 'var(--sp-6)' }}>
          <ArrowLeft size={16} /> Zurück zur Liste
        </button>
        <h1 className="page-title">Frage Editor</h1>
        <p className="page-subtitle">Modul: {currentCourse?.title}</p>
        
        <form onSubmit={handleSave} className="card" style={{ maxWidth: '900px', marginTop: 'var(--sp-6)' }}>
          <div className="card-body" style={{ display: 'grid', gap: 'var(--sp-6)' }}>
            
            {/* Fragestellung */}
            <div>
              <label className="label">Die Frage (Fragestellung)</label>
              <textarea 
                required 
                rows={3}
                className="input" 
                style={{ fontSize: '18px', fontWeight: '500' }}
                value={editingQuestion.question} 
                onChange={e => updateEditingQuestion({ question: e.target.value })} 
              />
            </div>

            {/* Antwort-Optionen */}
            <div style={{ background: 'var(--gray-soft)', padding: 'var(--sp-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <label className="label" style={{ margin: 0 }}>Antwortmöglichkeiten & Korrektheit</label>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Setze den Haken bei den korrekten Antworten.</div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {editingQuestion.answers.map((answer, idx) => {
                  const isCorrect = editingQuestion.correctAnswers.includes(answer);
                  return (
                    <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input 
                        type="checkbox" 
                        checked={isCorrect}
                        onChange={(e) => {
                          let newCorrect = [...editingQuestion.correctAnswers];
                          if (e.target.checked) {
                            if (!newCorrect.includes(answer)) newCorrect.push(answer);
                          } else {
                            newCorrect = newCorrect.filter(a => a !== answer);
                          }
                          updateEditingQuestion({ correctAnswers: newCorrect });
                        }}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                      <input 
                        type="text" 
                        className="input" 
                        style={{ flex: 1, borderColor: isCorrect ? 'var(--color-success)' : 'var(--border-color)', outlineColor: isCorrect ? 'var(--color-success)' : 'inherit' }}
                        value={answer}
                        onChange={(e) => {
                          const newAnswers = [...editingQuestion.answers];
                          const oldVal = newAnswers[idx];
                          newAnswers[idx] = e.target.value;
                          
                          // Wenn oldVal als correct markiert war, den correctAnswers Array ebenfalls updaten
                          let newCorrect = [...editingQuestion.correctAnswers];
                          if (newCorrect.includes(oldVal)) {
                            newCorrect[newCorrect.indexOf(oldVal)] = e.target.value;
                          }

                          updateEditingQuestion({ answers: newAnswers, correctAnswers: newCorrect });
                        }}
                      />
                      <button type="button" onClick={() => {
                        const newAnswers = editingQuestion.answers.filter((_, i) => i !== idx);
                        const newCorrect = editingQuestion.correctAnswers.filter(a => a !== answer);
                        updateEditingQuestion({ answers: newAnswers, correctAnswers: newCorrect });
                      }} style={{ padding: '8px', color: 'var(--color-error)', cursor: 'pointer' }}>
                        <Trash2 size={20} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <button type="button" className="btn btn-secondary" style={{ marginTop: '16px', fontSize: '13px' }} onClick={() => {
                updateEditingQuestion({ answers: [...editingQuestion.answers, `Neue Option ${editingQuestion.answers.length + 1}`] });
              }}>
                <Plus size={14} /> Option hinzufügen
              </button>
            </div>

            {/* Erklärung */}
            <div>
              <label className="label">Erklärungstext (Wird nach Auflösung angezeigt)</label>
              <textarea 
                rows={4}
                className="input" 
                value={editingQuestion.explanation || ''} 
                onChange={e => updateEditingQuestion({ explanation: e.target.value })}
                placeholder="Warum ist diese Antwort richtig?"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '16px'}}>
              <div>
                <label className="label">Fragetyp</label>
                <select className="input" value={editingQuestion.type} onChange={e => updateEditingQuestion({ type: e.target.value })}>
                  <option value="single">Single Choice</option>
                  <option value="multiple">Multiple Choice</option>
                </select>
              </div>
              <div>
                <label className="label">Reihenfolge (Sortierung)</label>
                <input type="number" className="input" value={editingQuestion.sortOrder || 0} onChange={e => updateEditingQuestion({ sortOrder: parseInt(e.target.value) || 0 })} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--sp-4)', borderTop: '1px solid var(--border-color)', marginTop: 'var(--sp-4)' }}>
              <button type="submit" className="btn btn-primary"><Save size={18} /> Frage speichern</button>
            </div>
            
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page animate-fade-in-up">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 className="page-title">Fragen-Datenbank</h1>
          <p className="page-subtitle">Verwalten Sie hier alle Quiz-Inhalte für Ihre Module.</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-card)', padding: '12px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <Filter size={18} color="var(--text-tertiary)" />
          <select 
            className="input" 
            style={{ border: 'none', background: 'transparent', padding: 0, fontWeight: '600', width: 'auto', minWidth: '200px', color: 'var(--th-accent-lime)' }}
            value={selectedCourseId} 
            onChange={e => setSelectedCourseId(e.target.value)}
          >
            {courses.map(c => <option key={c.id} value={c.id} style={{ background: '#fff', color: '#000' }}>{c.icon} {c.title}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button className="btn btn-success" onClick={handleCreate} disabled={!selectedCourseId}><Plus size={18} /> Neue Frage anlegen</button>
      </div>

      <div className="card stagger-1" style={{ overflow: 'hidden' }}>
        {questions.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
            <HelpCircle size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
            <p>Keine Fragen in diesem Modul gefunden.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {questions.map((q, idx) => (
              <div key={q.id} style={{ padding: '24px', borderBottom: idx !== questions.length - 1 ? '1px solid var(--border-color)' : 'none', display: 'flex', gap: '24px' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-tertiary)' }}>Q{idx+1}</div>
                  <div style={{ fontSize: '12px', background: 'var(--gray-soft)', padding: '2px 8px', borderRadius: '12px', color: 'var(--text-secondary)' }}>{q.type}</div>
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>{q.question}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {q.answers.map((a, aidx) => {
                      const isCorrect = q.correctAnswers.includes(a);
                      return (
                        <div key={aidx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: isCorrect ? 'var(--color-success)' : 'var(--text-secondary)' }}>
                          {isCorrect ? '✅' : '⚪'} {a}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button onClick={() => handleEdit(q)} className="btn btn-secondary" style={{ padding: '8px 12px' }}><Edit2 size={16}/> Bearbeiten</button>
                  <button onClick={() => handleDelete(q.id)} className="btn btn-secondary" style={{ padding: '8px 12px', color: 'var(--color-error)' }}><Trash2 size={16}/> Löschen</button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
