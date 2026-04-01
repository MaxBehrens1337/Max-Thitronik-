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
  
  // Tab aus URL auslesen
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'security') {
      setActiveTab('security');
    }
  }, [searchParams]);

  // Profile Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Password Form State
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

      // Update in DB
      users[idx] = { ...users[idx], firstName, lastName, email };
      API.saveUsers(users);
      
      // Update Current Login-Session
      API.setCurrentUser(users[idx]);
      
      setSuccessMsg('Deine Profilangaben wurden erfolgreich aktualisiert!');
      
      // Kleine Verzögerung um Notification auszublenden
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
    
    // Sicherheit: Prüfe ob aktuelles Passwort stimmt
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
      API.setCurrentUser(users[idx]); // Update Context
      
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
    <div className="settings-page animate-fade-in-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Einstellungen</h1>
        <p className="page-subtitle">Passe deine Kontodaten und Präferenzen an.</p>
      </div>

      <div style={{ display: 'flex', gap: 'var(--sp-6)', alignItems: 'flex-start' }}>
        
        {/* Sidebar Tabs */}
        <div className="card" style={{ flex: '0 0 250px' }}>
          <div className="card-body" style={{ padding: 'var(--sp-4) 0' }}>
            
            <button 
              onClick={() => setActiveTab('profile')}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 24px',
                background: activeTab === 'profile' ? 'var(--gray-soft)' : 'transparent',
                color: activeTab === 'profile' ? 'var(--th-blue-primary)' : 'var(--text-secondary)',
                border: 'none', borderRight: activeTab === 'profile' ? '3px solid var(--th-blue-primary)' : '3px solid transparent',
                textAlign: 'left', cursor: 'pointer', fontWeight: activeTab === 'profile' ? '600' : '400'
              }}
            >
              <User size={18} /> Profil
            </button>

            <button 
              onClick={() => setActiveTab('security')}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 24px',
                background: activeTab === 'security' ? 'var(--gray-soft)' : 'transparent',
                color: activeTab === 'security' ? 'var(--th-blue-primary)' : 'var(--text-secondary)',
                border: 'none', borderRight: activeTab === 'security' ? '3px solid var(--th-blue-primary)' : '3px solid transparent',
                textAlign: 'left', cursor: 'pointer', fontWeight: activeTab === 'security' ? '600' : '400'
              }}
            >
              <Lock size={18} /> Sicherheit & Login
            </button>

            <button 
              onClick={() => setActiveTab('appearance')}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 24px',
                background: activeTab === 'appearance' ? 'var(--gray-soft)' : 'transparent',
                color: activeTab === 'appearance' ? 'var(--th-blue-primary)' : 'var(--text-secondary)',
                border: 'none', borderRight: activeTab === 'appearance' ? '3px solid var(--th-blue-primary)' : '3px solid transparent',
                textAlign: 'left', cursor: 'pointer', fontWeight: activeTab === 'appearance' ? '600' : '400'
              }}
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />} Darstellung
            </button>

          </div>
        </div>

        {/* Content Area */}
        <div className="card" style={{ flex: 1 }}>
          <div className="card-body" style={{ padding: 'var(--sp-6)' }}>
            
            {successMsg && (
              <div style={{ padding: '12px 16px', background: 'var(--color-success-bg)', color: 'var(--color-success)', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '500' }}>
                <CheckCircle size={20} /> {successMsg}
              </div>
            )}
            
            {errorMsg && (
              <div style={{ padding: '12px 16px', background: 'var(--color-error-bg)', color: 'var(--color-error)', borderRadius: '8px', marginBottom: '24px', fontWeight: '500' }}>
                {errorMsg}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="animate-fade-in-up">
                <h2 style={{ marginBottom: '24px', fontSize: '20px' }}>Persönliche Informationen</h2>
                
                <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)' }}>Vorname</label>
                      <input 
                        type="text" 
                        value={firstName} 
                        onChange={e => setFirstName(e.target.value)}
                        style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-page)', color: 'var(--text-primary)' }}
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)' }}>Nachname</label>
                      <input 
                        type="text" 
                        value={lastName} 
                        onChange={e => setLastName(e.target.value)}
                        style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-page)', color: 'var(--text-primary)' }}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)' }}>E-Mail Adresse (Benutzername)</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                      style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-page)', color: 'var(--text-primary)' }}
                      required
                    />
                  </div>

                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Save size={18} /> Profil Speichern
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="animate-fade-in-up">
                <h2 style={{ marginBottom: '24px', fontSize: '20px' }}>Passwort ändern</h2>
                
                <form onSubmit={handleSavePassword} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)' }}>Aktuelles Passwort</label>
                    <input 
                      type="password" 
                      value={currentPassword} 
                      onChange={e => setCurrentPassword(e.target.value)}
                      placeholder="Dein derzeitiges Passwort"
                      style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-page)', color: 'var(--text-primary)' }}
                      required
                    />
                  </div>

                  <div style={{ width: '100%', height: '1px', background: 'var(--border-color)', margin: '8px 0' }}></div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)' }}>Neues Passwort</label>
                    <input 
                      type="password" 
                      value={newPassword} 
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Mindestens 6 Zeichen"
                      style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-page)', color: 'var(--text-primary)' }}
                      required
                      minLength={6}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)' }}>Neues Passwort wiederholen</label>
                    <input 
                      type="password" 
                      value={confirmPassword} 
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Passwort zur Kontrolle wiederholen"
                      style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-page)', color: 'var(--text-primary)' }}
                      required
                      minLength={6}
                    />
                  </div>

                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Save size={18} /> Neues Passwort speichern
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="animate-fade-in-up">
                <h2 style={{ marginBottom: '24px', fontSize: '20px' }}>Erscheinungsbild</h2>
                
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Thitronik Campus läuft nun standardmäßig im augenschonenden Dark Mode. Du kannst das Design hier jederzeit überschreiben.
                </p>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button 
                    onClick={() => setTheme('light')}
                    style={{ 
                      flex: 1, padding: '24px', borderRadius: '12px', border: theme === 'light' ? '2px solid var(--th-blue-primary)' : '1px solid var(--border-color)',
                      background: 'var(--bg-page)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'
                    }}
                  >
                    <Sun size={32} color={theme === 'light' ? 'var(--th-blue-primary)' : 'var(--text-tertiary)'} />
                    <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Hell</span>
                  </button>

                  <button 
                    onClick={() => setTheme('dark')}
                    style={{ 
                      flex: 1, padding: '24px', borderRadius: '12px', border: theme === 'dark' ? '2px solid var(--th-blue-primary)' : '1px solid var(--border-color)',
                      background: 'var(--bg-page)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'
                    }}
                  >
                    <Moon size={32} color={theme === 'dark' ? 'var(--th-blue-primary)' : 'var(--text-tertiary)'} />
                    <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Dunkel (Standard)</span>
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
