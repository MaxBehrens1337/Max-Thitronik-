"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import Link from 'next/link';
import { XCircle, Award, RefreshCw } from 'lucide-react';

export default function QuizResultsPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useAuth();
  
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!currentUser || !params?.id) return;
    
    const course = API.getCourse(params.id);
    if (!course) { router.push('/courses'); return; }
    
    setData({ course });

    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('lastQuizScore');
      if (stored) {
        setResult(JSON.parse(stored));
      } else {
        router.push('/profile');
      }
    }
  }, [currentUser, params, router]);

  if (!data || !result) return null;

  const passed = result.percent >= 80;

  return (
    <div className="results-container animate-fade-in-up" role="main" aria-label="Quiz Ergebnis">
      <div className="card">
        <div className="card-body" style={{ padding: '48px 32px' }}>
          
          <div className="results-icon">
            {passed ? (
              <div className="results-icon-circle results-icon-circle--pass" aria-hidden="true">
                <Award size={64} />
              </div>
            ) : (
              <div className="results-icon-circle results-icon-circle--fail" aria-hidden="true">
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

          <div className="results-score-grid" role="status" aria-label="Punktestand">
            <div>
              <div className="results-score-label">Dein Score</div>
              <div className="results-score-value" style={{ color: passed ? 'var(--color-success)' : 'var(--color-error)' }}>
                {result.percent}%
              </div>
            </div>
            <div className="results-divider"></div>
            <div>
              <div className="results-score-label">Fragen Richtig</div>
              <div className="results-score-value" style={{ color: 'var(--text-primary)' }}>
                {result.score}/{result.total}
              </div>
            </div>
          </div>

          <div className="results-actions">
            {passed ? (
              <Link href="/profile" className="btn btn-primary">
                Zurück zu &quot;Mein Fortschritt&quot;
              </Link>
            ) : (
              <Link href={`/courses/${data.course.id}`} className="btn btn-primary">
                <RefreshCw size={20} /> Modul erneut versuchen
              </Link>
            )}
            <Link href="/courses" className="btn btn-secondary">
              Zur Kursübersicht
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
