"use client";

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Cpu, ArrowLeft } from 'lucide-react';

export default function ThiPage() {
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
          <Cpu size={28} /> THI
        </h1>
        <p className="page-subtitle">THITRONIK Intelligence – Ihr Zugang zu erweiterten Systemfunktionen und Analysen.</p>
      </div>

      <div className="card" style={{ marginTop: 'var(--sp-6)' }}>
        <div className="card-body" style={{ textAlign: 'center', padding: 'var(--sp-12) var(--sp-6)' }}>
          <Cpu size={64} style={{ opacity: 0.15, marginBottom: 'var(--sp-4)' }} />
          <h2 style={{ marginBottom: 'var(--sp-2)', fontWeight: 'var(--fw-semibold)' }}>Coming Soon</h2>
          <p style={{ color: 'var(--text-tertiary)', maxWidth: '500px', margin: '0 auto' }}>
            THI befindet sich in der Entwicklung. Hier werden zukünftig erweiterte Funktionen, 
            Diagnosetools und KI-gestützte Analysen zur Verfügung stehen.
          </p>
        </div>
      </div>
    </div>
  );
}
