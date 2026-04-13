"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import useQuizStore from '@/lib/quiz/quiz-store';
import { QUIZ_COURSES } from '@/lib/quiz/quiz-data';
import { calculateRoundScore } from '@/lib/quiz/quiz-scoring';
import QuizCountdown from '@/components/quiz/QuizCountdown';
import QuizTimer from '@/components/quiz/QuizTimer';
import QuizPodium from '@/components/quiz/QuizPodium';
import QuizResults from '@/components/quiz/QuizResults';
import { ArrowLeft, Check, X, ChevronRight, RotateCcw } from 'lucide-react';

// ============================================
// Solo Quiz Page – Single player, questions visible
// ============================================

const ANSWER_STYLES = [
  { symbol: '△', className: 'quiz-solo-answer--red', bg: 'var(--quiz-answer-red)' },
  { symbol: '◆', className: 'quiz-solo-answer--blue', bg: 'var(--quiz-answer-blue)' },
  { symbol: '●', className: 'quiz-solo-answer--yellow', bg: 'var(--quiz-answer-yellow)' },
  { symbol: '■', className: 'quiz-solo-answer--green', bg: 'var(--quiz-answer-green)' },
];

export default function SoloPage() {
  const params = useParams();
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const sessionId = params.sessionId;
  const [mounted, setMounted] = useState(false);

  // Zustand
  const phase = useQuizStore(s => s.phase);
  const questions = useQuizStore(s => s.questions);
  const currentQuestionIndex = useQuizStore(s => s.currentQuestionIndex);
  const players = useQuizStore(s => s.players);
  const courseKey = useQuizStore(s => s.courseKey);
  const timeLimit = useQuizStore(s => s.timeLimit);
  const showExplanation = useQuizStore(s => s.showExplanation);
  const addPlayer = useQuizStore(s => s.addPlayer);
  const startGame = useQuizStore(s => s.startGame);
  const showQuestion = useQuizStore(s => s.showQuestion);
  const submitAnswer = useQuizStore(s => s.submitAnswer);
  const revealAnswer = useQuizStore(s => s.revealAnswer);
  const toggleExplanation = useQuizStore(s => s.toggleExplanation);
  const nextQuestion = useQuizStore(s => s.nextQuestion);
  const resetQuiz = useQuizStore(s => s.resetQuiz);

  const currentQuestion = questions[currentQuestionIndex] || null;
  const courseConfig = QUIZ_COURSES[courseKey];

  // Local state for solo
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerResult, setAnswerResult] = useState(null); // { correct, points, streak }
  const [questionStartTime, setQuestionStartTime] = useState(null);

  useEffect(() => {
    setMounted(true);
    // Add solo player if not already in lobby
    if (phase === 'lobby') {
      addPlayer('Solo-Spieler', 'var(--th-blue-secondary)');
      startGame();
    }
  }, []);

  // Reset selected answer on new question
  useEffect(() => {
    if (phase === 'question') {
      setSelectedAnswer(null);
      setAnswerResult(null);
      setQuestionStartTime(Date.now());
    }
  }, [phase, currentQuestionIndex]);

  const handleCountdownComplete = useCallback(() => {
    showQuestion();
  }, [showQuestion]);

  const handleSelectAnswer = useCallback((index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);

    const timeMs = Date.now() - (questionStartTime || Date.now());
    submitAnswer('Solo-Spieler', index, timeMs);

    // Calculate result for display
    const correct = index === currentQuestion?.correct_answer_index;
    const player = useQuizStore.getState().players.find(p => p.name === 'Solo-Spieler');
    setAnswerResult({
      correct,
      points: player?.answers?.at(-1)?.points || 0,
      streak: player?.streak || 0,
    });

    // Auto reveal after short delay
    setTimeout(() => revealAnswer(), 800);
  }, [selectedAnswer, questionStartTime, currentQuestion, submitAnswer, revealAnswer]);

  const handleTimeUp = useCallback(() => {
    if (selectedAnswer === null) {
      setSelectedAnswer(-1); // no answer
      setAnswerResult({ correct: false, points: 0, streak: 0 });
      revealAnswer();
    }
  }, [selectedAnswer, revealAnswer]);

  const handleNext = useCallback(() => {
    nextQuestion(true); // skip countdown in solo mode
  }, [nextQuestion]);

  const handlePlayAgain = useCallback(() => {
    resetQuiz();
    router.push('/quiz');
  }, [resetQuiz, router]);

  if (!mounted) return null;

  const isLight = resolvedTheme === 'light';
  const soloPlayer = players.find(p => p.name === 'Solo-Spieler');
  const totalScore = soloPlayer?.score || 0;

  return (
    <div className="quiz-fullscreen quiz-solo">
      {/* Global Background */}
      <div className="app-bg" aria-hidden="true">
        <img 
          src={isLight ? '/Bilder/hintergrund lightmode.png' : '/logIn/screen.png'} 
          alt="" 
          className="app-bg-image"
        />
        <div className="app-bg-vignette" />
      </div>

      {/* Header bar */}
      <div className="quiz-solo-header">
        <button className="btn btn-back quiz-solo-back" onClick={() => { resetQuiz(); router.push('/quiz'); }}>
          <ArrowLeft size={18} />
          Zurück
        </button>
        <div className="quiz-solo-header-info">
          <span className="quiz-solo-course-title">{courseConfig?.title || 'Quiz'}</span>
          {phase !== 'results' && questions.length > 0 && (
            <span className="quiz-solo-progress">
              Frage {currentQuestionIndex + 1} / {questions.length}
            </span>
          )}
        </div>
        <div className="quiz-solo-score-display">
          {totalScore.toLocaleString()} Pkt.
        </div>
      </div>

      {/* Phase: Countdown */}
      {phase === 'countdown' && (
        <QuizCountdown onComplete={handleCountdownComplete} />
      )}

      {/* Phase: Question + Reveal */}
      {(phase === 'question' || phase === 'reveal') && currentQuestion && (
        <div className="quiz-solo-content">
          {/* Timer */}
          {phase === 'question' && (
            <QuizTimer duration={timeLimit} onTimeUp={handleTimeUp} isActive={selectedAnswer === null} />
          )}

          {/* Question text – ALWAYS visible in solo mode */}
          <motion.div
            className="quiz-solo-question"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            key={currentQuestionIndex}
          >
            <h2 className="quiz-solo-question-text">{currentQuestion.question}</h2>
          </motion.div>

          {/* Answer grid */}
          <div className="quiz-solo-answers">
            {currentQuestion.answers.map((answer, idx) => {
              const style = ANSWER_STYLES[idx] || ANSWER_STYLES[0];
              const isCorrect = idx === currentQuestion.correct_answer_index;
              const isSelected = selectedAnswer === idx;
              const isRevealed = phase === 'reveal';

              let stateClass = '';
              if (isRevealed && isCorrect) stateClass = 'quiz-solo-answer--correct';
              else if (isRevealed && isSelected && !isCorrect) stateClass = 'quiz-solo-answer--wrong';
              else if (isRevealed && !isCorrect) stateClass = 'quiz-solo-answer--dimmed';
              else if (isSelected) stateClass = 'quiz-solo-answer--selected';

              return (
                <motion.button
                  key={idx}
                  className={`quiz-solo-answer ${style.className} ${stateClass}`}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={selectedAnswer !== null}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <span className="quiz-solo-answer-symbol">{style.symbol}</span>
                  <span className="quiz-solo-answer-text">{answer}</span>
                  {isRevealed && isCorrect && (
                    <motion.span
                      className="quiz-solo-answer-icon"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <Check size={22} />
                    </motion.span>
                  )}
                  {isRevealed && isSelected && !isCorrect && (
                    <motion.span
                      className="quiz-solo-answer-icon quiz-solo-answer-icon--wrong"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <X size={22} />
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Reveal feedback */}
          {phase === 'reveal' && answerResult && (
            <motion.div
              className="quiz-solo-feedback"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={`quiz-solo-feedback-badge ${answerResult.correct ? 'quiz-solo-feedback--correct' : 'quiz-solo-feedback--wrong'}`}>
                {answerResult.correct ? (
                  <span>✓ Richtig! +{answerResult.points} Punkte</span>
                ) : (
                  <span>✗ Falsch!</span>
                )}
                {answerResult.streak > 1 && (
                  <span className="quiz-solo-streak">🔥 {answerResult.streak}er Streak</span>
                )}
              </div>

              {/* Explanation */}
              {currentQuestion.explanation && (
                <div className="quiz-solo-explanation">
                  <button className="quiz-solo-explanation-toggle" onClick={toggleExplanation}>
                    {showExplanation ? 'Erklärung ausblenden' : 'Erklärung anzeigen'}
                  </button>
                  <AnimatePresence>
                    {showExplanation && (
                      <motion.p
                        className="quiz-solo-explanation-text"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        {currentQuestion.explanation}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Next button */}
              <button className="btn btn-primary quiz-solo-next-btn" onClick={handleNext}>
                {currentQuestionIndex + 1 < questions.length ? (
                  <>Nächste Frage <ChevronRight size={16} /></>
                ) : (
                  <>Ergebnisse anzeigen <ChevronRight size={16} /></>
                )}
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* Phase: Leaderboard (skip in solo) / Results */}
      {(phase === 'leaderboard' || phase === 'results') && (
        <div className="quiz-solo-results">
          <QuizResults
            players={players}
            questions={questions}
            courseTitle={courseConfig?.title || 'Quiz'}
            onPlayAgain={handlePlayAgain}
            onBackToOverview={() => { resetQuiz(); router.push('/quiz'); }}
          />
        </div>
      )}
    </div>
  );
}
