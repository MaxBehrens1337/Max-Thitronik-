"use client";

import { API } from '@/lib/store';

// ============================================
// THITRONIK Kahoot Quiz – Data Layer
// ============================================

/**
 * Course configuration for the Kahoot quiz.
 * Maps courseKey to courseId and metadata.
 */
export const QUIZ_COURSES = {
  'mercedes-vb30': {
    courseId: 'c10',
    lessonId: 'l10',
    title: 'Mercedes Sprinter VS30',
    shortTitle: 'MB VS30',
    description: 'WiPro III safe.lock Einbau im Mercedes Sprinter VS30',
    icon: '🚐',
    image: '/Vs 30/VS30.webp',
  },
  'renault-master': {
    courseId: 'c14',
    lessonId: 'l14',
    title: 'Renault Master',
    shortTitle: 'Renault',
    description: 'WiPro III safe.lock Einbau im Renault Master 2019–2024',
    icon: '🚛',
    image: '/Renault Master/Renault Master.jpeg',
  },
  'vw-crafter': {
    courseId: 'c15',
    lessonId: 'l15',
    title: 'VW Crafter / MAN TGE',
    shortTitle: 'VW Crafter',
    description: 'WiPro III safe.lock Einbau im VW Crafter / MAN TGE',
    icon: '🚚',
    image: '/Vw Crafter/VWCrafter.webp',
  },
};

/**
 * Load quiz questions from the Store API for a given course.
 * Converts existing seed format to Kahoot-compatible format.
 * @param {string} courseKey - e.g. 'vw-crafter'
 * @returns {Array} Questions in Kahoot format
 */
export function loadQuizQuestions(courseKey) {
  const config = QUIZ_COURSES[courseKey];
  if (!config) return [];

  // Get all questions for the lesson from the Store
  const rawQuestions = API.getQuestions(config.lessonId);
  if (!rawQuestions || rawQuestions.length === 0) return [];

  // Convert from seed format to Kahoot format
  return rawQuestions
    .filter(q => {
      // Only include text-based questions (skip image-based for Kahoot)
      const hasImageAnswers = q.answers?.some(a =>
        typeof a === 'string' && (a.endsWith('.webp') || a.endsWith('.jpg') || a.endsWith('.png'))
      );
      return !hasImageAnswers;
    })
    .map((q, idx) => {
      // Find the correct answer index
      const correctIndex = q.answers.findIndex(a =>
        q.correctAnswers && q.correctAnswers.includes(a)
      );

      return {
        id: q.id,
        category: detectCategory(q.question),
        difficulty: detectDifficulty(q.question, idx),
        question: q.question,
        answers: q.answers.slice(0, 4), // Kahoot always has max 4 answers
        correct_answer_index: correctIndex >= 0 ? correctIndex : 0,
        explanation: q.explanation || '',
        originalType: q.type,
      };
    });
}

/**
 * Filter and shuffle questions based on settings.
 * @param {Array} questions - Full question array
 * @param {object} options - { count, difficulty }
 * @returns {Array} Filtered and shuffled questions
 */
export function filterQuestions(questions, { count = 20, difficulty = 'all' } = {}) {
  let filtered = [...questions];

  // Filter by difficulty if specified
  if (difficulty && difficulty !== 'all') {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }

  // Shuffle (Fisher-Yates)
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }

  // Limit to requested count
  return filtered.slice(0, Math.min(count, filtered.length));
}

/**
 * Detect category from question text using keywords.
 * @param {string} questionText
 * @returns {string} Category name
 */
function detectCategory(questionText) {
  const text = questionText.toLowerCase();

  if (text.includes('can-bus') || text.includes('can bus') || text.includes('canbus')) return 'CAN-Bus';
  if (text.includes('dip') || text.includes('schalter')) return 'DIP-Schalter';
  if (text.includes('sicherung') || text.includes('klemme 30') || text.includes('klemme 31') || text.includes('masse')) return 'Elektrik';
  if (text.includes('zv') || text.includes('zentralverriegelung') || text.includes('entrieg') || text.includes('verrieg')) return 'ZV-Ansteuerung';
  if (text.includes('klebe') || text.includes('montage') || text.includes('einbauort') || text.includes('zentrale')) return 'Montage';
  if (text.includes('sirene') || text.includes('hupe') || text.includes('alarm')) return 'Alarmierung';
  if (text.includes('pro-finder') || text.includes('profinder') || text.includes('gps')) return 'Pro-finder';
  if (text.includes('funk') || text.includes('fernbedienung') || text.includes('handsender')) return 'Funk-Zubehör';
  if (text.includes('innenraum') || text.includes('sensor') || text.includes('überwachung')) return 'Sensorik';
  if (text.includes('safe.lock') || text.includes('wipro')) return 'Produktlogik';

  return 'Allgemein';
}

/**
 * Detect difficulty based on question complexity.
 * @param {string} questionText
 * @param {number} index
 * @returns {string} 'mittel' | 'schwer' | 'sehr_schwer'
 */
function detectDifficulty(questionText, index) {
  const text = questionText.toLowerCase();
  const len = text.length;

  // Long, complex questions are harder
  if (len > 200 || text.includes('unterschied') || text.includes('modelljahr')) return 'sehr_schwer';
  if (len > 120 || text.includes('pin') || text.includes('stecker') || text.includes('can')) return 'schwer';
  return 'mittel';
}

/**
 * Get available course keys that have questions.
 * @returns {Array} e.g. ['vw-crafter', 'mercedes-vb30']
 */
export function getAvailableCourses() {
  return Object.entries(QUIZ_COURSES)
    .filter(([key]) => {
      const questions = loadQuizQuestions(key);
      return questions.length > 0;
    })
    .map(([key, config]) => ({
      key,
      ...config,
      questionCount: loadQuizQuestions(key).length,
    }));
}
