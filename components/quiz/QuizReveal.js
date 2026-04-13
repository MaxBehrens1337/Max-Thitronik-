"use client";

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

// ============================================
// QuizReveal – Shows correct answer after voting
// ============================================

const ANSWER_STYLES = [
  { symbol: '△', className: 'quiz-reveal-answer--red' },
  { symbol: '◆', className: 'quiz-reveal-answer--blue' },
  { symbol: '●', className: 'quiz-reveal-answer--yellow' },
  { symbol: '■', className: 'quiz-reveal-answer--green' },
];

export default function QuizReveal({
  mode = 'host',        // 'host' or 'player'
  question,
  correctIndex,
  showExplanation = false,
  onToggleExplanation,
  // Player-specific
  playerAnswer = null,   // { answerIndex, correct, points, multiplier }
  playerScore = 0,
  // Host-specific
  correctPercent = 0,
  answersThisRound = [],
}) {
  if (mode === 'player') {
    return (
      <div className="quiz-reveal quiz-reveal--player">
        <motion.div
          className={`quiz-reveal-result ${playerAnswer?.correct ? 'quiz-reveal-result--correct' : 'quiz-reveal-result--wrong'}`}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {playerAnswer?.correct ? (
            <>
              <div className="quiz-reveal-icon quiz-reveal-icon--correct">
                <Check size={48} />
              </div>
              <h2>Richtig!</h2>
              <div className="quiz-reveal-points">
                +{playerAnswer.points} Punkte
                {playerAnswer.multiplier > 1 && (
                  <span className="quiz-reveal-streak">×{playerAnswer.multiplier} Streak!</span>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="quiz-reveal-icon quiz-reveal-icon--wrong">
                <X size={48} />
              </div>
              <h2>Falsch!</h2>
              <p className="quiz-reveal-correct-was">
                Richtige Antwort: {ANSWER_STYLES[correctIndex]?.symbol} {question.answers[correctIndex]}
              </p>
            </>
          )}
          <div className="quiz-reveal-score-total">
            Gesamt: {playerScore} Punkte
          </div>
        </motion.div>
      </div>
    );
  }

  // HOST mode
  return (
    <div className="quiz-reveal quiz-reveal--host">
      <h3 className="quiz-reveal-title">Auflösung</h3>

      <div className="quiz-host-answers quiz-host-answers--reveal">
        {question.answers.map((answer, idx) => {
          const isCorrect = idx === correctIndex;
          const answerVotes = answersThisRound.filter(a => a.answerIndex === idx).length;

          return (
            <motion.div
              key={idx}
              className={`quiz-host-answer ${ANSWER_STYLES[idx]?.className || ''} ${
                isCorrect ? 'quiz-host-answer--correct' : 'quiz-host-answer--wrong'
              }`}
              initial={{ opacity: 1 }}
              animate={{
                opacity: isCorrect ? 1 : 0.35,
                scale: isCorrect ? 1.03 : 0.97,
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="quiz-host-answer-symbol">
                {ANSWER_STYLES[idx]?.symbol}
              </span>
              <span className="quiz-host-answer-text">{answer}</span>
              {isCorrect && (
                <motion.span
                  className="quiz-host-answer-check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                >
                  <Check size={28} />
                </motion.span>
              )}
              <span className="quiz-host-answer-votes">{answerVotes}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="quiz-reveal-stats">
        <span>{correctPercent}% haben richtig geantwortet</span>
      </div>

      {/* Explanation toggle */}
      {question.explanation && (
        <div className="quiz-reveal-explanation-area">
          <button
            className="btn btn-secondary quiz-reveal-explanation-btn"
            onClick={onToggleExplanation}
          >
            {showExplanation ? 'Erklärung ausblenden' : 'Erklärung einblenden'}
          </button>
          {showExplanation && (
            <motion.div
              className="quiz-reveal-explanation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p>{question.explanation}</p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
