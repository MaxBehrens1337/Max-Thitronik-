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

  // Login + Quiz Host/Player/Solo haben kein AppLayout (Fullscreen)
  if (pathname === '/login' || pathname.startsWith('/quiz/host') || pathname.startsWith('/quiz/play') || pathname.startsWith('/quiz/solo')) {
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
        <main id="main-content" className="page-content">
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
