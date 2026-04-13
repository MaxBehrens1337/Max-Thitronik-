"use client";

// ============================================
// THITRONIK Kahoot Quiz – Scoring Engine
// ============================================

/**
 * Calculate score for a single answer.
 * Max 1000 points: correct + fast = more points.
 * @param {boolean} correct - Whether the answer was correct
 * @param {number} timeMs - Time taken in milliseconds
 * @param {number} timeLimitMs - Total time limit in milliseconds
 * @returns {number} Score (0–1000)
 */
export function calcScore(correct, timeMs, timeLimitMs) {
  if (!correct) return 0;
  // Clamp timeMs to avoid negative scores
  const clamped = Math.min(Math.max(timeMs, 0), timeLimitMs);
  return Math.round(1000 * (1 - (clamped / timeLimitMs) * 0.5));
}

/**
 * Get streak multiplier based on consecutive correct answers.
 * 2nd correct in a row: ×1.2
 * 3rd: ×1.5
 * 4th+: ×2.0
 * @param {number} streak - Current streak count
 * @returns {number} Multiplier
 */
export function getStreakMultiplier(streak) {
  if (streak >= 4) return 2.0;
  if (streak === 3) return 1.5;
  if (streak === 2) return 1.2;
  return 1.0;
}

/**
 * Calculate final score with streak bonus applied.
 * @param {boolean} correct
 * @param {number} timeMs
 * @param {number} timeLimitMs
 * @param {number} currentStreak - Streak BEFORE this answer
 * @returns {{ points: number, streak: number, multiplier: number }}
 */
export function calculateRoundScore(correct, timeMs, timeLimitMs, currentStreak) {
  const newStreak = correct ? currentStreak + 1 : 0;
  const basePoints = calcScore(correct, timeMs, timeLimitMs);
  const multiplier = correct ? getStreakMultiplier(newStreak) : 1.0;
  const points = Math.round(basePoints * multiplier);

  return { points, streak: newStreak, multiplier };
}

/**
 * Analyze category weaknesses for results screen.
 * Groups questions by category and calculates % correct.
 * @param {Array} questions - All quiz questions
 * @param {Array} playerAnswers - Player's answers [{ questionIndex, answerIndex, correct }]
 * @returns {Array} Sorted categories, weakest first
 */
export function analyzeWeakCategories(questions, playerAnswers) {
  const categories = {};

  questions.forEach((q, idx) => {
    const cat = q.category || 'Allgemein';
    if (!categories[cat]) {
      categories[cat] = { name: cat, total: 0, correct: 0 };
    }
    categories[cat].total++;

    const answer = playerAnswers.find(a => a.questionIndex === idx);
    if (answer && answer.correct) {
      categories[cat].correct++;
    }
  });

  return Object.values(categories)
    .map(c => ({ ...c, percent: Math.round((c.correct / c.total) * 100) }))
    .sort((a, b) => a.percent - b.percent);
}

/**
 * Get top N players sorted by score (descending).
 * @param {Array} players
 * @param {number} n
 * @returns {Array}
 */
export function getTopPlayers(players, n = 5) {
  return [...players]
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}
