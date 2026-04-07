"use client";

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  // Login-Seite hat kein AppLayout
  if (pathname === '/login') {
    return <>{children}</>;
  }

  const isLight = resolvedTheme === 'light';

  return (
    <div className="layout-wrapper">
      {/* Global Background — dark mode uses login screen, light mode uses separate bg */}
      <div className="app-bg" aria-hidden="true">
        <img 
          src={isLight ? '/Bilder/hintergrund lightmode.png' : '/logIn/screen.png'} 
          alt="" 
          className="app-bg-image"
        />
        <div className="app-bg-vignette" />
      </div>

      <a href="#main-content" className="skip-link">Zum Inhalt springen</a>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main id="main-content" className="page-content" style={{ padding: 'var(--sp-6) var(--sp-4)', flex: 1, overflowY: 'auto' }}>
          <div className="container">
            {children}
          </div>
        </main>
        <footer className="app-footer">
          <div className="app-footer-inner">
            <span>© {new Date().getFullYear()} Thitronik GmbH</span>
            <nav className="app-footer-links" aria-label="Rechtliche Links">
              <Link href="/datenschutz" className="footer-pill footer-pill--datenschutz">Datenschutz</Link>
              <Link href="/impressum" className="footer-pill footer-pill--impressum">Impressum</Link>
              <Link href="/support" className="footer-pill footer-pill--support">Support</Link>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}
