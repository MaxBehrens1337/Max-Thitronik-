"use client";

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { User, Lock, Save, Moon, Sun, CheckCircle, Camera, Link2, AtSign, Link as LinkIcon, Building2, MapPin } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSearchParams } from 'next/navigation';

export default function SettingsPage() {
  const { currentUser, Auth } = useAuth();
  const { theme, setTheme } = useTheme();
  const searchParams = useSearchParams();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'security') {
      setActiveTab('security');
    }
  }, [searchParams]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');

  // New profile fields
  const [company, setCompany] = useState('');
  const [street, setStreet] = useState('');
  const [zipCity, setZipCity] = useState('');
  const [country, setCountry] = useState('');
  const [federalState, setFederalState] = useState('');
  const [dealerSince, setDealerSince] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName || '');
      setLastName(currentUser.lastName || '');
      setEmail(currentUser.email || '');
      setProfilePhoto(currentUser.profilePhoto || '');
      setLinkedinUrl(currentUser.socialLinks?.linkedin || '');
      setInstagramUrl(currentUser.socialLinks?.instagram || '');
      setCompany(currentUser.company || '');
      setStreet(currentUser.street || '');
      setZipCity(currentUser.zipCity || '');
      setCountry(currentUser.country || '');
      setFederalState(currentUser.federalState || '');
      setDealerSince(currentUser.dealerSince || '');
    }
  }, [currentUser]);

  if (!currentUser) return null;

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Bitte nur Bilddateien hochladen.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = 200;
        let w = img.width, h = img.height;
        const size = Math.min(w, h);
        const sx = (w - size) / 2;
        const sy = (h - size) / 2;
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, sx, sy, size, size, 0, 0, maxSize, maxSize);
        const base64 = canvas.toDataURL('image/jpeg', 0.8);
        setProfilePhoto(base64);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setProfilePhoto('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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

      users[idx] = { 
        ...users[idx], 
        firstName, 
        lastName, 
        email,
        profilePhoto,
        company,
        street,
        zipCity,
        country,
        federalState,
        dealerSince,
        socialLinks: {
          linkedin: linkedinUrl,
          instagram: instagramUrl
        }
      };
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

  const initials = (currentUser.firstName?.[0] || '') + (currentUser.lastName?.[0] || '');

  const countryOptions = [
    '', 'Deutschland', 'Österreich', 'Schweiz', 'Niederlande', 'Belgien', 
    'Luxemburg', 'Dänemark', 'Frankreich', 'Italien', 'Spanien', 'Polen', 'Tschechien'
  ];

  const statesByCountry = {
    'Deutschland': [
      '', 'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg',
      'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen',
      'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'
    ],
    'Österreich': [
      '', 'Burgenland', 'Kärnten', 'Niederösterreich', 'Oberösterreich', 
      'Salzburg', 'Steiermark', 'Tirol', 'Vorarlberg', 'Wien'
    ],
    'Schweiz': [
      '', 'Aargau', 'Bern', 'Basel-Stadt', 'Basel-Landschaft', 'Freiburg', 
      'Genf', 'Graubünden', 'Luzern', 'St. Gallen', 'Zürich', 'Weitere...'
    ]
  };

  const availableStates = statesByCountry[country] || [];

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

                  {/* Profile Photo */}
                  <div className="profile-photo-section">
                    <div className="profile-photo-preview">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Profilbild" />
                      ) : (
                        <div className="profile-photo-initials">{initials}</div>
                      )}
                      <button 
                        type="button"
                        className="profile-photo-upload-btn"
                        onClick={() => fileInputRef.current?.click()}
                        aria-label="Profilbild hochladen"
                      >
                        <Camera size={16} />
                      </button>
                    </div>
                    <div className="profile-photo-info">
                      <p style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-medium)' }}>Profilbild</p>
                      <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-tertiary)', margin: '4px 0 8px' }}>JPG, PNG oder WebP. Max. 2MB.</p>
                      <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                        <button 
                          type="button" 
                          className="btn btn-secondary" 
                          style={{ fontSize: '12px', padding: '6px 12px' }}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Camera size={14} /> Hochladen
                        </button>
                        {profilePhoto && (
                          <button 
                            type="button" 
                            className="btn btn-secondary" 
                            style={{ fontSize: '12px', padding: '6px 12px', color: 'var(--color-error)' }}
                            onClick={handleRemovePhoto}
                          >
                            Entfernen
                          </button>
                        )}
                      </div>
                    </div>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoUpload}
                      style={{ display: 'none' }}
                    />
                  </div>

                  <div className="divider" />

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

                  <div className="divider" />

                  {/* Company / Address Section */}
                  <h3 style={{ fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-semibold)', marginBottom: 'var(--sp-2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building2 size={16} /> Firmeninformationen
                  </h3>
                  <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-tertiary)', marginBottom: 'var(--sp-4)' }}>
                    Angaben zu deinem Händlerbetrieb.
                  </p>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Firma</label>
                      <input 
                        id="company"
                        type="text" 
                        value={company} 
                        onChange={e => setCompany(e.target.value)}
                        placeholder="z. B. AutoTech Wohnmobil GmbH"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="street">Straße + Hausnummer</label>
                      <input 
                        id="street"
                        type="text" 
                        value={street} 
                        onChange={e => setStreet(e.target.value)}
                        placeholder="z. B. Industriestraße 12"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="zipCity">PLZ / Ort</label>
                      <input 
                        id="zipCity"
                        type="text" 
                        value={zipCity} 
                        onChange={e => setZipCity(e.target.value)}
                        placeholder="z. B. 24340 Eckernförde"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dealerSince" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={14} /> Thitronik-Händler seit
                      </label>
                      <input 
                        id="dealerSince"
                        type="text" 
                        value={dealerSince} 
                        onChange={e => setDealerSince(e.target.value)}
                        placeholder="z. B. 2019"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="country">Land</label>
                      <select 
                        id="country"
                        value={country} 
                        onChange={e => { setCountry(e.target.value); setFederalState(''); }}
                      >
                        {countryOptions.map(c => (
                          <option key={c} value={c}>{c || '— Bitte wählen —'}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="federalState">Bundesland</label>
                      <select 
                        id="federalState"
                        value={federalState} 
                        onChange={e => setFederalState(e.target.value)}
                        disabled={!availableStates.length}
                      >
                        {availableStates.length > 0 ? (
                          availableStates.map(s => (
                            <option key={s} value={s}>{s || '— Bitte wählen —'}</option>
                          ))
                        ) : (
                          <option value="">Zuerst Land wählen</option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="divider" />

                  {/* Social Links */}
                  <h3 style={{ fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-semibold)', marginBottom: 'var(--sp-2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <LinkIcon size={16} /> Social Media Links
                  </h3>
                  <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-tertiary)', marginBottom: 'var(--sp-4)' }}>
                    Optional – wird in deinem Profil angezeigt.
                  </p>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="linkedinUrl" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Link2 size={14} /> LinkedIn
                      </label>
                      <input 
                        id="linkedinUrl"
                        type="url" 
                        value={linkedinUrl} 
                        onChange={e => setLinkedinUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/dein-profil"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="instagramUrl" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <AtSign size={14} /> Instagram
                      </label>
                      <input 
                        id="instagramUrl"
                        type="url" 
                        value={instagramUrl} 
                        onChange={e => setInstagramUrl(e.target.value)}
                        placeholder="https://instagram.com/dein-profil"
                      />
                    </div>
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
