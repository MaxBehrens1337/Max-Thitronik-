"use client";

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WikiPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) router.push('/login');
  }, [currentUser, router]);

  if (!currentUser) return null;

  return (
    <div className="animate-fade-in-up">
      <button className="btn btn-back" onClick={() => router.back()} style={{ marginBottom: 'var(--sp-4)' }}>
        <ArrowLeft size={16} /> Zurück
      </button>

      <div className="page-header">
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BookOpen size={28} /> Wiki
        </h1>
        <p className="page-subtitle">Das Thitronik Wissenszentrum – technische Dokumentation, Anleitungen und Produktinformationen.</p>
      </div>

      <div className="card" style={{ marginTop: 'var(--sp-6)' }}>
        <div className="card-body" style={{ textAlign: 'center', padding: 'var(--sp-12) var(--sp-6)' }}>
          <BookOpen size={64} style={{ opacity: 0.15, marginBottom: 'var(--sp-4)' }} />
          <h2 style={{ marginBottom: 'var(--sp-2)', fontWeight: 'var(--fw-semibold)' }}>Inhalte werden vorbereitet</h2>
          <p style={{ color: 'var(--text-tertiary)', maxWidth: '500px', margin: '0 auto' }}>
            Das Wiki wird aktuell mit technischen Artikeln, Einbauanleitungen und Produktdatenblättern befüllt. 
            Bald finden Sie hier alle relevanten Informationen zu THITRONIK Produkten.
          </p>
        </div>
      </div>
    </div>
  );
}
