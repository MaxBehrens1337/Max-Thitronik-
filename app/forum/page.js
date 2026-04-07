"use client";

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { getForumRole, ROLE_CONFIG, hasPermission } from '@/lib/roles';
import { timeAgo, getForumStats } from '@/lib/forum';
import Link from 'next/link';
import {
  Search, MessageSquare, Eye, MessageCircle, CheckCircle, Clock, Pin,
  Plus, ChevronDown, ChevronRight, Users as UsersIcon,
  TrendingUp, Wifi, Heart, Lock
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

export default function ForumPage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('forum');
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!currentUser) { router.push('/login'); return; }
    setMounted(true);
    setCategories(API.getForumCategories());
    setTopics(API.getForumTopics());
    setPosts(API.getForumPosts());
  }, [currentUser, router]);

  const users = useMemo(() => mounted ? API.getUsers() : [], [mounted]);
  const getUserName = (userId) => {
    const u = users.find(x => x.id === userId);
    return u ? `${u.firstName} ${u.lastName}` : 'Unbekannt';
  };

  const stats = useMemo(() => mounted ? getForumStats(users) : {}, [mounted, users]);

  const onlineCount = useMemo(() => {
    if (!mounted) return 0;
    return Math.min(users.length, Math.max(2, Math.floor(users.length * 0.6)));
  }, [mounted, users]);

  // Search filter
  const filterBySearch = (items, fields) => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(item => fields.some(f => item[f]?.toLowerCase().includes(q)));
  };

  const filteredCategories = filterBySearch(categories, ['title', 'description', 'group']);
  const filteredTopics = filterBySearch(topics, ['title']);

  // Group categories
  const groupedCategories = useMemo(() => {
    const groups = {};
    filteredCategories.forEach(cat => {
      if (!groups[cat.group]) groups[cat.group] = [];
      groups[cat.group].push(cat);
    });
    return groups;
  }, [filteredCategories]);

  const toggleGroup = (group) => {
    setCollapsedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  // Pinned topics
  const pinnedTopics = topics.filter(t => t.pinned);

  // Recent topics
  const recentTopics = useMemo(() => {
    return [...filteredTopics].sort((a, b) => new Date(b.lastActivityAt || b.createdAt) - new Date(a.lastActivityAt || a.createdAt));
  }, [filteredTopics]);

  // Online members
  const onlineMembers = useMemo(() => {
    return users.map((u, i) => ({
      ...u,
      online: u.id === currentUser?.id || i < onlineCount,
      forumRole: getForumRole(u.role)
    }));
  }, [users, currentUser, onlineCount]);

  if (!mounted || !currentUser) return null;

  const getCategoryTopicCount = (catId) => topics.filter(t => t.categoryId === catId).length;
  const getCategoryPostCount = (catId) => {
    const catTopicIds = topics.filter(t => t.categoryId === catId).map(t => t.id);
    return posts.filter(p => catTopicIds.includes(p.topicId)).length;
  };

  const getLastTopic = (catId) => {
    const catTopics = topics.filter(t => t.categoryId === catId);
    if (catTopics.length === 0) return null;
    return catTopics.sort((a, b) => new Date(b.lastActivityAt || b.createdAt) - new Date(a.lastActivityAt || a.createdAt))[0];
  };

  return (
    <div className="forum-page">
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">Händler-Forum</h1>
        <p className="page-subtitle">Austausch zwischen Händlern und dem Thitronik Support-Team.</p>
      </div>

      {/* Stats Bar */}
      <div className="forum-stats animate-fade-in-up stagger-1">
        <div className="forum-stat"><MessageSquare size={16} /><span className="forum-stat-value">{stats.totalTopics || 0}</span><span className="forum-stat-label">Themen</span></div>
        <div className="forum-stat"><MessageCircle size={16} /><span className="forum-stat-value">{stats.totalPosts || 0}</span><span className="forum-stat-label">Beiträge</span></div>
        <div className="forum-stat"><UsersIcon size={16} /><span className="forum-stat-value">{stats.memberCount || 0}</span><span className="forum-stat-label">Mitglieder</span></div>
        <div className="forum-stat"><Wifi size={16} /><span className="forum-stat-value">{onlineCount}</span><span className="forum-stat-label">Online</span></div>
        <div className="forum-stat"><TrendingUp size={16} /><span className="forum-stat-value">{stats.solutionRate || 0}%</span><span className="forum-stat-label">Gelöst</span></div>
      </div>

      {/* Search + New Topic */}
      <div className="forum-toolbar animate-fade-in-up stagger-2">
        <div className="forum-search">
          <Search size={18} className="forum-search-icon" />
          <input type="text" placeholder="Forum durchsuchen…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="forum-search-input" />
        </div>
        <Link href="/forum/new" className="btn btn-primary forum-new-btn">
          <Plus size={18} /> Neues Thema
        </Link>
      </div>

      {/* Tab Navigation */}
      <div className="forum-tabs animate-fade-in-up stagger-2">
        <button className={`forum-tab ${activeTab === 'forum' ? 'forum-tab--active' : ''}`} onClick={() => setActiveTab('forum')}><MessageSquare size={16} /> Forum</button>
        <button className={`forum-tab ${activeTab === 'recent' ? 'forum-tab--active' : ''}`} onClick={() => setActiveTab('recent')}><Clock size={16} /> Letzte Aktivität</button>
        <button className={`forum-tab ${activeTab === 'members' ? 'forum-tab--active' : ''}`} onClick={() => setActiveTab('members')}><UsersIcon size={16} /> Mitglieder Online</button>
      </div>

      {/* TAB: Forum */}
      {activeTab === 'forum' && (
        <div className="animate-fade-in-up">
          {pinnedTopics.length > 0 && (
            <div className="forum-pinned card">
              <div className="forum-pinned-header"><Pin size={14} /> Angepinnte Beiträge</div>
              {pinnedTopics.map(topic => (
                <Link key={topic.id} href={`/forum/${topic.categoryId}/${topic.id}`} className="forum-pinned-item">
                  <Pin size={12} className="forum-pinned-icon" />
                  <span className="forum-pinned-title">{topic.title}</span>
                  <RoleBadge role={topic.authorRole} />
                  <span className="forum-pinned-meta">{getUserName(topic.authorId)} · {timeAgo(topic.createdAt)}</span>
                </Link>
              ))}
            </div>
          )}

          {Object.entries(groupedCategories).map(([group, cats]) => (
            <div key={group} className="forum-group card">
              <button className="forum-group-header" onClick={() => toggleGroup(group)}>
                {collapsedGroups[group] ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
                <span className="forum-group-title">{group}</span>
                <span className="forum-group-count">{cats.length} Kategorien</span>
              </button>
              {!collapsedGroups[group] && (
                <div className="forum-group-body">
                  {cats.map(cat => {
                    const lastTopic = getLastTopic(cat.id);
                    return (
                      <Link key={cat.id} href={`/forum/${cat.id}`} className="forum-category-row">
                        <div className="forum-category-icon"><MessageSquare size={20} /></div>
                        <div className="forum-category-info">
                          <div className="forum-category-title">{cat.title}</div>
                          <div className="forum-category-desc">{cat.description}</div>
                        </div>
                        <div className="forum-category-stats">
                          <div className="forum-category-stat">
                            <span className="forum-category-stat-value">{getCategoryTopicCount(cat.id)}</span>
                            <span className="forum-category-stat-label">Themen</span>
                          </div>
                          <div className="forum-category-stat">
                            <span className="forum-category-stat-value">{getCategoryPostCount(cat.id)}</span>
                            <span className="forum-category-stat-label">Beiträge</span>
                          </div>
                        </div>
                        <div className="forum-category-last">
                          {lastTopic ? (
                            <>
                              <div className="forum-category-last-title">{lastTopic.title.substring(0, 40)}{lastTopic.title.length > 40 ? '…' : ''}</div>
                              <div className="forum-category-last-meta">
                                <RoleBadge role={lastTopic.authorRole} />
                                <span>{timeAgo(lastTopic.lastActivityAt || lastTopic.createdAt)}</span>
                              </div>
                            </>
                          ) : (
                            <span className="forum-category-last-empty">Noch keine Beiträge</span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB: Recent Activity */}
      {activeTab === 'recent' && (
        <div className="card animate-fade-in-up">
          <div className="forum-recent-list">
            {recentTopics.length === 0 ? (
              <div className="empty-state">Keine Themen gefunden.</div>
            ) : (
              recentTopics.map(topic => {
                const cat = categories.find(c => c.id === topic.categoryId);
                return (
                  <Link key={topic.id} href={`/forum/${topic.categoryId}/${topic.id}`} className="forum-topic-row">
                    <div className="forum-topic-status">
                      {topic.pinned && <Pin size={14} className="forum-topic-pin" />}
                      {topic.locked && <Lock size={14} className="forum-topic-lock" />}
                      {topic.solved ? <CheckCircle size={18} className="forum-topic-solved" /> : <Clock size={18} className="forum-topic-open" />}
                    </div>
                    <div className="forum-topic-info">
                      <div className="forum-topic-title">{topic.title}</div>
                      <div className="forum-topic-meta">
                        {cat && <span className="forum-topic-cat-tag">{cat.title}</span>}
                        <RoleBadge role={topic.authorRole} />
                        <span>{getUserName(topic.authorId)}</span>
                        <span>·</span>
                        <span>{timeAgo(topic.lastActivityAt || topic.createdAt)}</span>
                      </div>
                    </div>
                    <div className="forum-topic-counts">
                      <div className="forum-topic-count"><MessageCircle size={14} /><span>{topic.replyCount}</span></div>
                      <div className="forum-topic-count"><Eye size={14} /><span>{topic.views}</span></div>
                      {(topic.likeCount || 0) > 0 && <div className="forum-topic-count"><Heart size={14} /><span>{topic.likeCount}</span></div>}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB: Members Online */}
      {activeTab === 'members' && (
        <div className="card animate-fade-in-up">
          <div className="forum-members-list">
            {onlineMembers.map(member => (
              <div key={member.id} className="forum-member-row">
                <div className="forum-member-avatar">
                  {member.profilePhoto ? <img src={member.profilePhoto} alt="" /> : <span>{(member.firstName?.[0] || '') + (member.lastName?.[0] || '')}</span>}
                  <span className={`forum-member-indicator ${member.online ? 'forum-member-indicator--online' : ''}`} />
                </div>
                <div className="forum-member-info">
                  <div className="forum-member-name">{member.firstName} {member.lastName}</div>
                  <RoleBadge role={member.forumRole} />
                </div>
                <div className="forum-member-status">{member.online ? 'Online' : 'Offline'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
