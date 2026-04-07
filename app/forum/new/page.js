"use client";

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { createTopic } from '@/lib/forum';
import Link from 'next/link';
import { ArrowLeft, Send, Eye, EyeOff } from 'lucide-react';

export default function NewTopicPage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCategory = searchParams.get('category') || '';

  const [categoryId, setCategoryId] = useState(preselectedCategory);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [categories, setCategories] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!currentUser) { router.push('/login'); return; }
    setMounted(true);
    setCategories(API.getForumCategories());
  }, [currentUser, router]);

  const isValid = categoryId && title.trim().length >= 10 && content.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);

    const { topic } = createTopic({
      categoryId,
      title,
      content,
      user: currentUser
    });

    router.push(`/forum/${categoryId}/${topic.id}`);
  };

  if (!mounted || !currentUser) return null;

  return (
    <div className="forum-page">
      {/* Breadcrumb */}
      <nav className="forum-breadcrumb animate-fade-in-up">
        <Link href="/forum">Forum</Link>
        <span className="forum-breadcrumb-sep">/</span>
        <span className="forum-breadcrumb-current">Neues Thema</span>
      </nav>

      <div className="page-header animate-fade-in-up">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => router.back()} className="btn-back"><ArrowLeft size={18} /></button>
          <div>
            <h1 className="page-title">Neues Thema erstellen</h1>
            <p className="page-subtitle">Stelle eine Frage oder teile deine Erfahrung mit der Community.</p>
          </div>
        </div>
      </div>

      <div className="card animate-fade-in-up stagger-1">
        <form onSubmit={handleSubmit} className="forum-new-topic-form">
          <div className="form-group">
            <label htmlFor="nt-category">Kategorie *</label>
            <select id="nt-category" value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
              <option value="">— Kategorie wählen —</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.group} → {cat.title}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="nt-title">Titel * <span className="forum-char-count">{title.length}/10 Zeichen min.</span></label>
            <input
              id="nt-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Kurzer, aussagekräftiger Titel (mind. 10 Zeichen)"
              required
              minLength={10}
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="nt-content">Nachricht *</label>
              <button type="button" className="forum-preview-toggle" onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? <><EyeOff size={14} /> Editor</> : <><Eye size={14} /> Vorschau</>}
              </button>
            </div>

            {showPreview ? (
              <div className="forum-preview-area">
                {content ? content.split('\n').map((line, i) => <p key={i}>{line || '\u00A0'}</p>) : <p className="text-muted">Noch kein Inhalt zum Anzeigen.</p>}
              </div>
            ) : (
              <textarea
                id="nt-content"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Beschreibe das Problem möglichst genau: Fahrzeugtyp, Produktversion, Fehlerbeschreibung …"
                rows={8}
                required
              />
            )}
          </div>

          <div className="forum-new-topic-footer">
            <button type="button" className="btn btn-secondary" onClick={() => router.back()}>Abbrechen</button>
            <button type="submit" className="btn btn-primary" disabled={!isValid || submitting} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Send size={16} /> Thema erstellen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
