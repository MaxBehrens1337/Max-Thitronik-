"use client";

import { motion } from 'framer-motion';
import { BarChart3, Clock, Zap, Target } from 'lucide-react';
import { analyzeWeakCategories } from '@/lib/quiz/quiz-scoring';

// ============================================
// QuizResults – Detailed results & statistics
// ============================================

export default function QuizResults({
  players,
  questions,
  courseTitle,
  onPlayAgain,
  onBackToOverview,
}) {
  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="quiz-results">
      <h2 className="quiz-results-title">Ergebnisse – {courseTitle}</h2>

      {/* Full player ranking */}
      <div className="quiz-results-table-wrapper">
        <table className="quiz-results-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Spieler</th>
              <th>Punkte</th>
              <th><Target size={14} /> Richtig</th>
              <th><Clock size={14} /> Ø Zeit</th>
              <th><Zap size={14} /> Streak</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((player, idx) => {
              const correctCount = player.answers.filter(a => a.correct).length;
              const avgTime = player.answers.length > 0
                ? Math.round(player.answers.reduce((s, a) => s + a.timeMs, 0) / player.answers.length / 1000 * 10) / 10
                : 0;
              const longestStreak = calcLongestStreak(player.answers);

              return (
                <motion.tr
                  key={player.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <td className="quiz-results-rank">{idx + 1}</td>
                  <td>
                    <div className="quiz-results-player">
                      <div
                        className="quiz-results-avatar"
                        style={{ backgroundColor: player.avatarColor || 'var(--th-blue-secondary)' }}
                      >
                        {player.name.charAt(0).toUpperCase()}
                      </div>
                      {player.name}
                    </div>
                  </td>
                  <td className="quiz-results-score">{player.score.toLocaleString()}</td>
                  <td>{correctCount}/{player.answers.length}</td>
                  <td>{avgTime}s</td>
                  <td>
                    {longestStreak > 0 && (
                      <span className="quiz-results-streak-badge">🔥 {longestStreak}</span>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Category weakness analysis (aggregated across all players) */}
      {questions.length > 0 && (
        <div className="quiz-results-categories">
          <h3><BarChart3 size={18} /> Kategorien-Analyse</h3>
          <div className="quiz-results-category-grid">
            {getCategoryStats(questions, sorted).map((cat, idx) => (
              <motion.div
                key={cat.name}
                className="quiz-results-category-card card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
              >
                <div className="quiz-results-category-name">{cat.name}</div>
                <div className="quiz-results-category-bar">
                  <div
                    className="quiz-results-category-fill"
                    style={{
                      width: `${cat.percent}%`,
                      backgroundColor: cat.percent >= 70
                        ? 'var(--color-success)'
                        : cat.percent >= 40
                          ? 'var(--quiz-answer-yellow)'
                          : 'var(--quiz-answer-red)',
                    }}
                  />
                </div>
                <div className="quiz-results-category-percent">{cat.percent}%</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="quiz-results-actions">
        <button className="btn btn-primary quiz-results-btn" onClick={onPlayAgain}>
          Nochmal spielen
        </button>
        <button className="btn btn-secondary quiz-results-btn" onClick={onBackToOverview}>
          Zurück zur Übersicht
        </button>
      </div>
    </div>
  );
}

/**
 * Calculate longest streak for a player.
 */
function calcLongestStreak(answers) {
  let max = 0;
  let current = 0;
  for (const a of answers) {
    if (a.correct) {
      current++;
      max = Math.max(max, current);
    } else {
      current = 0;
    }
  }
  return max;
}

/**
 * Aggregate category stats across all players.
 */
function getCategoryStats(questions, players) {
  const cats = {};
  questions.forEach((q, qIdx) => {
    const cat = q.category || 'Allgemein';
    if (!cats[cat]) cats[cat] = { name: cat, total: 0, correct: 0 };

    players.forEach(p => {
      const ans = p.answers.find(a => a.questionIndex === qIdx);
      if (ans) {
        cats[cat].total++;
        if (ans.correct) cats[cat].correct++;
      }
    });
  });

  return Object.values(cats)
    .map(c => ({ ...c, percent: c.total > 0 ? Math.round((c.correct / c.total) * 100) : 0 }))
    .sort((a, b) => a.percent - b.percent);
}
