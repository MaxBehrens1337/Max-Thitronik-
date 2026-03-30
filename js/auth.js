// ============================================
// THITRONIK Auth Module
// ============================================

import { API } from './store.js';

export const Auth = {
  login(email, password) {
    const users = API.getUsers();
    const user = users.find(u => u.email === email && u.password === password && u.active !== false);
    if (user) {
      const session = { ...user };
      delete session.password;
      API.setCurrentUser(session);
      return { success: true, user: session };
    }
    return { success: false, error: 'Ungültige Anmeldedaten' };
  },

  logout() {
    API.logout();
  },

  isLoggedIn() {
    return !!API.getCurrentUser();
  },

  getCurrentUser() {
    return API.getCurrentUser();
  },

  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  },

  isAdmin() { return this.hasRole('admin'); },
  isTrainer() { return this.hasRole('trainer') || this.isAdmin(); },

  updateProfile(data) {
    const user = this.getCurrentUser();
    if (!user) return;
    const updated = { ...user, ...data };
    API.setCurrentUser(updated);
    const users = API.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...data };
      API.saveUsers(users);
    }
  }
};
