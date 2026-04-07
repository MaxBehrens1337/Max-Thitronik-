"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { getForumRole, ROLE_CONFIG, hasPermission, canEditPost, canDeletePost, canSolveTopic, canModerate } from '@/lib/roles';
import { timeAgo, toggleLike, markSolution, unmarkSolution, togglePin, toggleLock, moveTopic, deletePost as deletePostAction, deleteTopic, addReply, updatePost, reportPost, incrementViews } from '@/lib/forum';
import Link from 'next/link';
import {
  ArrowLeft, Heart, CheckCircle, Clock, Pin, Lock, MoreVertical,
  MessageCircle, Eye, Edit3, Trash2, Flag, Award, X, Send,
  ChevronDown, ArrowRight
} from 'lucide-react';

function RoleBadge({ role }) {
  const cfg = ROLE_CONFIG[role] || ROLE_CONFIG.user;
  return (
    <span className="forum-role-badge" style={{ background: cfg.bg, color: cfg.color }}>
      <span className="forum-role-dot" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
}

function LikeButton({ post, currentUser, onLikeToggle }) {
  const [animating, setAnimating] = useState(false);
  const isOwn = post.authorId === currentUser.id;
  const isLiked = (post.likes || []).some(l => l.userId === currentUser.id);
  const count = post.likeCount || 0;
  const likers = post.likes || [];

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOwn) return;
    setAnimating(true);
    onLikeToggle(post.id);
    setTimeout(() => setAnimating(false), 300);
  };

  if (isOwn) return null;

  return (
    <div className="forum-like-wrapper">
      <button className={`forum-like-btn ${isLiked ? 'forum-like-btn--active' : ''} ${animating ? 'forum-like-btn--bounce' : ''}`} onClick={handleLike} title={likers.length > 0 ? likers.slice(0, 10).map(l => l.userName).join(', ') + (likers.length > 10 ? ` und ${likers.length - 10} weitere` : '') : 'Gefällt mir'}>
        <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
        {count > 0 && <span className="forum-like-count">{count}</span>}
      </button>
    </div>
  );
}

