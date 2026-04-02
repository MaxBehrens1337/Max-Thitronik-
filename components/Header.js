"use client";

import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { Menu, Search, Moon, Sun, Settings, Key, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function Header({ onMenuClick }) {
  const { Auth, currentUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const allCourses = API.getCourses();
      const hits = allCourses.filter(c => 
        c.title.toLowerCase().includes(q) || 
        (c.intro && c.intro.toLowerCase().includes(q))
      ).slice(0, 4);
      setSearchResults(hits);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleLogout = () => {
    Auth.logout();
    window.location.href = '/login';
  };

  const handleSearchSelect = (courseId) => {
    setSearchQuery('');
    setSearchResults([]);
    router.push(`/courses/${courseId}`);
  };

  const initials = currentUser ? (currentUser.firstName?.[0] || '') + (currentUser.lastName?.[0] || '') : '';

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="menu-btn" 
          onClick={onMenuClick}
          aria-label="Menü öffnen"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="header-right">
        
        {/* Search Box */}
        <div className="search-box" ref={searchRef}>
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Kurs suchen..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Kurse durchsuchen"
          />
          {searchResults.length > 0 && (
            <div className="profile-dropdown" style={{ left: 0, right: 0, top: 'calc(100% + 8px)', width: 'auto' }} role="listbox">
              {searchResults.map(course => (
                <button 
                  key={course.id} 
                  onClick={() => handleSearchSelect(course.id)}
                  className="profile-dropdown-item"
                  role="option"
                  style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--sp-1)' }}
                >
                  <span style={{ fontWeight: 'var(--fw-medium)' }}>{course.title}</span>
                  <span className="activity-detail" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>{course.intro}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        {mounted && (
          <button 
            className="theme-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}

        {/* User Profile */}
        {currentUser && (
          <div 
            className="user-profile" 
            ref={profileRef} 
            style={{ position: 'relative', cursor: 'pointer' }} 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            role="button"
            aria-expanded={showProfileMenu}
            aria-haspopup="menu"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowProfileMenu(!showProfileMenu); }}}
          >
            <div className="avatar">{initials}</div>
            <div className="user-info">
              <span className="user-name">{currentUser.firstName}</span>
            </div>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="profile-dropdown" role="menu" aria-label="Profilmenü">
                <div className="profile-dropdown-header">
                  <div className="name">{currentUser.firstName} {currentUser.lastName}</div>
                  <div className="email">{currentUser.email}</div>
                </div>
                
                <div className="profile-dropdown-section">
                  <button 
                    className="profile-dropdown-item" 
                    onClick={(e) => { e.stopPropagation(); setShowProfileMenu(false); router.push('/settings'); }}
                    role="menuitem"
                  >
                    <Settings size={16} /> <span>Einstellungen</span>
                  </button>
                  <button 
                    className="profile-dropdown-item" 
                    onClick={(e) => { e.stopPropagation(); setShowProfileMenu(false); router.push('/settings'); }}
                    role="menuitem"
                  >
                    <Key size={16} /> <span>Passwort ändern</span>
                  </button>
                </div>

                <div className="profile-dropdown-section">
                  <button 
                    className="profile-dropdown-item profile-dropdown-item--danger" 
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    <LogOut size={16} /> <span>Abmelden</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
