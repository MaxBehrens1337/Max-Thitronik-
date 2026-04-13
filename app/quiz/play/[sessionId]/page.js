"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useQuizStore from '@/lib/quiz/quiz-store';
import { QuizChannel, MSG } from '@/lib/quiz/quiz-broadcast';
import QuizLobby from '@/components/quiz/QuizLobby';
import QuizCountdown from '@/components/quiz/QuizCountdown';
import QuizAnswerGrid from '@/components/quiz/QuizAnswerGrid';
import QuizReveal from '@/components/quiz/QuizReveal';
import { motion } from 'framer-motion';
import { Trophy, ArrowLeft } from 'lucide-react';

// ============================================
// Player View – Smartphone screen
// ============================================

export default function PlayerPage() {
  const params = useParams();
  const router = useRouter();
  const resetQuiz = useQuizStore(s => s.resetQuiz);
  const { resolvedTheme } = useTheme();
  const sessionId = params.sessionId;
  const [mounted, setMounted] = useState(false);

  // Player state
  const [phase, setPhase] = useState('lobby'); // lobby, countdown, question, waiting, reveal, leaderboard, results
  const [playerName, setPlayerName] = useState('');
  const [playerColor, setPlayerColor] = useState('#1368CE');
  const [joined, setJoined] = useState(false);

  // Question state
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [currentTimeLimit, setCurrentTimeLimit] = useState(20);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  // Result state
  const [lastResult, setLastResult] = useState(null); // { correct, points, multiplier, correctIndex }
  const [playerScore, setPlayerScore] = useState(0);
  const [playerRank, setPlayerRank] = useState(null);
  const [finalScores, setFinalScores] = useState([]);

  // Initialize channel
  useEffect(() => {
    setMounted(true);
    channelRef.current = new QuizChannel(sessionId);

    const unsub = channelRef.current.onMessage((msg) => {
      switch (msg.type) {
        case MSG.GAME_START:
          setTotalQuestions(msg.payload.totalQuestions);
          setPhase('countdown');
          break;

        case MSG.QUESTION_SHOW:
          setCurrentAnswers(msg.payload.answers);
          setCurrentTimeLimit(msg.payload.timeLimit);
          setQuestionIndex(msg.payload.questionIndex);
          setQuestionStartTime(Date.now());
          setPhase('question');
          break;

        case MSG.REVEAL: {
          const correctIdx = msg.payload.correctIndex;
          const scores = msg.payload.scores || [];
          const myScore = scores.find(s => s.name === playerName);

          // Calculate points earned this round
          const prevScore = playerScore;
          const newScore = myScore?.score || playerScore;
          const pointsEarned = newScore - prevScore;

          setPlayerScore(newScore);
          setLastResult({
            correct: lastResult?.answerIndex === correctIdx,
            points: pointsEarned,
            multiplier: 1,
            correctIndex: correctIdx,
            answerIndex: lastResult?.answerIndex,
          });
          setPhase('reveal');
          break;
        }

        case MSG.LEADERBOARD: {
          const top5 = msg.payload.top5 || [];
          const myRank = top5.findIndex(p => p.name === playerName);
          setPlayerRank(myRank >= 0 ? myRank + 1 : null);
          setPhase('leaderboard');
          break;
        }

        case MSG.GAME_END:
          setFinalScores(msg.payload.finalScores || []);
          setPhase('results');
          break;
      }
    });

    return () => {
      unsub();
      channelRef.current?.close();
    };
  }, [sessionId, playerName, playerScore]);

  const handleJoin = useCallback((name, color) => {
    setPlayerName(name);
    setPlayerColor(color);
    setJoined(true);

    channelRef.current?.send(MSG.PLAYER_JOIN, {
      name,
      avatarColor: color,
    });
  }, []);

  const handleAnswer = useCallback((answerIndex) => {
    const timeMs = Date.now() - (questionStartTime || Date.now());

    setLastResult({ answerIndex });
    setPhase('waiting');

    channelRef.current?.send(MSG.ANSWER_SUBMIT, {
      playerName,
      answerIndex,
      timeMs,
    });
  }, [playerName, questionStartTime]);

  if (!mounted) return null;

  const isLight = resolvedTheme === 'light';

  return (
    <div className="quiz-fullscreen quiz-fullscreen--player">
      {/* Global Background */}
      <div className="app-bg" aria-hidden="true">
        <img 
          src={isLight ? '/Bilder/hintergrund lightmode.png' : '/logIn/screen.png'} 
          alt="" 
          className="app-bg-image"
        />
        <div className="app-bg-vignette" />
      </div>
      <div className="quiz-host-back-bar">
        <button className="btn btn-back" onClick={() => { resetQuiz(); router.push('/quiz'); }}>
          <ArrowLeft size={18} />
          Beenden
        </button>
      </div>

      {/* Phase: Lobby / Join */}
      {phase === 'lobby' && (
        <QuizLobby
          mode="player"
          sessionId={sessionId}
          onJoinGame={handleJoin}
        />
      )}

      {/* Phase: Countdown */}
      {phase === 'countdown' && (
        <QuizCountdown onComplete={() => { /* Host controls timing */ }} />
      )}

      {/* Phase: Question – Show answer buttons only */}
      {phase === 'question' && (
        <div className="quiz-player-question">
          <div className="quiz-player-question-info">
            Frage {questionIndex + 1} von {totalQuestions}
          </div>
          <QuizAnswerGrid
            answerCount={currentAnswers.length}
            onAnswer={handleAnswer}
            disabled={false}
          />
        </div>
      )}

      {/* Phase: Waiting for reveal */}
      {phase === 'waiting' && (
        <div className="quiz-player-waiting">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' }}
            className="quiz-player-waiting-check"
          >
            ✓
          </motion.div>
          <p>Antwort gesendet!</p>
          <motion.div
            className="quiz-player-waiting-dots"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Warte auf Auflösung...
          </motion.div>
        </div>
      )}

      {/* Phase: Reveal */}
      {phase === 'reveal' && lastResult && (
        <QuizReveal
          mode="player"
          question={{ answers: currentAnswers }}
          correctIndex={lastResult.correctIndex}
          playerAnswer={{
            answerIndex: lastResult.answerIndex,
            correct: lastResult.answerIndex === lastResult.correctIndex,
            points: lastResult.points || 0,
            multiplier: lastResult.multiplier || 1,
          }}
          playerScore={playerScore}
        />
      )}

      {/* Phase: Leaderboard – show own position */}
      {phase === 'leaderboard' && (
        <div className="quiz-player-leaderboard">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="quiz-player-rank-card"
          >
            {playerRank && playerRank <= 3 ? (
              <div className="quiz-player-rank-top">
                <Trophy size={32} style={{ color: 'var(--quiz-answer-yellow)' }} />
                <span className="quiz-player-rank-number">Platz {playerRank}</span>
              </div>
            ) : (
              <span className="quiz-player-rank-number">
                {playerRank ? `Platz ${playerRank}` : 'Weiter geht\'s!'}
              </span>
            )}
            <div className="quiz-player-rank-score">{playerScore.toLocaleString()} Punkte</div>
          </motion.div>
        </div>
      )}

      {/* Phase: Results */}
      {phase === 'results' && (
        <div className="quiz-player-results">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h2>Quiz beendet!</h2>
            <div className="quiz-player-final-score">
              <div className="quiz-player-final-rank">
                {(() => {
                  const sorted = [...finalScores].sort((a, b) => b.score - a.score);
                  const rank = sorted.findIndex(s => s.name === playerName) + 1;
                  return `Platz ${rank || '–'} von ${sorted.length}`;
                })()}
              </div>
              <div className="quiz-player-final-points">
                {playerScore.toLocaleString()} Punkte
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>
              Danke fürs Mitspielen! 🎉
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
