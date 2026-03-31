"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import Link from 'next/link';
import { CheckCircle, XCircle, Award, ArrowLeft, RefreshCw } from 'lucide-react';

export default function QuizResultsPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useAuth();
  
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!currentUser || !params?.id) return;
    
    const course = API.getCourse(params.id);
    if (!course) {
      router.push('/courses');
      return;
    }
    
    setData({ course });

    // Lese das letzte Score-Ergebnis aus dem SessionStorage
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('lastQuizScore');
      if (stored) {
        setResult(JSON.parse(stored));
      } else {
        // Fallback: Kehre direkt ins Dashboard zurück, wenn hierhin navigiert wurde ohne aktives Quiz
        router.push(`/profile`);
      }
    }
  }, [currentUser, params, router]);

  if (!data || !result) return null;

  const passed = result.percent >= 80;

  return (
    <div className="quiz-results-page animate-fade-in-up" style={{ maxWidth: '600px', margin: '60px auto', textAlign: 'center' }}>
      <div className="card">
        <div className="card-body" style={{ padding: '48px 32px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            {passed ? (
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '24px', borderRadius: '50%', color: 'var(--color-success)' }}>
                <Award size={64} />
              </div>
            ) : (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '24px', borderRadius: '50%', color: 'var(--color-error)' }}>
                <XCircle size={64} />
              </div>
            )}
          </div>

          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>
            {passed ? 'Herzlichen Glückwunsch!' : 'Schade, fast geschafft!'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '32px' }}>
            {passed 
              ? `Du hast das Modul "${data.course.title}" erfolgreich abgeschlossen.` 
              : `Du hast leider die benötigte Punktzahl von 80% für "${data.course.title}" nicht erreicht. Probiere es einfach noch einmal!`
            }
          </p>

          <div style={{ background: 'var(--bg-page)', padding: '24px', borderRadius: '12px', display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dein Score</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: passed ? 'var(--color-success)' : 'var(--color-error)' }}>
                {result.percent}%
              </div>
            </div>
            <div style={{ width: '1px', background: 'var(--border-color)' }}></div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fragen Richtig</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                {result.score}/{result.total}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {passed ? (
              <Link href="/profile" className="btn btn-primary" style={{ padding: '16px', fontSize: '18px', borderRadius: '8px' }}>
                Zurück zu "Mein Fortschritt"
              </Link>
            ) : (
              <Link href={`/courses/${data.course.id}`} className="btn btn-primary" style={{ padding: '16px', fontSize: '18px', borderRadius: '8px' }}>
                <RefreshCw size={20} /> Modul erneut versuchen
              </Link>
            )}
            <Link href="/courses" className="btn btn-secondary" style={{ padding: '16px', fontSize: '18px', borderRadius: '8px' }}>
              Zur Kursübersicht
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