export default function TopicDetailPage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { categoryId, topicId } = params;

  const [topic, setTopic] = useState(null);
  const [category, setCategory] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [openMenu, setOpenMenu] = useState(null);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [moveTarget, setMoveTarget] = useState('');
  const [showReportModal, setShowReportModal] = useState(null);
  const [reportReason, setReportReason] = useState('');

  const refreshData = useCallback(() => {
    const t = API.getForumTopic(topicId);
    setTopic(t);
    setCategory(API.getForumCategory(categoryId));
    setAllPosts(API.getForumPosts(topicId));
  }, [topicId, categoryId]);

  useEffect(() => {
    if (!currentUser) { router.push('/login'); return; }
    setMounted(true);
    refreshData();
    incrementViews(topicId);
  }, [currentUser, router, refreshData, topicId]);

  const users = useMemo(() => mounted ? API.getUsers() : [], [mounted]);
  const categories = useMemo(() => mounted ? API.getForumCategories() : [], [mounted]);
  const getUserName = (userId) => {
    const u = users.find(x => x.id === userId);
    return u ? `${u.firstName} ${u.lastName}` : 'Unbekannt';
  };
  const getUser = (userId) => users.find(x => x.id === userId);

  const forumRole = useMemo(() => currentUser ? getForumRole(currentUser.role) : 'user', [currentUser]);

  // Organize posts: OP first, then solution, then rest chronologically
  const organizedPosts = useMemo(() => {
    if (allPosts.length === 0) return [];
    const op = allPosts[0]; // First post is always OP
    const solution = allPosts.find(p => p.isSolution && p.id !== op.id);
    const rest = allPosts.filter(p => p.id !== op.id && !p.isSolution);
    const result = [op];
    if (solution) result.push(solution);
    result.push(...rest);
    return result;
  }, [allPosts]);

  // Handlers
  const handleLikeToggle = (postId) => {
    toggleLike(postId, currentUser.id, `${currentUser.firstName} ${currentUser.lastName}`);
    refreshData();
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (!replyContent.trim() || topic?.locked) return;
    addReply({ topicId, content: replyContent, user: currentUser });
    setReplyContent('');
    refreshData();
  };

  const handleEditSave = (postId) => {
    if (!editContent.trim()) return;
    updatePost(postId, editContent);
    setEditingPost(null);
    setEditContent('');
    refreshData();
  };

  const handleDelete = (postId) => {
    if (!confirm('Beitrag wirklich löschen?')) return;
    deletePostAction(postId);
    // If first post deleted, topic is gone — redirect
    if (allPosts[0]?.id === postId) {
      router.push(`/forum/${categoryId}`);
    } else {
      refreshData();
    }
  };

  const handleMarkSolution = (postId) => {
    if (topic?.solutionPostId === postId) {
      unmarkSolution(topicId);
    } else {
      markSolution(topicId, postId);
    }
    refreshData();
  };

  const handleTogglePin = () => { togglePin(topicId); refreshData(); setOpenMenu(null); };
  const handleToggleLock = () => { toggleLock(topicId); refreshData(); setOpenMenu(null); };
  const handleDeleteTopic = () => {
    if (!confirm('Gesamtes Thema löschen?')) return;
    deleteTopic(topicId);
    router.push(`/forum/${categoryId}`);
  };

  const handleMove = () => {
    if (!moveTarget) return;
    moveTopic(topicId, moveTarget);
    setShowMoveModal(false);
    router.push(`/forum/${moveTarget}/${topicId}`);
  };

  const handleReport = (postId) => {
    if (!reportReason.trim()) return;
    reportPost(postId, currentUser.id, reportReason);
    setShowReportModal(null);
    setReportReason('');
    refreshData();
  };

  if (!mounted || !currentUser || !topic || !category) return null;

  const isOP = (postIndex) => postIndex === 0;
  const canSolve = canSolveTopic(currentUser, topic);
  const isMod = canModerate(currentUser);

  return (
    <div className="forum-page">
      {/* Breadcrumb */}
      <nav className="forum-breadcrumb animate-fade-in-up">
        <Link href="/forum">Forum</Link>
        <span className="forum-breadcrumb-sep">/</span>
        <Link href={`/forum/${categoryId}`}>{category.title}</Link>
        <span className="forum-breadcrumb-sep">/</span>
        <span className="forum-breadcrumb-current">{topic.title.substring(0, 50)}{topic.title.length > 50 ? '…' : ''}</span>
      </nav>

      {/* Topic Header */}
      <div className="page-header animate-fade-in-up">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', width: '100%' }}>
          <Link href={`/forum/${categoryId}`} className="btn-back"><ArrowLeft size={18} /></Link>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {topic.pinned && <Pin size={16} style={{ color: 'var(--th-accent-lime)' }} />}
              {topic.locked && <Lock size={16} style={{ color: 'var(--text-muted)' }} />}
              {topic.solved && <CheckCircle size={16} style={{ color: 'var(--forum-solved-color, #22c55e)' }} />}
              <h1 className="page-title" style={{ fontSize: '1.3rem' }}>{topic.title}</h1>
            </div>
            <div className="forum-topic-meta" style={{ marginTop: '4px' }}>
              <RoleBadge role={topic.authorRole} />
              <span>{getUserName(topic.authorId)}</span>
              <span>·</span>
              <span>{timeAgo(topic.createdAt)}</span>
              <span>·</span>
              <span><Eye size={12} /> {topic.views}</span>
              <span>·</span>
              <span><MessageCircle size={12} /> {topic.replyCount} Antworten</span>
            </div>
          </div>
          {isMod && (
            <div className="forum-topic-actions-menu">
              <button className="forum-action-trigger" onClick={() => setOpenMenu(openMenu === 'topic' ? null : 'topic')}>
                <MoreVertical size={18} />
              </button>
              {openMenu === 'topic' && (
                <div className="forum-dropdown">
                  <button onClick={handleTogglePin}><Pin size={14} /> {topic.pinned ? 'Lösen' : 'Anpinnen'}</button>
                  <button onClick={handleToggleLock}><Lock size={14} /> {topic.locked ? 'Entsperren' : 'Sperren'}</button>
                  <button onClick={() => { setShowMoveModal(true); setOpenMenu(null); }}><ArrowRight size={14} /> Verschieben</button>
                  <button className="forum-dropdown-danger" onClick={handleDeleteTopic}><Trash2 size={14} /> Löschen</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Locked Banner */}
      {topic.locked && (
        <div className="forum-locked-banner animate-fade-in-up">
          <Lock size={16} /> Dieses Thema ist gesperrt. Neue Antworten sind nicht möglich.
        </div>
      )}

      {/* Posts */}
      <div className="forum-posts animate-fade-in-up stagger-1">
        {organizedPosts.map((post, idx) => {
          const author = getUser(post.authorId);
          const isEditing = editingPost === post.id;
          const canEdit = canEditPost(currentUser, post);
          const canDelete = canDeletePost(currentUser, post);
          const isFirst = allPosts[0]?.id === post.id;

          return (
            <div key={post.id} className={`forum-post card ${post.isSolution ? 'forum-post--solution' : ''} ${isFirst ? 'forum-post--op' : ''}`}>
              {post.isSolution && (
                <div className="forum-post-solution-badge"><CheckCircle size={14} /> Lösung</div>
              )}
              <div className="forum-post-header">
                <div className="forum-post-avatar">
                  {author?.profilePhoto ? <img src={author.profilePhoto} alt="" /> : <span>{(author?.firstName?.[0] || '') + (author?.lastName?.[0] || '')}</span>}
                </div>
                <div className="forum-post-author">
                  <div className="forum-post-author-name">
                    {getUserName(post.authorId)}
                    <RoleBadge role={post.authorRole} />
                  </div>
                  <div className="forum-post-date">
                    {timeAgo(post.createdAt)}
                    {post.updatedAt && <span className="forum-post-edited">(bearbeitet)</span>}
                  </div>
                </div>
                <div className="forum-post-actions-area">
                  <LikeButton post={post} currentUser={currentUser} onLikeToggle={handleLikeToggle} />
                  {(canEdit || canDelete || canSolve || hasPermission(forumRole, 'report')) && (
                    <div className="forum-post-menu-wrapper">
                      <button className="forum-action-trigger" onClick={() => setOpenMenu(openMenu === post.id ? null : post.id)}>
                        <MoreVertical size={16} />
                      </button>
                      {openMenu === post.id && (
                        <div className="forum-dropdown">
                          {canEdit && (
                            <button onClick={() => { setEditingPost(post.id); setEditContent(post.content); setOpenMenu(null); }}>
                              <Edit3 size={14} /> Bearbeiten
                            </button>
                          )}
                          {canDelete && (
                            <button className="forum-dropdown-danger" onClick={() => { handleDelete(post.id); setOpenMenu(null); }}>
                              <Trash2 size={14} /> Löschen
                            </button>
                          )}
                          {canSolve && !isFirst && (
                            <button onClick={() => { handleMarkSolution(post.id); setOpenMenu(null); }}>
                              <Award size={14} /> {post.isSolution ? 'Lösung aufheben' : 'Als Lösung markieren'}
                            </button>
                          )}
                          {hasPermission(forumRole, 'report') && post.authorId !== currentUser.id && (
                            <button onClick={() => { setShowReportModal(post.id); setOpenMenu(null); }}>
                              <Flag size={14} /> Melden
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="forum-post-content">
                {isEditing ? (
                  <div className="forum-edit-area">
                    <textarea value={editContent} onChange={e => setEditContent(e.target.value)} rows={4} className="forum-reply-textarea" />
                    <div className="forum-edit-buttons">
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditingPost(null)}>Abbrechen</button>
                      <button className="btn btn-primary btn-sm" onClick={() => handleEditSave(post.id)}>Speichern</button>
                    </div>
                  </div>
                ) : (
                  <div className="forum-post-text">{post.content.split('\n').map((line, i) => <p key={i}>{line}</p>)}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reply Editor */}
      {!topic.locked && (
        <div className="forum-reply-section card animate-fade-in-up stagger-2">
          <h3 className="forum-reply-title">Antwort schreiben</h3>
          <form onSubmit={handleReply}>
            <textarea
              className="forum-reply-textarea"
              value={replyContent}
              onChange={e => setReplyContent(e.target.value)}
              placeholder="Deine Antwort eingeben…"
              rows={4}
              required
            />
            <div className="forum-reply-footer">
              <button type="submit" className="btn btn-primary" disabled={!replyContent.trim()} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Send size={16} /> Antwort senden
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Move Modal */}
      {showMoveModal && (
        <div className="forum-modal-overlay" onClick={() => setShowMoveModal(false)}>
          <div className="forum-modal card" onClick={e => e.stopPropagation()}>
            <div className="forum-modal-header">
              <h3>Thema verschieben</h3>
              <button className="forum-modal-close" onClick={() => setShowMoveModal(false)}><X size={20} /></button>
            </div>
            <div className="forum-modal-body">
              <div className="form-group">
                <label>Ziel-Kategorie</label>
                <select value={moveTarget} onChange={e => setMoveTarget(e.target.value)}>
                  <option value="">— Kategorie wählen —</option>
                  {categories.filter(c => c.id !== categoryId).map(c => (
                    <option key={c.id} value={c.id}>{c.group} → {c.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="forum-modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowMoveModal(false)}>Abbrechen</button>
              <button className="btn btn-primary" onClick={handleMove} disabled={!moveTarget}>Verschieben</button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="forum-modal-overlay" onClick={() => setShowReportModal(null)}>
          <div className="forum-modal card" onClick={e => e.stopPropagation()}>
            <div className="forum-modal-header">
              <h3>Beitrag melden</h3>
              <button className="forum-modal-close" onClick={() => setShowReportModal(null)}><X size={20} /></button>
            </div>
            <div className="forum-modal-body">
              <div className="form-group">
                <label>Grund der Meldung</label>
                <textarea value={reportReason} onChange={e => setReportReason(e.target.value)} placeholder="Beschreibe kurz, warum dieser Beitrag gemeldet werden soll…" rows={3} />
              </div>
            </div>
            <div className="forum-modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowReportModal(null)}>Abbrechen</button>
              <button className="btn btn-primary" onClick={() => handleReport(showReportModal)} disabled={!reportReason.trim()} style={{ background: 'var(--th-red-brand)' }}>Melden</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
