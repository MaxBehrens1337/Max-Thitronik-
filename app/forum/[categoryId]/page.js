"use client";

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { getForumRole, ROLE_CONFIG, hasPermission } from '@/lib/roles';
import { timeAgo } from '@/lib/forum';
import Link from 'next/link';
import {
  ArrowLeft, Plus, MessageCircle, Eye, CheckCircle, Clock, Pin,
  Heart, Lock, ChevronLeft, ChevronRight, SlidersHorizontal
} from 'lucide-react';

const ITEMS_PER_PAGE = 20;

function RoleBadge({ role }) {
  const cfg = ROLE_CONFIG[role] || ROLE_CONFIG.user;
  return (
    <span className="forum-role-badge" style={{ background: cfg.bg, color: cfg.color }}>
      <span className="forum-role-dot" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
}

export default function CategoryPage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const params = useParams();
  const categoryId = params.categoryId;

  const [topics, setTopics] = useState([]);
  const [category, setCategory] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!currentUser) { router.push('/login'); return; }
    setMounted(true);
    const cat = API.getForumCategory(categoryId);
    setCategory(cat);
    setTopics(API.getForumTopics(categoryId));
  }, [currentUser, router, categoryId]);

  const users = useMemo(() => mounted ? API.getUsers() : [], [mounted]);
  const getUserName = (userId) => {
    const u = users.find(x => x.id === userId);
    return u ? `${u.firstName} ${u.lastName}` : 'Unbekannt';
  };

  // Sort
  const sortedTopics = useMemo(() => {
    let filtered = [...topics];

    // Filter by status
    if (filterStatus === 'solved') filtered = filtered.filter(t => t.solved);
    if (filterStatus === 'unsolved') filtered = filtered.filter(t => !t.solved);

    // Separate pinned
    const pinned = filtered.filter(t => t.pinned);
    const regular = filtered.filter(t => !t.pinned);

    // Sort regular topics
    switch (sortBy) {
      case 'newest': regular.sort((a, b) => new Date(b.lastActivityAt || b.createdAt) - new Date(a.lastActivityAt || a.createdAt)); break;
      case 'replies': regular.sort((a, b) => (b.replyCount || 0) - (a.replyCount || 0)); break;
      case 'likes': regular.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0)); break;
      case 'unanswered': regular.sort((a, b) => (a.replyCount || 0) - (b.replyCount || 0)); break;
    }

    return [...pinned, ...regular];
  }, [topics, sortBy, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(sortedTopics.length / ITEMS_PER_PAGE);
  const paginatedTopics = sortedTopics.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (!mounted || !currentUser || !category) return null;

  return (
    <div className="forum-page">
      {/* Breadcrumb */}
      <nav className="forum-breadcrumb animate-fade-in-up">
        <Link href="/forum">Forum</Link>
        <span className="forum-breadcrumb-sep">/</span>
        <span className="forum-breadcrumb-current">{category.title}</span>
      </nav>

      <div className="page-header animate-fade-in-up">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/forum" className="btn-back"><ArrowLeft size={18} /></Link>
          <div>
            <h1 className="page-title">{category.title}</h1>
            <p className="page-subtitle">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="forum-toolbar animate-fade-in-up stagger-1">
        <div className="forum-filter-group">
          <select className="forum-select" value={sortBy} onChange={e => { setSortBy(e.target.value); setPage(1); }}>
            <option value="newest">Neueste</option>
            <option value="replies">Meiste Antworten</option>
            <option value="likes">Meiste Likes</option>
            <option value="unanswered">Unbeantwortet</option>
          </select>
          <select className="forum-select" value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}>
            <option value="all">Alle</option>
            <option value="solved">Gelöst</option>
            <option value="unsolved">Ungelöst</option>
          </select>
        </div>
        <Link href={`/forum/new?category=${categoryId}`} className="btn btn-primary forum-new-btn">
          <Plus size={18} /> Neues Thema
        </Link>
      </div>

      {/* Topic List */}
      <div className="card animate-fade-in-up stagger-2">
        <div className="forum-recent-list">
          {paginatedTopics.length === 0 ? (
            <div className="empty-state">Keine Themen in dieser Kategorie.</div>
          ) : (
            paginatedTopics.map(topic => (
              <Link key={topic.id} href={`/forum/${categoryId}/${topic.id}`} className={`forum-topic-row ${topic.pinned ? 'forum-topic-row--pinned' : ''}`}>
                <div className="forum-topic-status">
                  {topic.pinned && <Pin size={14} className="forum-topic-pin" />}
                  {topic.locked && <Lock size={14} className="forum-topic-lock" />}
                  {topic.solved ? <CheckCircle size={18} className="forum-topic-solved" /> : <Clock size={18} className="forum-topic-open" />}
                </div>
                <div className="forum-topic-info">
                  <div className="forum-topic-title">{topic.title}</div>
                  <div className="forum-topic-meta">
                    <RoleBadge role={topic.authorRole} />
                    <span>{getUserName(topic.authorId)}</span>
                    <span>·</span>
                    <span>{timeAgo(topic.lastActivityAt || topic.createdAt)}</span>
                  </div>
                </div>
                <div className="forum-topic-counts">
                  <div className="forum-topic-count"><MessageCircle size={14} /><span>{topic.replyCount || 0}</span></div>
                  <div className="forum-topic-count"><Eye size={14} /><span>{topic.views || 0}</span></div>
                  {(topic.likeCount || 0) > 0 && <div className="forum-topic-count"><Heart size={14} /><span>{topic.likeCount}</span></div>}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="forum-pagination animate-fade-in-up stagger-3">
          <button className="forum-pagination-btn" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
            <ChevronLeft size={16} /> Zurück
          </button>
          <div className="forum-pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} className={`forum-pagination-page ${p === page ? 'forum-pagination-page--active' : ''}`} onClick={() => setPage(p)}>{p}</button>
            ))}
          </div>
          <button className="forum-pagination-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
            Weiter <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
