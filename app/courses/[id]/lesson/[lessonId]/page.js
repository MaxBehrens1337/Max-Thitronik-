"use client";

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { ArrowLeft, CheckCircle, XCircle, Info, ArrowRight, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function LessonPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useAuth();
  
  const [data, setData] = useState({ course: null, lesson: null, questions: [] });
  // 'intro' (video), 'quiz', 'results'
  const [phase, setPhase] = useState('loading'); 
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isResolved, setIsResolved] = useState(false);
  const [score, setScore] = useState(0);

  const videoRef = useRef(null);

  useEffect(() => {
    if (!currentUser || !params?.id || !params?.lessonId) return;
    
    const course = API.getCourse(params.id);
    const lesson = API.getLessons(course?.id).find(l => l.id === params.lessonId);
    
    if (!course || !lesson) {
      router.push('/courses');
      return;
    }
    
    const questions = API.getQuestions(lesson.id);
    if (questions.length === 0 && !lesson.videoUrl) {
      router.push(`/courses/${course.id}`);
      return;
    }

    setData({ course, lesson, questions });
    if (lesson.videoUrl) {
      setPhase('intro');
    } else {
      setPhase('quiz');
    }
  }, [currentUser, params, router]);

  if (phase === 'loading' || !data.course) return null;

  const startQuiz = () => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
    setPhase('quiz');
  };

  const currentQuestion = data.questions[currentIdx];
  const isMultiple = currentQuestion?.type === 'multiple';

  const toggleAnswer = (answer) => {
    if (isResolved) return;
    
    if (isMultiple) {
      if (selectedAnswers.includes(answer)) {
        setSelectedAnswers(selectedAnswers.filter(a => a !== answer));
      } else {
        setSelectedAnswers([...selectedAnswers, answer]);
      }
    } else {
      setSelectedAnswers([answer]);
    }
  };

  const handleCheck = () => {
    if (selectedAnswers.length === 0) {
      alert('Bitte wähle mindestens eine Antwort aus.');
      return;
    }

    const correctCount = selectedAnswers.filter(a => currentQuestion.correctAnswers.includes(a)).length;
    const isPerfect = correctCount === currentQuestion.correctAnswers.length && selectedAnswers.length === currentQuestion.correctAnswers.length;

    if (isPerfect) setScore(prev => prev + 1);
    setIsResolved(true);
  };

  const handleNext = () => {
    if (currentIdx < data.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswers([]);
      setIsResolved(false);
    } else {
      const percent = Math.round((score / data.questions.length) * 100);
      
      API.saveQuizAttempt({
        userId: currentUser.id, courseId: data.course.id, lessonId: data.lesson.id,
        score, total: data.questions.length, percent, date: new Date().toISOString()
      });

      if (percent >= 80) {
        // Bei >= 80% gilt die Lektion als bestanden
        API.saveProgress({ userId: currentUser.id, lessonId: data.lesson.id, status: 'completed', percent });
      } else {
        // Nicht bestanden, aber gestartet
        API.saveProgress({ userId: currentUser.id, lessonId: data.lesson.id, status: 'started', percent });
      }

      if (typeof window !== 'undefined') {
          sessionStorage.setItem('lastQuizScore', JSON.stringify({ score, total: data.questions.length, percent }));
      }
      router.push(`/courses/${data.course.id}/results`);
    }
  };

  // Hilfsfunktion: Ist die Antwort ein Bild?
  const isImageAnswer = (str) => {
    return str.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null;
  };

  if (phase === 'intro') {
    return (
      <div className="quiz-player-page animate-fade-in-up" style={{ maxWidth: '900px', margin: '0 auto', paddingTop: 'var(--sp-6)' }}>
        <div style={{ marginBottom: 'var(--sp-8)' }}>
          <Link href={`/courses/${data.course.id}`} className="btn btn-back" style={{ padding: '8px 16px' }}>
            <ArrowLeft size={16} /> Abbruch
          </Link>
        </div>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <h1 style={{ marginBottom: '16px' }}>Schulungsvideo ansehen</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Bitte schaue dir das nachfolgende Video an, bevor du mit den Testfragen startest.</p>
            
            <div style={{ background: '#000', borderRadius: '12px', overflow: 'hidden', marginBottom: '32px' }}>
              {/* HTML5 Video Element, zielt auf den M4V Pfad */}
              <video 
                ref={videoRef}
                controls 
                style={{ width: '100%', maxHeight: '600px', display: 'block' }}
                src={data.lesson.videoUrl}
              >
                Dein Browser unterstützt das Video-Tag leider nicht.
              </video>
            </div>

            <button className="btn btn-primary" onClick={startQuiz} style={{ padding: '16px 32px', fontSize: '18px', borderRadius: '8px' }}>
              Video angesehen - Weiter zum Quiz <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Phase === 'quiz'
  const progressPercent = ((currentIdx) / data.questions.length) * 100;

  return (
    <div className="quiz-player-page" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: 'var(--sp-6)' }}>
      {/* Header Fortschritt */}
      <div style={{ marginBottom: 'var(--sp-8)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Link href={`/courses/${data.course.id}`} className="btn btn-back" style={{ padding: '8px 16px' }}>
            <ArrowLeft size={16} /> Abbruch
          </Link>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-tertiary)' }}>
            Frage {currentIdx + 1} von {data.questions.length}
          </div>
        </div>
        <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--th-blue-primary)', transition: 'width 0.4s ease-out' }} />
        </div>
      </div>

      {/* Fragendialog */}
      <div className="card animate-fade-in-up" key={`q-${currentQuestion?.id}`}>
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
             <span style={{ fontSize: '12px', background: 'var(--gray-soft)', padding: '4px 10px', borderRadius: '12px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                {isMultiple ? 'Mehrere Antworten möglich' : 'Nur eine Antwort wählbar'}
             </span>
          </div>

          <h2 style={{ fontSize: '24px', lineHeight: '1.4', marginBottom: '24px' }}>
            {currentQuestion?.question}
          </h2>

          {currentQuestion?.mediaType === 'image' && currentQuestion?.mediaRef && (
            <div style={{ marginBottom: '24px', background: 'var(--bg-page)', borderRadius: '8px', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                <img src={currentQuestion.mediaRef} alt="Aufgabenbild" style={{ maxHeight: '300px', width: 'auto', objectFit: 'contain' }} />
            </div>
          )}

          {/* Antworten (Unterstützung für lange Texte ODER große Bilder!) */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: currentQuestion?.answers.some(isImageAnswer) ? 'repeat(auto-fit, minmax(250px, 1fr))' : '1fr', 
            gap: '16px' 
          }}>
            {currentQuestion?.answers.map((answer, aidx) => {
              const isSelected = selectedAnswers.includes(answer);
              const isCorrectInDB = currentQuestion.correctAnswers.includes(answer);
              const isImage = isImageAnswer(answer);
              
              let borderColor = 'var(--border-color)';
              let bgColor = 'var(--bg-card)';
              let icon = null;

              if (isResolved) {
                if (isCorrectInDB) {
                  borderColor = 'var(--color-success)';
                  bgColor = 'var(--color-success-bg)';
                  icon = <CheckCircle size={24} color="var(--color-success)" style={{ position: isImage ? 'absolute' : 'static', top: 12, right: 12, zIndex: 10, background: 'var(--bg-card)', borderRadius: '50%' }} />;
                } else if (!isCorrectInDB && isSelected) {
                  borderColor = 'var(--color-error)';
                  bgColor = 'var(--color-error-bg)';
                  icon = <XCircle size={24} color="var(--color-error)" style={{ position: isImage ? 'absolute' : 'static', top: 12, right: 12, zIndex: 10, background: 'var(--bg-card)', borderRadius: '50%' }} />;
                } 
              } else if (isSelected) {
                borderColor = 'var(--th-blue-secondary)';
                bgColor = 'rgba(59, 169, 211, 0.05)';
              }

              return (
                <div 
                  key={aidx}
                  onClick={() => toggleAnswer(answer)}
                  style={{ 
                    position: 'relative',
                    padding: isImage ? '8px' : '16px', 
                    border: `3px solid ${borderColor}`,
                    background: bgColor,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: isImage ? 'stretch' : 'center',
                    justifyContent: isImage ? 'center' : 'flex-start',
                    gap: isImage ? '0' : '12px',
                    cursor: isResolved ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                    minHeight: isImage ? '200px' : 'auto',
                    opacity: (isResolved && !isCorrectInDB && !isSelected) ? 0.6 : 1,
                    overflow: 'hidden'
                  }}
                >
                  {/* Status Icon */}
                  {icon && (isImage ? icon : <div style={{ minWidth: '24px' }}>{icon}</div>)}
                  {!icon && !isImage && (
                    <div style={{ minWidth: '24px', display: 'flex', alignItems: 'center' }}>
                      <div style={{ 
                        width: '20px', height: '20px', 
                        borderRadius: isMultiple ? '4px' : '50%', 
                        border: `2px solid ${isSelected ? 'var(--th-blue-secondary)' : 'var(--border-color)'}`,
                        background: isSelected ? 'var(--th-blue-secondary)' : 'transparent'
                      }}></div>
                    </div>
                  )}

                  {/* Image Answer */}
                  {isImage && (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <img src={answer} alt="Antwortoption" style={{ maxWidth: '100%', maxHeight: '250px', objectFit: 'contain', borderRadius: '4px' }} />
                    </div>
                  )}

                  {/* Text Answer */}
                  {!isImage && (
                    <div style={{ fontSize: '16px', fontWeight: isSelected || (isResolved && isCorrectInDB) ? '500' : 'normal', color: 'var(--text-primary)' }}>
                      {answer}
                    </div>
                  )}
                  
                  {/* Active Selection Overlay for Images */}
                  {!isResolved && isSelected && isImage && (
                    <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--th-blue-secondary)', borderRadius: '50%', padding: '2px', color: 'white' }}>
                      <CheckCircle size={20} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {isResolved && (
            <div className="animate-fade-in-up" style={{ marginTop: '32px', padding: '24px', background: 'var(--gray-soft)', borderRadius: '12px', borderLeft: '4px solid var(--th-blue-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--th-blue-primary)', fontWeight: 'bold' }}>
                <Info size={20} /> Erklärung
              </div>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
                {currentQuestion?.explanation || 'Die korrekten Boxen sind nun alle dunkel markiert.'}
              </p>
            </div>
          )}

          <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
            {!isResolved ? (
              <button className="btn btn-primary" onClick={handleCheck} style={{ padding: '14px 32px', fontSize: '16px', borderRadius: '8px' }} disabled={selectedAnswers.length === 0}>
                Antwort prüfen
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNext} style={{ padding: '14px 32px', fontSize: '16px', borderRadius: '8px' }}>
                {currentIdx < data.questions.length - 1 ? (
                  <>Nächste Frage <ArrowRight size={20} /></>
                ) : (
                  <>Ergebnisse ansehen <ArrowRight size={20} /></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
