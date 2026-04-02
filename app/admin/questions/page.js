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
    
    const activeCourses = API.getCourses().filter(c => c.status !== 'placeholder');
    setCourses(activeCourses);
    if (activeCourses.length > 0) {
      setSelectedCourseId(activeCourses[0].id);
    }
  }, [currentUser, Auth]);

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
    setEditingQuestion(JSON.parse(JSON.stringify(q)));
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
    
    const c = API.getCourse(editingQuestion.courseId);
    if (c) {
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
        
        <form onSubmit={handleSave} className="card admin-form" style={{ maxWidth: '900px' }}>
          <div className="card-body" style={{ gap: 'var(--sp-6)' }}>
            
            <div className="form-group">
              <label>Die Frage (Fragestellung)</label>
              <textarea 
                required 
                rows={3}
                style={{ fontSize: '18px', fontWeight: '500' }}
                value={editingQuestion.question} 
                onChange={e => updateEditingQuestion({ question: e.target.value })} 
              />
            </div>

            <div className="answers-area">
              <div className="answers-area-header">
                <label className="label" style={{ margin: 0 }}>Antwortmöglichkeiten & Korrektheit</label>
                <div className="answers-area-hint">Setze den Haken bei den korrekten Antworten.</div>
              </div>
              
              <div className="answer-list">
                {editingQuestion.answers.map((answer, idx) => {
                  const isCorrect = editingQuestion.correctAnswers.includes(answer);
                  return (
                    <div key={idx} className="answer-row">
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
                        className="form-group"
                        style={{ 
                          flex: 1, 
                          padding: '14px',
                          borderRadius: 'var(--radius-md)',
                          border: `1px solid ${isCorrect ? 'var(--color-success)' : 'var(--border-color)'}`,
                          background: 'var(--bg-page)',
                          color: 'var(--text-primary)'
                        }}
                        value={answer}
                        onChange={(e) => {
                          const newAnswers = [...editingQuestion.answers];
                          const oldVal = newAnswers[idx];
                          newAnswers[idx] = e.target.value;
                          
                          let newCorrect = [...editingQuestion.correctAnswers];
                          if (newCorrect.includes(oldVal)) {
                            newCorrect[newCorrect.indexOf(oldVal)] = e.target.value;
                          }

                          updateEditingQuestion({ answers: newAnswers, correctAnswers: newCorrect });
                        }}
                      />
                      <button type="button" className="icon-btn icon-btn--delete" onClick={() => {
                        const newAnswers = editingQuestion.answers.filter((_, i) => i !== idx);
                        const newCorrect = editingQuestion.correctAnswers.filter(a => a !== answer);
                        updateEditingQuestion({ answers: newAnswers, correctAnswers: newCorrect });
                      }}>
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

            <div className="form-group">
              <label>Erklärungstext (Wird nach Auflösung angezeigt)</label>
              <textarea 
                rows={4}
                value={editingQuestion.explanation || ''} 
                onChange={e => updateEditingQuestion({ explanation: e.target.value })}
                placeholder="Warum ist diese Antwort richtig?"
              />
            </div>

            <div className="admin-form-grid-2">
              <div className="form-group">
                <label>Fragetyp</label>
                <select value={editingQuestion.type} onChange={e => updateEditingQuestion({ type: e.target.value })}>
                  <option value="single">Single Choice</option>
                  <option value="multiple">Multiple Choice</option>
                </select>
              </div>
              <div className="form-group">
                <label>Reihenfolge (Sortierung)</label>
                <input type="number" value={editingQuestion.sortOrder || 0} onChange={e => updateEditingQuestion({ sortOrder: parseInt(e.target.value) || 0 })} />
              </div>
            </div>

            <div className="admin-form-footer" style={{ marginTop: 'var(--sp-4)' }}>
              <button type="submit" className="btn btn-primary"><Save size={18} /> Frage speichern</button>
            </div>
            
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page animate-fade-in-up">
      <div className="page-header admin-page-header">
        <div>
          <h1 className="page-title">Fragen-Datenbank</h1>
          <p className="page-subtitle">Verwalten Sie hier alle Quiz-Inhalte für Ihre Module.</p>
        </div>
        
        <div className="filter-bar">
          <Filter size={18} className="td-muted" />
          <select 
            value={selectedCourseId} 
            onChange={e => setSelectedCourseId(e.target.value)}
          >
            {courses.map(c => <option key={c.id} value={c.id}>{c.icon} {c.title}</option>)}
          </select>
        </div>
      </div>

      <div className="action-bar">
        <button className="btn btn-success" onClick={handleCreate} disabled={!selectedCourseId}><Plus size={18} /> Neue Frage anlegen</button>
      </div>

      <div className="card stagger-1" style={{ overflow: 'hidden' }}>
        {questions.length === 0 ? (
          <div className="empty-state">
            <HelpCircle size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
            <p>Keine Fragen in diesem Modul gefunden.</p>
          </div>
        ) : (
          <div>
            {questions.map((q, idx) => (
              <div key={q.id} className="question-list-item">
                
                <div className="question-meta">
                  <div className="question-number">Q{idx+1}</div>
                  <div className="question-type-badge">{q.type}</div>
                </div>
                
                <div className="question-body">
                  <h3>{q.question}</h3>
                  <div className="question-answers">
                    {q.answers.map((a, aidx) => {
                      const isCorrect = q.correctAnswers.includes(a);
                      return (
                        <div key={aidx} className={`question-answer ${isCorrect ? 'question-answer--correct' : 'question-answer--incorrect'}`}>
                          {isCorrect ? '✅' : '⚪'} {a}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="question-actions">
                  <button onClick={() => handleEdit(q)} className="btn btn-secondary" style={{ padding: '8px 12px' }}><Edit2 size={16}/> Bearbeiten</button>
                  <button onClick={() => handleDelete(q.id)} className="btn btn-secondary icon-btn--delete" style={{ padding: '8px 12px' }}><Trash2 size={16}/> Löschen</button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
