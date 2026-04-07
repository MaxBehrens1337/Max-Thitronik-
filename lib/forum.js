"use client";

// ============================================
// THITRONIK Forum — Datenlogik (CRUD)
// ============================================

import { API } from './store';
import { getForumRole } from './roles';

/**
 * Create a new topic with its first post
 */
export function createTopic({ categoryId, title, content, user }) {
  const forumRole = getForumRole(user.role);
  const topicId = 'ft_' + API.generateId();
  const postId = 'fp_' + API.generateId();
  const now = new Date().toISOString();

  const topic = {
    id: topicId,
    categoryId,
    title: title.trim(),
    authorId: user.id,
    authorRole: forumRole,
    pinned: false,
    locked: false,
    solved: false,
    solutionPostId: null,
    views: 0,
    replyCount: 0,
    likeCount: 0,
    createdAt: now,
    lastActivityAt: now,
  };

  const post = {
    id: postId,
    topicId,
    authorId: user.id,
    authorRole: forumRole,
    content: content.trim(),
    createdAt: now,
    updatedAt: null,
    likes: [],
    likeCount: 0,
    isSolution: false,
    reported: false,
  };

  API.saveForumTopic(topic);
  API.saveForumPost(post);
  return { topic, post };
}

/**
 * Add a reply to a topic
 */
export function addReply({ topicId, content, user }) {
  const forumRole = getForumRole(user.role);
  const now = new Date().toISOString();

  const post = {
    id: 'fp_' + API.generateId(),
    topicId,
    authorId: user.id,
    authorRole: forumRole,
    content: content.trim(),
    createdAt: now,
    updatedAt: null,
    likes: [],
    likeCount: 0,
    isSolution: false,
    reported: false,
  };

  API.saveForumPost(post);

  // Update topic reply count and last activity
  const topic = API.getForumTopic(topicId);
  if (topic) {
    topic.replyCount = (topic.replyCount || 0) + 1;
    topic.lastActivityAt = now;
    API.saveForumTopic(topic);
  }

  return post;
}

/**
 * Update an existing post's content
 */
export function updatePost(postId, newContent) {
  const posts = API.getForumPosts();
  const idx = posts.findIndex(p => p.id === postId);
  if (idx < 0) return null;
  posts[idx].content = newContent.trim();
  posts[idx].updatedAt = new Date().toISOString();
  API.saveForumPosts(posts);
  return posts[idx];
}

/**
 * Delete a post. If it's the first post, delete the entire topic.
 */
