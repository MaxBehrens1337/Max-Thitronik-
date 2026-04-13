"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// ============================================
// QuizLeaderboard – Top 5 with animated swaps
// ============================================

const RANK_COLORS = {
  0: 'var(--quiz-answer-yellow)',  // Gold
  1: '#C0C0C0',                    // Silver
  2: '#CD7F32',                    // Bronze
};

export default function QuizLeaderboard({ players, previousPlayers = [] }) {
  // Sort by score descending
  const sorted = [...players].sort((a, b) => b.score - a.score).slice(0, 5);

  // Calculate rank changes
  const getRankChange = (playerName) => {
    if (previousPlayers.length === 0) return 0;
    const prevSorted = [...previousPlayers].sort((a, b) => b.score - a.score);
    const prevRank = prevSorted.findIndex(p => p.name === playerName);
    const currRank = sorted.findIndex(p => p.name === playerName);
    if (prevRank === -1) return 0;
    return prevRank - currRank; // positive = moved up
  };

  return (
    <div className="quiz-leaderboard">
      <motion.h2
        className="quiz-leaderboard-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Rangliste
      </motion.h2>

      <div className="quiz-leaderboard-list">
        <AnimatePresence>
          {sorted.map((player, idx) => {
            const change = getRankChange(player.name);
            return (
              <motion.div
                key={player.name}
                className="quiz-leaderboard-entry"
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  layout: { type: 'spring', stiffness: 300, damping: 30 },
                  delay: idx * 0.1,
                }}
              >
                <div
                  className="quiz-leaderboard-rank"
                  style={{ color: RANK_COLORS[idx] || 'var(--text-secondary)' }}
                >
                  {idx + 1}
                </div>

                <div
                  className="quiz-leaderboard-avatar"
                  style={{ backgroundColor: player.avatarColor || 'var(--th-blue-secondary)' }}
                >
                  {player.name.charAt(0).toUpperCase()}
                </div>

                <div className="quiz-leaderboard-info">
                  <span className="quiz-leaderboard-name">{player.name}</span>
                  {player.streak > 1 && (
                    <span className="quiz-leaderboard-streak">🔥 {player.streak}</span>
                  )}
                </div>

                <div className="quiz-leaderboard-score">
                  {player.score.toLocaleString()}
                </div>

                <div className="quiz-leaderboard-change">
                  {change > 0 && <TrendingUp size={16} style={{ color: 'var(--color-success)' }} />}
                  {change < 0 && <TrendingDown size={16} style={{ color: 'var(--color-error)' }} />}
                  {change === 0 && <Minus size={16} style={{ color: 'var(--text-tertiary)' }} />}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
