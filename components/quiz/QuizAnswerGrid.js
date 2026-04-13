"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

// ============================================
// QuizAnswerGrid – Player smartphone view
// 4 colored buttons with symbols (no question text)
// ============================================

const ANSWERS = [
  { symbol: '△', className: 'quiz-answer-btn--red', label: 'Rot' },
  { symbol: '◆', className: 'quiz-answer-btn--blue', label: 'Blau' },
  { symbol: '●', className: 'quiz-answer-btn--yellow', label: 'Gelb' },
  { symbol: '■', className: 'quiz-answer-btn--green', label: 'Grün' },
];

export default function QuizAnswerGrid({ answerCount = 4, onAnswer, disabled = false }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    if (disabled || selected !== null) return;
    setSelected(index);
    onAnswer?.(index);
  };

  return (
    <div className="quiz-answer-grid">
      {ANSWERS.slice(0, answerCount).map((answer, idx) => (
        <motion.button
          key={idx}
          className={`quiz-answer-btn ${answer.className} ${
            selected === idx ? 'quiz-answer-btn--selected' : ''
          } ${selected !== null && selected !== idx ? 'quiz-answer-btn--dimmed' : ''}`}
          onClick={() => handleSelect(idx)}
          disabled={disabled || selected !== null}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08, duration: 0.3 }}
          aria-label={`Antwort ${answer.label}`}
        >
          <span className="quiz-answer-symbol">{answer.symbol}</span>
        </motion.button>
      ))}
    </div>
  );
}
