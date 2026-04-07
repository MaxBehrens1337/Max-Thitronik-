"use client";

// ============================================
// THITRONIK Data Store
// LocalStorage-basierter Daten-Store (Next.js Version)
// ============================================

const STORE_PREFIX = 'th_';

export const Store = {
  _cache: {},

  get(key) {
    if (this._cache[key] !== undefined) return this._cache[key];
    if (typeof window === 'undefined') return null; // SSR Fallback
    try {
      const raw = localStorage.getItem(STORE_PREFIX + key);
      const val = raw ? JSON.parse(raw) : null;
      this._cache[key] = val;
      return val;
    } catch { return null; }
  },

  set(key, value) {
    this._cache[key] = value;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORE_PREFIX + key, JSON.stringify(value));
      // Event-Dispatch für React-Reaktivität über Tabs hinweg
      window.dispatchEvent(new Event('th_store_change'));
    }
  },

  remove(key) {
    delete this._cache[key];
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORE_PREFIX + key);
      window.dispatchEvent(new Event('th_store_change'));
    }
  },

  clearAll() {
    this._cache = {};
    if (typeof window !== 'undefined') {
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith(STORE_PREFIX)) localStorage.removeItem(k);
      });
      window.dispatchEvent(new Event('th_store_change'));
    }
  }
};

