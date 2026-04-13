"use client";

import { useEffect, useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import Link from 'next/link';
import { XCircle, Award, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

function ResultsContent() {
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useAuth();
  
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!currentUser || !params?.id) return;
    
    const course = API.getCourse(params.id);
    if (!course) { router.push('/courses'); return; }
    
    const lessonId = API.getLessons(course.id)[0]?.id || 'l10'; 
    setData({ course, lessonId });

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

  const isNewFormat = result.isNewFormat === true;
  const passedThreshold = isNewFormat ? 70 : 80;
  const excellentThreshold = 90;
  const percent = result.percent;
  const passed = percent >= passedThreshold;
  const isExcellent = isNewFormat && percent >= excellentThreshold;

  const hasWrongQuestions = result.wrongQuestionIds && result.wrongQuestionIds.length > 0;

  return (
    <div className="results-container animate-fade-in-up" role="main" aria-label="Quiz Ergebnis">
      <div className="card">
        <div className="card-body" style={{ padding: '48px 32px' }}>
          
          <div className="results-icon">
            {isExcellent ? (
              <div className="results-icon-circle results-icon-circle--pass" style={{ background: 'var(--th-accent-lime)', color: '#fff' }} aria-hidden="true">
                <Award size={64} />
              </div>
            ) : passed ? (
              <div className="results-icon-circle results-icon-circle--pass" aria-hidden="true">
                <CheckCircle size={64} />
              </div>
            ) : (
              <div className="results-icon-circle results-icon-circle--fail" aria-hidden="true">
                <XCircle size={64} />
              </div>
            )}
          </div>

          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>
            {isExcellent ? 'Exzellent! Mit Auszeichnung bestanden.' : passed ? 'Herzlichen Glückwunsch!' : 'Schade, das reicht leider noch nicht.'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '32px' }}>
            {passed 
              ? `Du hast das Modul "${data.course.title}" erfolgreich abgeschlossen.` 
              : `Du hast leider die benötigte Punktzahl von ${passedThreshold}% für "${data.course.title}" nicht erreicht. Probiere es einfach noch einmal!`
            }
          </p>

          <div className="results-score-grid" role="status" aria-label="Punktestand" style={{ gridTemplateColumns: isNewFormat ? '1fr auto 1fr auto 1fr' : '1fr auto 1fr' }}>
            <div>
              <div className="results-score-label">Dein Score</div>
              <div className="results-score-value" style={{ color: passed ? 'var(--color-success)' : 'var(--color-error)' }}>
                {percent}%
              </div>
            </div>
            <div className="results-divider"></div>
            <div>
              <div className="results-score-label">Fragen Richtig</div>
              <div className="results-score-value" style={{ color: 'var(--text-primary)' }}>
                {result.correctCount !== undefined ? result.correctCount : result.score}/{result.total}
              </div>
            </div>
            {isNewFormat && (
              <>
                <div className="results-divider"></div>
                <div>
                  <div className="results-score-label">Punkte</div>
                  <div className="results-score-value" style={{ color: 'var(--text-primary)' }}>
                    {result.points}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="results-actions" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {hasWrongQuestions && (
              <Link href={`/courses/${data.course.id}/lesson/${data.lessonId}?mode=wrongOnly`} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <AlertTriangle size={20} /> Nur falsche Fragen wiederholen ({result.wrongQuestionIds.length})
              </Link>
            )}

            {!passed && (
              <Link href={`/courses/${data.course.id}/lesson/${data.lessonId}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <RefreshCw size={20} /> Modul komplett erneut versuchen
              </Link>
            )}

            {passed && (
              <Link href="/profile" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Zurück zu &quot;Mein Fortschritt&quot;
              </Link>
            )}
            
            {(passed || hasWrongQuestions) && (
              <Link href="/courses" className="btn btn-outline" style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}>
                Zur Kursübersicht
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default function QuizResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
