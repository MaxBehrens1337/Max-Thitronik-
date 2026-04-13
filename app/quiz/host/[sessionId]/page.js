"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useTheme } from 'next-themes';
import useQuizStore from '@/lib/quiz/quiz-store';
import { QuizChannel, MSG } from '@/lib/quiz/quiz-broadcast';
import { getAvailableCourses } from '@/lib/quiz/quiz-data';
import { getTopPlayers } from '@/lib/quiz/quiz-scoring';
import QuizLobby from '@/components/quiz/QuizLobby';
import QuizCountdown from '@/components/quiz/QuizCountdown';
import QuizQuestionHost from '@/components/quiz/QuizQuestionHost';
import QuizReveal from '@/components/quiz/QuizReveal';
import QuizLeaderboard from '@/components/quiz/QuizLeaderboard';
import QuizPodium from '@/components/quiz/QuizPodium';
import QuizResults from '@/components/quiz/QuizResults';
import { QUIZ_COURSES } from '@/lib/quiz/quiz-data';
import { ChevronRight, MessageSquare, SkipForward, RotateCcw, ArrowLeft } from 'lucide-react';

// ============================================
// Host View – Trainer's Beamer screen
// ============================================

export default function HostPage() {
  const params = useParams();
  const router = useRouter();
  const { Auth } = useAuth();
  const { resolvedTheme } = useTheme();
  const channelRef = useRef(null);
  const prevPlayersRef = useRef([]);
  const [mounted, setMounted] = useState(false);

  const sessionId = params.sessionId;

  // Zustand store
  const phase = useQuizStore(s => s.phase);
  const questions = useQuizStore(s => s.questions);
  const currentQuestionIndex = useQuizStore(s => s.currentQuestionIndex);
  const players = useQuizStore(s => s.players);
  const answersThisRound = useQuizStore(s => s.answersThisRound);
  const showExplanation = useQuizStore(s => s.showExplanation);
  const courseKey = useQuizStore(s => s.courseKey);
  const timeLimit = useQuizStore(s => s.timeLimit);

  const createSession = useQuizStore(s => s.createSession);
  const addPlayer = useQuizStore(s => s.addPlayer);
  const startGame = useQuizStore(s => s.startGame);
  const showQuestion = useQuizStore(s => s.showQuestion);
  const submitAnswer = useQuizStore(s => s.submitAnswer);
  const revealAnswer = useQuizStore(s => s.revealAnswer);
  const toggleExplanation = useQuizStore(s => s.toggleExplanation);
  const showLeaderboard = useQuizStore(s => s.showLeaderboard);
  const nextQuestion = useQuizStore(s => s.nextQuestion);
  const resetQuiz = useQuizStore(s => s.resetQuiz);

  const currentQuestion = questions[currentQuestionIndex] || null;
  const courses = getAvailableCourses();

  // Initialize channel
  useEffect(() => {
    setMounted(true);

    // If no session is active, the lobby state is set by the store
    if (phase === 'idle') {
      // Session was just navigated to – set lobby state with session ID
      useQuizStore.setState({ phase: 'lobby', sessionId });
    }

    channelRef.current = new QuizChannel(sessionId);

    // Listen for player messages
    const unsub = channelRef.current.onMessage((msg) => {
      if (msg.type === MSG.PLAYER_JOIN) {
        const added = addPlayer(msg.payload.name, msg.payload.avatarColor);
        if (added) {
          // Acknowledge join
          channelRef.current.send('PLAYER_JOINED', {
            name: msg.payload.name,
            playerCount: useQuizStore.getState().players.length,
          });
        }
      }

      if (msg.type === MSG.ANSWER_SUBMIT) {
        submitAnswer(
          msg.payload.playerName,
          msg.payload.answerIndex,
          msg.payload.timeMs
        );
      }
    });

    return () => {
      unsub();
      channelRef.current?.close();
    };
  }, [sessionId]);

  // Broadcast phase changes to players
  useEffect(() => {
    if (!channelRef.current || !mounted) return;

    switch (phase) {
      case 'countdown':
        channelRef.current.send(MSG.GAME_START, {
          sessionId,
          totalQuestions: questions.length,
        });
        break;

      case 'question':
        channelRef.current.send(MSG.QUESTION_SHOW, {
          questionIndex: currentQuestionIndex,
          answers: currentQuestion?.answers || [],
          timeLimit,
        });
        break;

      case 'reveal':
        channelRef.current.send(MSG.REVEAL, {
          correctIndex: currentQuestion?.correct_answer_index,
          scores: players.map(p => ({ name: p.name, score: p.score })),
        });
        break;

      case 'leaderboard':
        channelRef.current.send(MSG.LEADERBOARD, {
          top5: getTopPlayers(players, 5).map(p => ({ name: p.name, score: p.score })),
        });
        break;

      case 'results':
        channelRef.current.send(MSG.GAME_END, {
          finalScores: players.map(p => ({ name: p.name, score: p.score })),
        });
        break;
    }
  }, [phase, mounted]);

  const handleStartGame = useCallback((settings) => {
    // Re-create session with final settings (updates questions)
    createSession(settings.courseKey, settings);
    // Restore the original sessionId (createSession generates a new one)
    useQuizStore.setState({ sessionId });
    startGame();
  }, [sessionId, createSession, startGame]);

  const handleCountdownComplete = useCallback(() => {
    showQuestion();
  }, [showQuestion]);

  const handleTimeUp = useCallback(() => {
    revealAnswer();
  }, [revealAnswer]);

  const handleNextQuestion = useCallback(() => {
    prevPlayersRef.current = JSON.parse(JSON.stringify(players));
    nextQuestion();
  }, [nextQuestion, players]);

  const handlePlayAgain = useCallback(() => {
    resetQuiz();
    router.push('/quiz');
  }, [resetQuiz, router]);

  if (!mounted) return null;

  const isLight = resolvedTheme === 'light';

  return (
    <div className="quiz-fullscreen quiz-fullscreen--host">
      {/* Global Background */}
      <div className="app-bg" aria-hidden="true">
        <img 
          src={isLight ? '/Bilder/hintergrund lightmode.png' : '/logIn/screen.png'} 
          alt="" 
          className="app-bg-image"
        />
        <div className="app-bg-vignette" />
      </div>
      {/* Zurück-Button oben links */}
      {(phase === 'lobby' || phase === 'leaderboard' || phase === 'results') && (
        <div className="quiz-host-back-bar">
          <button className="btn btn-back" onClick={() => { resetQuiz(); router.push('/quiz'); }}>
            <ArrowLeft size={18} />
            {phase === 'lobby' ? 'Zurück' : 'Abbrechen'}
          </button>
        </div>
      )}

      {/* Phase: Lobby */}
      {phase === 'lobby' && (
        <QuizLobby
          mode="host"
          sessionId={sessionId}
          players={players}
          courses={courses}
          maxQuestions={45}
          onStartGame={handleStartGame}
        />
      )}

      {/* Phase: Countdown */}
      {phase === 'countdown' && (
        <QuizCountdown onComplete={handleCountdownComplete} />
      )}

      {/* Phase: Question */}
      {(phase === 'question' || phase === 'voting') && currentQuestion && (
        <QuizQuestionHost
          question={currentQuestion}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          timeLimit={timeLimit}
          answerCount={answersThisRound.length}
          playerCount={players.length}
          onTimeUp={handleTimeUp}
        />
      )}

      {/* Phase: Reveal */}
      {phase === 'reveal' && currentQuestion && (
        <div className="quiz-phase-container">
          <QuizReveal
            mode="host"
            question={currentQuestion}
            correctIndex={currentQuestion.correct_answer_index}
            showExplanation={showExplanation}
            onToggleExplanation={toggleExplanation}
            correctPercent={useQuizStore.getState().getCorrectPercent()}
            answersThisRound={answersThisRound}
          />
        </div>
      )}

      {/* Phase: Leaderboard */}
      {phase === 'leaderboard' && (
        <div className="quiz-phase-container">
          <QuizLeaderboard
            players={players}
            previousPlayers={prevPlayersRef.current}
          />
        </div>
      )}

      {/* Phase: Results */}
      {phase === 'results' && (
        <div className="quiz-phase-container quiz-phase-results">
          <QuizPodium players={players} />
          <QuizResults
            players={players}
            questions={questions}
            courseTitle={QUIZ_COURSES[courseKey]?.title || courseKey}
            onPlayAgain={handlePlayAgain}
            onBackToOverview={() => { resetQuiz(); router.push('/quiz'); }}
          />
        </div>
      )}

      {/* Host control bar */}
      {!['idle', 'lobby', 'countdown', 'results'].includes(phase) && (
        <div className="quiz-host-controls">
          {phase === 'reveal' && (
            <>
              <button className="btn btn-secondary" onClick={toggleExplanation}>
                <MessageSquare size={16} />
                {showExplanation ? 'Erklärung ausblenden' : 'Erklärung'}
              </button>
              <button className="btn btn-primary" onClick={showLeaderboard}>
                Rangliste <ChevronRight size={16} />
              </button>
            </>
          )}

          {phase === 'leaderboard' && (
            <button className="btn btn-primary" onClick={handleNextQuestion}>
              {currentQuestionIndex + 1 < questions.length ? (
                <>Nächste Frage <ChevronRight size={16} /></>
              ) : (
                <>Ergebnisse <ChevronRight size={16} /></>
              )}
            </button>
          )}

          {(phase === 'question' || phase === 'voting') && (
            <button className="btn btn-secondary" onClick={revealAnswer}>
              <SkipForward size={16} /> Überspringen
            </button>
          )}
        </div>
      )}
    </div>
  );
}
