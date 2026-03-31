"use client";

// ============================================
// THITRONIK Auth Module & Context
// ============================================

import { createContext, useContext, useEffect, useState } from 'react';
import { API } from './store';
import { initializeSeedData } from './seed';

const AuthContext = createContext(null);

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
  logout() { API.logout(); },
  isLoggedIn() { return !!API.getCurrentUser(); },
  getCurrentUser() { return API.getCurrentUser(); },
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

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Seed initialisieren, falls keine Daten vorhanden
    initializeSeedData(API);
    
    const loadUser = () => {
      setCurrentUser(Auth.getCurrentUser());
      if (!isLoaded) setIsLoaded(true);
    };

    loadUser();

    // Hören auf manuelle Events, falls in einem anderen Tab oder per Login passiert
    window.addEventListener('th_store_change', loadUser);
    return () => window.removeEventListener('th_store_change', loadUser);
  }, [isLoaded]);

  if (!isLoaded) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      Lade Lernplattform...
    </div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, Auth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
