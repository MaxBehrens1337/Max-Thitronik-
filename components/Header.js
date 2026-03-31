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
    
    // Klick ausserhalb schließt Menüs
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

  // Suchlogik für Kurse
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const allCourses = API.getCourses();
      const hits = allCourses.filter(c => 
        c.title.toLowerCase().includes(q) || 
        (c.intro && c.intro.toLowerCase().includes(q))
      ).slice(0, 4); // max 4 results
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
    <header className="header" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
      </div>

      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
        
        {/* Search Box with Autocomplete */}
        <div className="search-box" ref={searchRef} style={{ position: 'relative' }}>
          <Search size={18} className="search-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input 
            type="text" 
            placeholder="Kurs suchen..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              padding: '8px 12px 8px 36px', borderRadius: 'var(--radius-full)', 
              border: '1px solid var(--border-color)', background: 'var(--bg-page)', 
              color: 'var(--text-primary)', width: searchQuery ? '250px' : '200px',
              transition: 'width 0.2s', outline: 'none'
            }} 
          />
          {searchResults.length > 0 && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card-hover)',
              overflow: 'hidden', zIndex: 200
            }}>
              {searchResults.map(course => (
                <div 
                  key={course.id} 
                  onClick={() => handleSearchSelect(course.id)}
                  style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background 0.1s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--gray-soft)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ fontWeight: '500', fontSize: '14px', color: 'var(--text-primary)' }}>{course.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{course.intro}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        {mounted && (
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Theme umschalten"
            style={{ padding: '8px', color: 'var(--text-secondary)', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer' }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}

        {/* User Profile */}
        {currentUser && (
          <div className="user-profile" ref={profileRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '16px', borderLeft: '1px solid var(--border-color)', cursor: 'pointer' }} onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--th-blue-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
              {initials}
            </div>
            <div className="user-info" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>{currentUser.firstName}</span>
            </div>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 12px)', right: 0, width: '220px',
                background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card-hover)',
                overflow: 'hidden', zIndex: 200, display: 'flex', flexDirection: 'column'
              }}>
                <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', background: 'var(--gray-soft)'}}>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>{currentUser.firstName} {currentUser.lastName}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{currentUser.email}</div>
                </div>
                
                <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column' }}>
                  <button onClick={(e) => { e.stopPropagation(); alert('Einstellungen - Bald verfügbar'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', color: 'var(--text-secondary)', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--gray-soft)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <Settings size={16} /> <span style={{fontSize: '14px'}}>Einstellungen</span>
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); alert('Passwort zurücksetzen - Funktion in Arbeit'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', color: 'var(--text-secondary)', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--gray-soft)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <Key size={16} /> <span style={{fontSize: '14px'}}>Passwort ändern</span>
                  </button>
                </div>

                <div style={{ padding: '8px 0', borderTop: '1px solid var(--border-color)' }}>
                  <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', color: 'var(--color-error)', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '500' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-error-bg)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <LogOut size={16} /> <span style={{fontSize: '14px'}}>Abmelden</span>
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
