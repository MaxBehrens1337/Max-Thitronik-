"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { ArrowLeft, CheckCircle, XCircle, Info, ArrowRight, PlayCircle, Clock } from 'lucide-react';
import Link from 'next/link';

// Helper to shuffle an array
function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function LessonPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useAuth();
  
  const [data, setData] = useState({ course: null, lesson: null, questions: [], allQuestionsTotal: 0 });
  const [phase, setPhase] = useState('loading'); 
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isResolved, setIsResolved] = useState(false);
  const [score, setScore] = useState(0); // Points
  const [correctCount, setCorrectCount] = useState(0); 
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const currentQuestionRef = useRef(null);

  useEffect(() => {
    if (!currentUser || !params?.id || !params?.lessonId) return;
    
    const course = API.getCourse(params.id);
    const lesson = API.getLessons(course?.id).find(l => l.id === params.lessonId);
    
    if (!course || !lesson) { router.push('/courses'); return; }
    
    let baseQuestions = API.getQuestions(lesson.id);
    if (baseQuestions.length === 0 && !lesson.videoUrl) { router.push(`/courses/${course.id}`); return; }

    const allQuestionsTotal = baseQuestions.length;
    
    // Check mode
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('mode') === 'wrongOnly') {
        const stored = sessionStorage.getItem('lastQuizScore');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.wrongQuestionIds && parsed.wrongQuestionIds.length > 0) {
            baseQuestions = baseQuestions.filter(q => parsed.wrongQuestionIds.includes(q.id));
          }
        }
      }
    }

    // Shuffle questions
    let questions = shuffleArray(baseQuestions);
    
    // Deep shuffle options for new formats
    questions = questions.map(q => {
      if (q.options) {
        return { ...q, options: shuffleArray(q.options) };
      }
      return q;
    });

    setData({ course, lesson, questions, allQuestionsTotal });
    setPhase(lesson.videoUrl ? 'intro' : 'quiz');
  }, [currentUser, params, router]);

  useEffect(() => {
    currentQuestionRef.current = data.questions[currentIdx];
  }, [currentIdx, data.questions]);

  const handleCheckTimeout = useCallback(() => {
    const q = currentQuestionRef.current;
    if (!q) return;
    setFeedbackMsg('Zeit abgelaufen!');
    setWrongQuestions(prev => [...prev, q.id]);
    setIsResolved(true);
  }, []);

  useEffect(() => {
    if (phase !== 'quiz' || isResolved || data.questions.length === 0) return;
    
    const currentQuestion = data.questions[currentIdx];
    const isNewFormat = !!currentQuestion?.options;
    
    if (isNewFormat) {
      setTimeLeft(30);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleCheckTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, currentIdx, isResolved, data.questions, handleCheckTimeout]);

  if (phase === 'loading' || !data.course) return null;

  const startQuiz = () => {
    if (videoRef.current && !videoRef.current.paused) videoRef.current.pause();
    setPhase('quiz');
  };

  const currentQuestion = data.questions[currentIdx];
  if (!currentQuestion && phase === 'quiz') return null;

  const isNewFormat = !!currentQuestion?.options;
  const isMultiple = currentQuestion?.type === 'multiple' || currentQuestion?.type === 'text-multiple';
  const isImageAnswer = (str) => typeof str === 'string' && str.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null;

  const toggleAnswer = (answerOrId) => {
    if (isResolved) return;
    if (isMultiple) {
      setSelectedAnswers(prev => prev.includes(answerOrId) ? prev.filter(a => a !== answerOrId) : [...prev, answerOrId]);
    } else {
      setSelectedAnswers([answerOrId]);
    }
  };

  const handleCheck = () => {
    if (selectedAnswers.length === 0) {
      setFeedbackMsg('Bitte wähle mindestens eine Antwort aus.');
      return;
    }
    
    if (timerRef.current) clearInterval(timerRef.current);

    let isCorrect = false;

    if (isNewFormat) {
      const correctOptId = currentQuestion.options.find(o => o.isCorrect)?.id;
      isCorrect = selectedAnswers.includes(correctOptId);
    } else {
      const correctCountHit = selectedAnswers.filter(a => currentQuestion.correctAnswers.includes(a)).length;
      isCorrect = correctCountHit === currentQuestion.correctAnswers.length && selectedAnswers.length === currentQuestion.correctAnswers.length;
    }

    if (isCorrect) {
      const points = isNewFormat ? Math.round(1000 * (timeLeft / 30)) : 1;
      setScore(prev => prev + points);
      setCorrectCount(prev => prev + 1);
      setFeedbackMsg('Richtig! Gut gemacht.');
    } else {
      setFeedbackMsg('Leider nicht korrekt. Die richtige Antwort ist markiert.');
      setWrongQuestions(prev => [...prev, currentQuestion.id]);
    }
    setIsResolved(true);
  };

  const handleNext = () => {
    setFeedbackMsg('');
    if (currentIdx < data.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswers([]);
      setIsResolved(false);
    } else {
      const percent = Math.round((correctCount / data.questions.length) * 100);
      const passedThreshold = isNewFormat ? 70 : 80;
      
      API.saveQuizAttempt({
        userId: currentUser.id, 
        courseId: data.course.id, 
        lessonId: data.lesson.id,
        score, 
        total: data.questions.length, 
        percent, 
        date: new Date().toISOString()
      });
      
      if (percent >= passedThreshold) {
        API.saveProgress({ userId: currentUser.id, lessonId: data.lesson.id, status: 'completed', percent });
      } else {
        API.saveProgress({ userId: currentUser.id, lessonId: data.lesson.id, status: 'started', percent });
      }
      
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('lastQuizScore', JSON.stringify({ 
          score,
          points: score,
          correctCount,
          total: data.questions.length, 
          percent,
          wrongQuestionIds: wrongQuestions,
          isNewFormat
        }));
      }
      router.push(`/courses/${data.course.id}/results`);
    }
  };

  /* ── Video Intro Phase ── */
  if (phase === 'intro') {
    return (
      <div className="quiz-video-container animate-fade-in-up">
        <div style={{ marginBottom: 'var(--sp-8)' }}>
          <Link href={`/courses/${data.course.id}`} className="btn btn-back">
            <ArrowLeft size={16} /> Abbruch
          </Link>
        </div>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <h1 style={{ marginBottom: '16px' }}>Schulungsvideo ansehen</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Bitte schaue dir das nachfolgende Video an, bevor du mit den Testfragen startest.
            </p>
            <div className="quiz-video-wrap">
              <video ref={videoRef} controls src={data.lesson.videoUrl} poster={data.lesson.thumbnailUrl || undefined}>
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

  /* ── Quiz Phase ── */
  const progressPercent = ((currentIdx) / data.questions.length) * 100;
  
  // Decide which items to render
  const renderItems = isNewFormat ? currentQuestion.options : currentQuestion?.answers;
  const hasImages = !isNewFormat && currentQuestion?.answers.some(isImageAnswer);

  return (
    <div className="quiz-container" role="main" aria-label="Quiz">
      <div aria-live="polite" aria-atomic="true" className="sr-only">{feedbackMsg}</div>

      {/* Progress Header */}
      <div className="quiz-header">
        <Link href={`/courses/${data.course.id}`} className="btn btn-back">
          <ArrowLeft size={16} /> Abbruch
        </Link>
        <div className="quiz-counter" aria-label={`Frage ${currentIdx + 1} von ${data.questions.length}`}>
          Frage {currentIdx + 1} von {data.questions.length}
        </div>
      </div>
      <div className="quiz-progress-track" role="progressbar" aria-valuenow={Math.round(progressPercent)} aria-valuemin="0" aria-valuemax="100">
        <div className="quiz-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Question Card */}
      <div className="card animate-fade-in-up" key={`q-${currentQuestion?.id}`}>
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="quiz-type-badge">
              {isMultiple ? 'Mehrere Antworten möglich' : 'Nur eine Antwort wählbar'}
              {currentQuestion?.category && ` • ${currentQuestion.category}`}
            </span>
            {isNewFormat && !isResolved && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: timeLeft <= 5 ? 'var(--color-error)' : 'var(--text-primary)' }}>
                <Clock size={16} />
                <span style={{ fontWeight: 'bold' }}>{timeLeft}s</span>
              </div>
            )}
          </div>

          <h2 className="quiz-question-text">{currentQuestion?.text || currentQuestion?.question}</h2>

          {currentQuestion?.mediaType === 'image' && currentQuestion?.mediaRef && (
            <div className="quiz-media">
              <img src={currentQuestion.mediaRef} alt="Aufgabenbild" />
            </div>
          )}

          {/* Answers */}
          <div className={`quiz-answers ${hasImages ? 'quiz-answers--images' : ''}`} role="group" aria-label="Antwortmöglichkeiten">
            {renderItems.map((item, aidx) => {
              const answerKey = isNewFormat ? item.id : item;
              const isSelected = selectedAnswers.includes(answerKey);
              
              let isCorrectInDB = false;
              if (isNewFormat) {
                isCorrectInDB = item.isCorrect;
              } else {
                isCorrectInDB = currentQuestion.correctAnswers.includes(item);
              }
              
              const isImage = isImageAnswer(item);
              const displayText = isNewFormat ? item.text : item;

              let cls = 'quiz-answer';
              if (isImage) cls += ' quiz-answer--image';
              if (isResolved && isCorrectInDB) cls += ' quiz-answer--correct';
              else if (isResolved && !isCorrectInDB && isSelected) cls += ' quiz-answer--wrong';
              else if (!isResolved && isSelected) cls += ' quiz-answer--selected';
              if (isResolved && !isCorrectInDB && !isSelected) cls += ' quiz-answer--faded';

              let icon = null;
              if (isResolved && isCorrectInDB) {
                icon = <CheckCircle size={24} color="var(--color-success)" className={isImage ? 'quiz-answer-icon' : ''} />;
              } else if (isResolved && !isCorrectInDB && isSelected) {
                icon = <XCircle size={24} color="var(--color-error)" className={isImage ? 'quiz-answer-icon' : ''} />;
              }

              return (
                <div
                  key={answerKey}
                  className={cls}
                  onClick={() => toggleAnswer(answerKey)}
                  role={isMultiple ? 'checkbox' : 'radio'}
                  aria-checked={isSelected}
                  aria-label={isImage ? `Antwort ${aidx + 1}` : displayText}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleAnswer(answerKey); } }}
                >
                  {icon && !isImage && <div style={{ minWidth: '24px' }}>{icon}</div>}
                  {icon && isImage && icon}
                  {!icon && !isImage && (
                    <div className={`quiz-answer-radio ${isMultiple ? 'quiz-answer-radio--multi' : 'quiz-answer-radio--single'} ${isSelected ? 'quiz-answer-radio--selected' : ''}`} />
                  )}

                  {isImage && (
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={item} alt={`Antwort ${aidx + 1}`} />
                    </div>
                  )}

                  {!isImage && (
                    <div className={`quiz-answer-text ${isSelected || (isResolved && isCorrectInDB) ? 'quiz-answer-text--bold' : ''}`}>
                      {displayText}
                    </div>
                  )}

                  {!isResolved && isSelected && isImage && (
                    <div className="quiz-answer-check-overlay">
                      <CheckCircle size={20} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          {isResolved && (
            <div className="quiz-explanation animate-fade-in-up" role="status">
              <div className="quiz-explanation-header">
                <Info size={20} /> Erklärung
              </div>
              <p>{currentQuestion?.explanation || 'Die korrekten Boxen sind nun alle dunkel markiert.'}</p>
              {currentQuestion?.source && (
                <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <strong>Quelle:</strong> {currentQuestion.source}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="quiz-actions">
            {!isResolved ? (
              <button className="btn btn-primary" onClick={handleCheck} disabled={selectedAnswers.length === 0} aria-label="Antwort prüfen">
                Antwort prüfen
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNext} aria-label={currentIdx < data.questions.length - 1 ? 'Nächste Frage' : 'Ergebnisse ansehen'}>
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
