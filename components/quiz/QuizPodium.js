"use client";

import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

// ============================================
// QuizPodium – Winner ceremony (1st, 2nd, 3rd)
// ============================================

const PODIUM_CONFIG = [
  { place: 2, label: '2.', height: 140, delay: 0.4, color: '#C0C0C0', emoji: '🥈' },
  { place: 1, label: '1.', height: 200, delay: 0.8, color: 'var(--quiz-answer-yellow)', emoji: '🏆' },
  { place: 3, label: '3.', height: 100, delay: 0.2, color: '#CD7F32', emoji: '🥉' },
];

export default function QuizPodium({ players }) {
  const sorted = [...players].sort((a, b) => b.score - a.score).slice(0, 3);

  return (
    <div className="quiz-podium">
      <motion.div
        className="quiz-podium-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Trophy size={36} style={{ color: 'var(--quiz-answer-yellow)' }} />
        <h2>Siegerehrung</h2>
      </motion.div>

      {/* Confetti particles (CSS-only) */}
      <div className="quiz-confetti" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="quiz-confetti-piece"
            style={{
              '--x': `${Math.random() * 100}%`,
              '--delay': `${Math.random() * 2}s`,
              '--color': ['var(--quiz-answer-red)', 'var(--quiz-answer-blue)', 'var(--quiz-answer-yellow)', 'var(--quiz-answer-green)', 'var(--th-accent-lime)'][i % 5],
              '--size': `${6 + Math.random() * 8}px`,
            }}
          />
        ))}
      </div>

      <div className="quiz-podium-blocks">
        {PODIUM_CONFIG.map(({ place, label, height, delay, color, emoji }) => {
          const player = sorted[place - 1];
          if (!player) return null;

          return (
            <motion.div
              key={place}
              className={`quiz-podium-block quiz-podium-block--${place}`}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay, type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* Avatar */}
              <motion.div
                className="quiz-podium-avatar"
                style={{ backgroundColor: player.avatarColor || 'var(--th-blue-secondary)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.3, type: 'spring' }}
              >
                {player.name.charAt(0).toUpperCase()}
              </motion.div>

              {/* Name & Score */}
              <div className="quiz-podium-name">{player.name}</div>
              <div className="quiz-podium-score">{player.score.toLocaleString()}</div>

              {/* Pedestal */}
              <motion.div
                className="quiz-podium-pedestal"
                style={{
                  height: `${height}px`,
                  background: `linear-gradient(to bottom, ${color}, ${color}88)`,
                }}
                initial={{ height: 0 }}
                animate={{ height: `${height}px` }}
                transition={{ delay: delay - 0.1, duration: 0.6, ease: 'easeOut' }}
              >
                <span className="quiz-podium-place">{emoji}</span>
                <span className="quiz-podium-place-label">{label}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
