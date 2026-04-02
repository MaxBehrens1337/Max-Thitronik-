"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { User, Lock, Save, Moon, Sun, CheckCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSearchParams } from 'next/navigation';

export default function SettingsPage() {
  const { currentUser, Auth } = useAuth();
  const { theme, setTheme } = useTheme();
  const searchParams = useSearchParams();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'security') {
      setActiveTab('security');
    }
  }, [searchParams]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName || '');
      setLastName(currentUser.lastName || '');
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);

  if (!currentUser) return null;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!firstName || !lastName || !email) {
      setErrorMsg('Bitte alle Pflichtfelder ausfüllen.');
      return;
    }

    try {
      const users = API.getUsers();
      const idx = users.findIndex(u => u.id === currentUser.id);
      if (idx === -1) throw new Error('Benutzer nicht gefunden.');

      users[idx] = { ...users[idx], firstName, lastName, email };
      API.saveUsers(users);
      API.setCurrentUser(users[idx]);
      
      setSuccessMsg('Deine Profilangaben wurden erfolgreich aktualisiert!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg('Fehler beim Speichern.');
    }
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMsg('Bitte alle Passwort-Felder ausfüllen.');
      return;
    }

    const users = API.getUsers();
    const idx = users.findIndex(u => u.id === currentUser.id);
    
    if (users[idx].password !== currentPassword) {
      setErrorMsg('Das eingegebene aktuelle Passwort ist falsch.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Das neue Passwort und die Bestätigung stimmen nicht überein.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('Das neue Passwort muss mindestens 6 Zeichen lang sein.');
      return;
    }

    try {
      users[idx].password = newPassword;
      API.saveUsers(users);
      API.setCurrentUser(users[idx]);
      
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      setSuccessMsg('Dein Passwort wurde erfolgreich geändert!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg('Fehler beim Speichern des Passworts.');
    }
  };

  return (
    <div className="settings-page animate-fade-in-up">
      <div className="page-header">
        <h1 className="page-title">Einstellungen</h1>
        <p className="page-subtitle">Passe deine Kontodaten und Präferenzen an.</p>
      </div>

      <div className="settings-layout">
        
        {/* Sidebar Tabs */}
        <div className="card settings-nav">
          <div className="card-body">
            
            <button 
              onClick={() => setActiveTab('profile')}
              className={`settings-tab ${activeTab === 'profile' ? 'settings-tab--active' : ''}`}
              aria-selected={activeTab === 'profile'}
            >
              <User size={18} /> Profil
            </button>

            <button 
              onClick={() => setActiveTab('security')}
              className={`settings-tab ${activeTab === 'security' ? 'settings-tab--active' : ''}`}
              aria-selected={activeTab === 'security'}
            >
              <Lock size={18} /> Sicherheit & Login
            </button>

            <button 
              onClick={() => setActiveTab('appearance')}
              className={`settings-tab ${activeTab === 'appearance' ? 'settings-tab--active' : ''}`}
              aria-selected={activeTab === 'appearance'}
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />} Darstellung
            </button>

          </div>
        </div>

        {/* Content Area */}
        <div className="card settings-content">
          <div className="card-body">
            
            {successMsg && (
              <div className="notification notification--success" role="alert">
                <CheckCircle size={20} /> {successMsg}
              </div>
            )}
            
            {errorMsg && (
              <div className="notification notification--error" role="alert">
                {errorMsg}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="animate-fade-in-up">
                <h2 className="section-title">Persönliche Informationen</h2>
                
                <form onSubmit={handleSaveProfile} className="form-stack">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">Vorname</label>
                      <input 
                        id="firstName"
                        type="text" 
                        value={firstName} 
                        onChange={e => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Nachname</label>
                      <input 
                        id="lastName"
                        type="text" 
                        value={lastName} 
                        onChange={e => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">E-Mail Adresse (Benutzername)</label>
                    <input 
                      id="email"
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Save size={18} /> Profil Speichern
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="animate-fade-in-up">
                <h2 className="section-title">Passwort ändern</h2>
                
                <form onSubmit={handleSavePassword} className="form-stack">
                  <div className="form-group">
                    <label htmlFor="currentPassword">Aktuelles Passwort</label>
                    <input 
                      id="currentPassword"
                      type="password" 
                      value={currentPassword} 
                      onChange={e => setCurrentPassword(e.target.value)}
                      placeholder="Dein derzeitiges Passwort"
                      required
                    />
                  </div>

                  <div className="divider"></div>

                  <div className="form-group">
                    <label htmlFor="newPassword">Neues Passwort</label>
                    <input 
                      id="newPassword"
                      type="password" 
                      value={newPassword} 
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Mindestens 6 Zeichen"
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Neues Passwort wiederholen</label>
                    <input 
                      id="confirmPassword"
                      type="password" 
                      value={confirmPassword} 
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Passwort zur Kontrolle wiederholen"
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Save size={18} /> Neues Passwort speichern
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="animate-fade-in-up">
                <h2 className="section-title">Erscheinungsbild</h2>
                
                <p className="course-card-desc">
                  Thitronik Campus läuft nun standardmäßig im augenschonenden Dark Mode. Du kannst das Design hier jederzeit überschreiben.
                </p>

                <div className="theme-options">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`theme-option ${theme === 'light' ? 'theme-option--active' : ''}`}
                    aria-pressed={theme === 'light'}
                  >
                    <Sun size={32} color={theme === 'light' ? 'var(--th-blue-primary)' : 'var(--text-tertiary)'} />
                    <span>Hell</span>
                  </button>

                  <button 
                    onClick={() => setTheme('dark')}
                    className={`theme-option ${theme === 'dark' ? 'theme-option--active' : ''}`}
                    aria-pressed={theme === 'dark'}
                  >
                    <Moon size={32} color={theme === 'dark' ? 'var(--th-blue-primary)' : 'var(--text-tertiary)'} />
                    <span>Dunkel (Standard)</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
