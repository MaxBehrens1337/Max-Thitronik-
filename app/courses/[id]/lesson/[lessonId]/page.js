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
  const [phase, setPhase] = useState('loading'); 
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isResolved, setIsResolved] = useState(false);
  const [score, setScore] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const videoRef = useRef(null);

  useEffect(() => {
    if (!currentUser || !params?.id || !params?.lessonId) return;
    
    const course = API.getCourse(params.id);
    const lesson = API.getLessons(course?.id).find(l => l.id === params.lessonId);
    
    if (!course || !lesson) { router.push('/courses'); return; }
    
    const questions = API.getQuestions(lesson.id);
    if (questions.length === 0 && !lesson.videoUrl) { router.push(`/courses/${course.id}`); return; }

    setData({ course, lesson, questions });
    setPhase(lesson.videoUrl ? 'intro' : 'quiz');
  }, [currentUser, params, router]);

  if (phase === 'loading' || !data.course) return null;

  const startQuiz = () => {
    if (videoRef.current && !videoRef.current.paused) videoRef.current.pause();
    setPhase('quiz');
  };

  const currentQuestion = data.questions[currentIdx];
  const isMultiple = currentQuestion?.type === 'multiple' || currentQuestion?.type === 'text-multiple';
  const isImageAnswer = (str) => str.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null;

  const toggleAnswer = (answer) => {
    if (isResolved) return;
    if (isMultiple) {
      setSelectedAnswers(prev => prev.includes(answer) ? prev.filter(a => a !== answer) : [...prev, answer]);
    } else {
      setSelectedAnswers([answer]);
    }
  };

  const handleCheck = () => {
    if (selectedAnswers.length === 0) {
      setFeedbackMsg('Bitte wähle mindestens eine Antwort aus.');
      return;
    }
    const correctCount = selectedAnswers.filter(a => currentQuestion.correctAnswers.includes(a)).length;
    const isPerfect = correctCount === currentQuestion.correctAnswers.length && selectedAnswers.length === currentQuestion.correctAnswers.length;
    if (isPerfect) {
      setScore(prev => prev + 1);
      setFeedbackMsg('Richtig! Gut gemacht.');
    } else {
      setFeedbackMsg('Leider nicht korrekt. Die richtige Antwort ist markiert.');
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
      const percent = Math.round((score / data.questions.length) * 100);
      API.saveQuizAttempt({
        userId: currentUser.id, courseId: data.course.id, lessonId: data.lesson.id,
        score, total: data.questions.length, percent, date: new Date().toISOString()
      });
      if (percent >= 80) {
        API.saveProgress({ userId: currentUser.id, lessonId: data.lesson.id, status: 'completed', percent });
      } else {
        API.saveProgress({ userId: currentUser.id, lessonId: data.lesson.id, status: 'started', percent });
      }
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('lastQuizScore', JSON.stringify({ score, total: data.questions.length, percent }));
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
              <video ref={videoRef} controls src={data.lesson.videoUrl}>
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
  const hasImages = currentQuestion?.answers.some(isImageAnswer);

  return (
    <div className="quiz-container" role="main" aria-label="Quiz">
      {/* ARIA Live Region for feedback */}
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
          <span className="quiz-type-badge">
            {isMultiple ? 'Mehrere Antworten möglich' : 'Nur eine Antwort wählbar'}
          </span>

          <h2 className="quiz-question-text">{currentQuestion?.question}</h2>

          {currentQuestion?.mediaType === 'image' && currentQuestion?.mediaRef && (
            <div className="quiz-media">
              <img src={currentQuestion.mediaRef} alt="Aufgabenbild" />
            </div>
          )}

          {/* Answers */}
          <div className={`quiz-answers ${hasImages ? 'quiz-answers--images' : ''}`} role="group" aria-label="Antwortmöglichkeiten">
            {currentQuestion?.answers.map((answer, aidx) => {
              const isSelected = selectedAnswers.includes(answer);
              const isCorrectInDB = currentQuestion.correctAnswers.includes(answer);
              const isImage = isImageAnswer(answer);

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
                  key={aidx}
                  className={cls}
                  onClick={() => toggleAnswer(answer)}
                  role={isMultiple ? 'checkbox' : 'radio'}
                  aria-checked={isSelected}
                  aria-label={isImage ? `Antwort ${aidx + 1}` : answer}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleAnswer(answer); } }}
                >
                  {/* Status Icon */}
                  {icon && !isImage && <div style={{ minWidth: '24px' }}>{icon}</div>}
                  {icon && isImage && icon}
                  {!icon && !isImage && (
                    <div className={`quiz-answer-radio ${isMultiple ? 'quiz-answer-radio--multi' : 'quiz-answer-radio--single'} ${isSelected ? 'quiz-answer-radio--selected' : ''}`} />
                  )}

                  {/* Image Answer */}
                  {isImage && (
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={answer} alt={`Antwort ${aidx + 1}`} />
                    </div>
                  )}

                  {/* Text Answer */}
                  {!isImage && (
                    <div className={`quiz-answer-text ${isSelected || (isResolved && isCorrectInDB) ? 'quiz-answer-text--bold' : ''}`}>
                      {answer}
                    </div>
                  )}

                  {/* Active Selection Overlay for Images */}
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
