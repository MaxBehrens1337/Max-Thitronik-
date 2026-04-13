"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// QuizCountdown – 3-2-1-GO! Animation
// ============================================

const STEPS = [
  { text: '3', color: 'var(--quiz-answer-red)' },
  { text: '2', color: 'var(--quiz-answer-yellow)' },
  { text: '1', color: 'var(--quiz-answer-blue)' },
  { text: 'GO!', color: 'var(--th-accent-lime)' },
];

export default function QuizCountdown({ onComplete }) {
  const [step, setStep] = useState(0);

  const handleAnimationComplete = () => {
    if (step < STEPS.length - 1) {
      setTimeout(() => setStep(step + 1), 200);
    } else {
      setTimeout(() => onComplete?.(), 500);
    }
  };

  return (
    <div className="quiz-countdown-overlay">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="quiz-countdown-text"
          style={{ color: STEPS[step].color }}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 2.5, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationComplete={handleAnimationComplete}
        >
          {STEPS[step].text}
        </motion.div>
      </AnimatePresence>

      {/* Pulsing ring behind the number */}
      <motion.div
        className="quiz-countdown-ring"
        style={{ borderColor: STEPS[step].color }}
        animate={{
          scale: [1, 1.8, 2.2],
          opacity: [0.4, 0.1, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'easeOut',
        }}
        key={`ring-${step}`}
      />
    </div>
  );
}