export function deletePost(postId) {
  const allPosts = API.getForumPosts();
  const post = allPosts.find(p => p.id === postId);
  if (!post) return false;

  // Check if this is the first post of the topic (OP)
  const topicPosts = allPosts
    .filter(p => p.topicId === post.topicId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  if (topicPosts[0]?.id === postId) {
    // Delete entire topic + all its posts
    return deleteTopic(post.topicId);
  }

  // Delete just this post
  API.saveForumPosts(allPosts.filter(p => p.id !== postId));

  // Update reply count
  const topic = API.getForumTopic(post.topicId);
  if (topic) {
    topic.replyCount = Math.max(0, (topic.replyCount || 1) - 1);
    if (topic.solutionPostId === postId) {
      topic.solutionPostId = null;
      topic.solved = false;
    }
    API.saveForumTopic(topic);
  }

  return true;
}

/**
 * Delete a topic and all its posts
 */
export function deleteTopic(topicId) {
  const topics = API.getForumTopics().filter(t => t.id !== topicId);
  API.saveForumTopics(topics);
  const posts = API.getForumPosts().filter(p => p.topicId !== topicId);
  API.saveForumPosts(posts);
  return true;
}

/**
 * Toggle like on a post
 */
export function toggleLike(postId, userId, userName) {
  const posts = API.getForumPosts();
  const idx = posts.findIndex(p => p.id === postId);
  if (idx < 0) return null;

  const post = posts[idx];
  if (!post.likes) post.likes = [];

  const likeIdx = post.likes.findIndex(l => l.userId === userId);
  if (likeIdx >= 0) {
    // Remove like
    post.likes.splice(likeIdx, 1);
  } else {
    // Add like
    post.likes.push({ userId, userName, timestamp: new Date().toISOString() });
  }
  post.likeCount = post.likes.length;
  posts[idx] = post;
  API.saveForumPosts(posts);

  // Update topic total like count
  const topicPosts = posts.filter(p => p.topicId === post.topicId);
  const topic = API.getForumTopic(post.topicId);
  if (topic) {
    topic.likeCount = topicPosts.reduce((sum, p) => sum + (p.likeCount || 0), 0);
    API.saveForumTopic(topic);
  }

  return post;
}

/**
 * Mark a post as the solution for its topic
 */
export function markSolution(topicId, postId) {
  const posts = API.getForumPosts();
  // Clear previous solution
  posts.forEach(p => {
    if (p.topicId === topicId) p.isSolution = (p.id === postId);
  });
  API.saveForumPosts(posts);

  // Update topic
  const topic = API.getForumTopic(topicId);
  if (topic) {
    topic.solved = true;
    topic.solutionPostId = postId;
    API.saveForumTopic(topic);
  }
}

/**
 * Unmark solution
 */
export function unmarkSolution(topicId) {
  const posts = API.getForumPosts();
  posts.forEach(p => {
    if (p.topicId === topicId) p.isSolution = false;
  });
  API.saveForumPosts(posts);

  const topic = API.getForumTopic(topicId);
  if (topic) {
    topic.solved = false;
    topic.solutionPostId = null;
    API.saveForumTopic(topic);
  }
}

/**
 * Toggle pin on a topic
 */
export function togglePin(topicId) {
  const topic = API.getForumTopic(topicId);
  if (!topic) return;
  topic.pinned = !topic.pinned;
  API.saveForumTopic(topic);
  return topic;
}

/**
 * Toggle lock on a topic
 */
export function toggleLock(topicId) {
  const topic = API.getForumTopic(topicId);
  if (!topic) return;
  topic.locked = !topic.locked;
  API.saveForumTopic(topic);
  return topic;
}

/**
 * Move topic to another category
 */
export function moveTopic(topicId, newCategoryId) {
  const topic = API.getForumTopic(topicId);
  if (!topic) return;
  topic.categoryId = newCategoryId;
  API.saveForumTopic(topic);
  return topic;
}

/**
 * Increment view count
 */
export function incrementViews(topicId) {
  const topic = API.getForumTopic(topicId);
  if (!topic) return;
  topic.views = (topic.views || 0) + 1;
  API.saveForumTopic(topic);
}

/**
 * Report a post
 */
export function reportPost(postId, userId, reason) {
  const reports = API.getForumReports();
  reports.push({
    id: 'fr_' + API.generateId(),
    postId,
    reportedBy: userId,
    reason,
    createdAt: new Date().toISOString(),
    status: 'pending',
  });
  API.saveForumReports(reports);

  // Mark post as reported
  const posts = API.getForumPosts();
  const idx = posts.findIndex(p => p.id === postId);
  if (idx >= 0) {
    posts[idx].reported = true;
    API.saveForumPosts(posts);
  }
}

/**
 * Dismiss a report
 */
export function dismissReport(reportId) {
  const reports = API.getForumReports();
  const idx = reports.findIndex(r => r.id === reportId);
  if (idx >= 0) {
    reports[idx].status = 'dismissed';
    API.saveForumReports(reports);
  }
}

/**
 * Helper: Get all data needed for forum stats
 */
export function getForumStats(users) {
  const topics = API.getForumTopics();
  const posts = API.getForumPosts();
  const totalTopics = topics.length;
  const totalPosts = posts.length;
  const solvedCount = topics.filter(t => t.solved).length;
  const solutionRate = totalTopics > 0 ? Math.round((solvedCount / totalTopics) * 100) : 0;
  const memberCount = users.filter(u => u.role === 'learner' || u.role === 'trainer').length;
  return { totalTopics, totalPosts, solvedCount, solutionRate, memberCount };
}

/**
 * Helper: timeAgo for dates
 */
export function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'gerade eben';
  if (mins < 60) return `vor ${mins} Min.`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `vor ${hrs} Std.`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `vor ${days} T.`;
  const months = Math.floor(days / 30);
  return `vor ${months} Mon.`;
}
