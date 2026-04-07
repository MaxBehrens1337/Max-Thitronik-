"use client";

// ============================================
// THITRONIK Forum — Rollen & Berechtigungen
// ============================================

const PERMISSIONS = {
  admin:   ['create_topic', 'reply', 'like', 'edit_own', 'edit_any', 'delete_any', 'pin', 'lock', 'move', 'solve', 'manage_categories', 'manage_users', 'manage_reports', 'manage_settings'],
  manager: ['create_topic', 'reply', 'like', 'edit_own', 'edit_any', 'delete_any', 'pin', 'lock', 'move', 'solve', 'manage_reports'],
  user:    ['create_topic', 'reply', 'like', 'edit_own', 'solve_own', 'report']
};

/**
 * Map app-level role to forum role
 * admin → admin, trainer → manager, learner → user
 */
export function getForumRole(appRole) {
  if (appRole === 'admin') return 'admin';
  if (appRole === 'trainer') return 'manager';
  return 'user';
}

/**
 * Check if a forum role has a specific permission
 */
export function hasPermission(forumRole, action) {
  return PERMISSIONS[forumRole]?.includes(action) ?? false;
}

/**
 * Check if user can edit a specific post
 * - Admin/Manager can edit any post
 * - Users can only edit their own posts within 30 minutes
 */
export function canEditPost(user, post) {
  const role = getForumRole(user.role);
  if (hasPermission(role, 'edit_any')) return true;
  if (hasPermission(role, 'edit_own') && post.authorId === user.id) {
    const thirtyMinutes = 30 * 60 * 1000;
    return (Date.now() - new Date(post.createdAt).getTime()) < thirtyMinutes;
  }
  return false;
}

/**
 * Check if user can delete a specific post
 */
export function canDeletePost(user, post) {
  const role = getForumRole(user.role);
  return hasPermission(role, 'delete_any');
}

/**
 * Check if user can mark a topic as solved
 * - Admin/Manager can solve any topic
 * - Users can only solve their own topics
 */
export function canSolveTopic(user, topic) {
  const role = getForumRole(user.role);
  if (hasPermission(role, 'solve')) return true;
  if (hasPermission(role, 'solve_own') && topic.authorId === user.id) return true;
  return false;
}

/**
 * Check if user can perform moderation actions (pin, lock, move, delete topic)
 */
export function canModerate(user) {
  const role = getForumRole(user.role);
  return hasPermission(role, 'pin');
}

/**
 * Role display configuration for badges
 */
export const ROLE_CONFIG = {
  admin:   { label: 'ADMIN',   color: 'var(--forum-role-admin)',   bg: 'var(--forum-role-admin-bg)',   dot: 'var(--forum-role-admin)' },
  manager: { label: 'MANAGER', color: 'var(--forum-role-manager)', bg: 'var(--forum-role-manager-bg)', dot: 'var(--forum-role-manager)' },
  user:    { label: 'HÄNDLER', color: 'var(--forum-role-dealer)',  bg: 'var(--forum-role-dealer-bg)',  dot: 'var(--forum-role-dealer)' },
};
