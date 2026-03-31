"use client";

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { usePathname } from 'next/navigation';

export function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Login-Seite hat kein AppLayout
  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="layout-wrapper">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="page-content" style={{ padding: 'var(--sp-6) var(--sp-4)', flex: 1, overflowY: 'auto' }}>
          <div className="container">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
