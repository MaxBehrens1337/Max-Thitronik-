"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// ============================================
// QuizTimer – Animated countdown bar
// ============================================

export default function QuizTimer({ duration = 20, onTimeUp, isActive = true }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;
    startTimeRef.current = Date.now();

    const tick = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, duration - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        onTimeUp?.();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, isActive, onTimeUp]);

  const percent = (timeLeft / duration) * 100;
  const isWarning = timeLeft <= duration * 0.5;
  const isDanger = timeLeft <= 5;

  const barColor = isDanger
    ? 'var(--quiz-timer-red)'
    : isWarning
      ? 'var(--quiz-timer-yellow)'
      : 'var(--quiz-timer-green)';

  return (
    <div className="quiz-timer">
      <div className="quiz-timer-bar-track">
        <motion.div
          className="quiz-timer-bar-fill"
          style={{ backgroundColor: barColor }}
          initial={{ width: '100%' }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>
      <div className={`quiz-timer-number ${isDanger ? 'quiz-timer-danger' : ''}`}>
        {Math.ceil(timeLeft)}
      </div>
    </div>
  );
}