// ============================================
// API Abstraction Layer
// ============================================
export const API = {
  getUsers() { return Store.get('users') || []; },
  getUser(id) { return this.getUsers().find(u => u.id === id); },
  saveUsers(users) { Store.set('users', users); },
  getCurrentUser() { return Store.get('currentUser'); },
  setCurrentUser(user) { Store.set('currentUser', user); },
  logout() { Store.remove('currentUser'); },

  getCourses() { return Store.get('courses') || []; },
  getCourse(id) { return this.getCourses().find(c => c.id === id); },
  saveCourses(courses) { Store.set('courses', courses); },
  saveCourse(course) {
    const courses = this.getCourses();
    const idx = courses.findIndex(c => c.id === course.id);
    if (idx >= 0) courses[idx] = course;
    else courses.push(course);
    this.saveCourses(courses);
  },
  deleteCourse(id) { this.saveCourses(this.getCourses().filter(c => c.id !== id)); },

  getLessons(courseId) {
    const all = Store.get('lessons') || [];
    if (!courseId) return all;
    return all.filter(l => l.courseId === courseId).sort((a,b) => a.sortOrder - b.sortOrder);
  },
  getLesson(id) { return (Store.get('lessons') || []).find(l => l.id === id); },
  saveLessons(lessons) { Store.set('lessons', lessons); },
  saveLesson(lesson) {
    const lessons = Store.get('lessons') || [];
    const idx = lessons.findIndex(l => l.id === lesson.id);
    if (idx >= 0) lessons[idx] = lesson;
    else lessons.push(lesson);
    this.saveLessons(lessons);
  },
  deleteLesson(id) { this.saveLessons((Store.get('lessons') || []).filter(l => l.id !== id)); },

  getQuestions(lessonId) {
    const all = Store.get('questions') || [];
    if (!lessonId) return all;
    return all.filter(q => q.lessonId === lessonId).sort((a,b) => a.sortOrder - b.sortOrder);
  },
  getQuestion(id) { return (Store.get('questions') || []).find(q => q.id === id); },
  saveQuestions(questions) { Store.set('questions', questions); },
  saveQuestion(q) {
    const qs = Store.get('questions') || [];
    const idx = qs.findIndex(x => x.id === q.id);
    if (idx >= 0) qs[idx] = q;
    else qs.push(q);
    this.saveQuestions(qs);
  },
  deleteQuestion(id) { this.saveQuestions((Store.get('questions') || []).filter(q => q.id !== id)); },

  getProgress(userId) {
    const all = Store.get('progress') || [];
    return userId ? all.filter(p => p.userId === userId) : all;
  },
  getLessonProgress(userId, lessonId) {
    return this.getProgress(userId).find(p => p.lessonId === lessonId);
  },
  getCourseProgress(userId, courseId) {
    const lessons = this.getLessons(courseId);
    if (!lessons.length) return { percent: 0, completed: 0, total: 0 };
    const prog = this.getProgress(userId);
    const completed = lessons.filter(l => prog.find(p => p.lessonId === l.id && p.status === 'completed')).length;
    return { percent: Math.round((completed / lessons.length) * 100), completed, total: lessons.length };
  },
  saveProgress(entry) {
    const all = Store.get('progress') || [];
    const idx = all.findIndex(p => p.userId === entry.userId && p.lessonId === entry.lessonId);
    if (idx >= 0) all[idx] = { ...all[idx], ...entry };
    else all.push(entry);
    Store.set('progress', all);
  },

  getQuizAttempts(userId, lessonId) {
    const all = Store.get('quizAttempts') || [];
    return all.filter(a => a.userId === userId && a.lessonId === lessonId);
  },
  saveQuizAttempt(attempt) {
    const all = Store.get('quizAttempts') || [];
    all.push(attempt);
    Store.set('quizAttempts', all);
  },
  getAllQuizAttempts() { return Store.get('quizAttempts') || []; },

  getEnrollments(userId) {
    const all = Store.get('enrollments') || [];
    return userId ? all.filter(e => e.userId === userId) : all;
  },
  enroll(userId, courseId) {
    const all = Store.get('enrollments') || [];
    if (!all.find(e => e.userId === userId && e.courseId === courseId)) {
      all.push({ userId, courseId, enrolledAt: new Date().toISOString() });
      Store.set('enrollments', all);
    }
  },
  isEnrolled(userId, courseId) {
    return this.getEnrollments(userId).some(e => e.courseId === courseId);
  },

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  },

  // Forum — Categories
  getForumCategories() { return Store.get('forumCategories') || []; },
  getForumCategory(id) { return this.getForumCategories().find(c => c.id === id); },
  saveForumCategories(cats) { Store.set('forumCategories', cats); },
  
  // Forum — Topics
  getForumTopics(categoryId) {
    const all = Store.get('forumTopics') || [];
    return categoryId ? all.filter(t => t.categoryId === categoryId) : all;
  },
  getForumTopic(id) { return (Store.get('forumTopics') || []).find(t => t.id === id); },
  saveForumTopics(topics) { Store.set('forumTopics', topics); },
  saveForumTopic(topic) {
    const topics = this.getForumTopics();
    const idx = topics.findIndex(t => t.id === topic.id);
    if (idx >= 0) topics[idx] = topic;
    else topics.push(topic);
    this.saveForumTopics(topics);
  },
  deleteForumTopic(id) {
    this.saveForumTopics(this.getForumTopics().filter(t => t.id !== id));
    this.saveForumPosts(this.getForumPosts().filter(p => p.topicId !== id));
  },

  // Forum — Posts
  getForumPosts(topicId) {
    const all = Store.get('forumPosts') || [];
    return topicId ? all.filter(p => p.topicId === topicId).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) : all;
  },
  getForumPost(id) { return (Store.get('forumPosts') || []).find(p => p.id === id); },
  saveForumPosts(posts) { Store.set('forumPosts', posts); },
  saveForumPost(post) {
    const all = Store.get('forumPosts') || [];
    const idx = all.findIndex(p => p.id === post.id);
    if (idx >= 0) all[idx] = post;
    else all.push(post);
    this.saveForumPosts(all);
  },
  deleteForumPost(id) {
    this.saveForumPosts(this.getForumPosts().filter(p => p.id !== id));
  },

  // Forum — Reports
  getForumReports() { return Store.get('forumReports') || []; },
  saveForumReports(reports) { Store.set('forumReports', reports); },
};
