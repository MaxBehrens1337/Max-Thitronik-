"use client";

import { motion } from 'framer-motion';
import QuizTimer from './QuizTimer';

// ============================================
// QuizQuestionHost – Beamer/Host view
// Shows question + 4 answers in Kahoot colors + timer
// ============================================

const ANSWER_STYLES = [
  { symbol: '△', className: 'quiz-host-answer--red' },
  { symbol: '◆', className: 'quiz-host-answer--blue' },
  { symbol: '●', className: 'quiz-host-answer--yellow' },
  { symbol: '■', className: 'quiz-host-answer--green' },
];

export default function QuizQuestionHost({
  question,
  questionIndex,
  totalQuestions,
  timeLimit,
  answerCount,
  playerCount,
  onTimeUp,
}) {
  return (
    <div className="quiz-question-host">
      {/* Timer bar at top */}
      <QuizTimer duration={timeLimit} onTimeUp={onTimeUp} isActive={true} />

      {/* Question counter */}
      <div className="quiz-question-counter">
        Frage {questionIndex + 1} von {totalQuestions}
      </div>

      {/* Question text - large for beamer readability */}
      <motion.h2
        className="quiz-question-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {question.question}
      </motion.h2>

      {/* Answer grid - 2x2 Kahoot colors */}
      <div className="quiz-host-answers">
        {question.answers.map((answer, idx) => (
          <motion.div
            key={idx}
            className={`quiz-host-answer ${ANSWER_STYLES[idx]?.className || ''}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + idx * 0.1, duration: 0.3 }}
          >
            <span className="quiz-host-answer-symbol">
              {ANSWER_STYLES[idx]?.symbol}
            </span>
            <span className="quiz-host-answer-text">{answer}</span>
          </motion.div>
        ))}
      </div>

      {/* Live answer counter */}
      <motion.div
        className="quiz-answer-live-counter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="quiz-answer-live-counter-inner">
          <span className="quiz-answer-live-count">{answerCount}</span>
          <span className="quiz-answer-live-label">von {playerCount} haben geantwortet</span>
        </div>
      </motion.div>
    </div>
  );
}
