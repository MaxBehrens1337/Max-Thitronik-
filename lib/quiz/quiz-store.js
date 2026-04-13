"use client";

import { create } from 'zustand';
import { Store } from '@/lib/store';
import { calculateRoundScore, getTopPlayers } from './quiz-scoring';
import { loadQuizQuestions, filterQuestions } from './quiz-data';
import { generateSessionCode } from './quiz-broadcast';

// ============================================
// THITRONIK Kahoot Quiz – Zustand Store
// ============================================

/**
 * Phases flow:
 * idle → lobby → countdown → question → voting → reveal → leaderboard → (loop) → results
 */
const useQuizStore = create((set, get) => ({
  // --- State ---
  phase: 'idle',
  sessionId: null,
  courseKey: null,
  questions: [],
  currentQuestionIndex: 0,
  timeLimit: 20,           // seconds per question
  players: [],              // [{ name, avatarColor, score, streak, answers: [] }]
  answersThisRound: [],     // [{ playerName, answerIndex, timeMs }]
  showExplanation: false,
  questionStartTime: null,  // timestamp when question was shown
  settings: {
    questionCount: 20,
    difficulty: 'all',
    autoExplanation: false,
  },

  // --- Actions ---

  /**
   * Create a new quiz session (Host only).
   */
  createSession: (courseKey, settings = {}) => {
    const sessionId = generateSessionCode();
    const allQuestions = loadQuizQuestions(courseKey);
    const finalSettings = { ...get().settings, ...settings };
    const questions = filterQuestions(allQuestions, finalSettings);

    set({
      phase: 'lobby',
      sessionId,
      courseKey,
      questions,
      currentQuestionIndex: 0,
      players: [],
      answersThisRound: [],
      showExplanation: false,
      questionStartTime: null,
      timeLimit: finalSettings.timeLimit || 20,
      settings: finalSettings,
    });

    return sessionId;
  },

  /**
   * Join a session as a player (Player only).
   */
  joinSession: (sessionId, courseKey) => {
    set({
      phase: 'lobby',
      sessionId,
      courseKey,
    });
  },

  /**
   * Add a player to the session (Host processes this from BroadcastChannel).
   */
  addPlayer: (name, avatarColor) => {
    const { players } = get();
    // Prevent duplicate names
    if (players.some(p => p.name === name)) return false;

    set({
      players: [
        ...players,
        { name, avatarColor, score: 0, streak: 0, answers: [] }
      ]
    });
    return true;
  },

  /**
   * Remove a player from the session.
   */
  removePlayer: (name) => {
    set({ players: get().players.filter(p => p.name !== name) });
  },

  /**
   * Start the game (Host triggers countdown).
   */
  startGame: () => {
    set({ phase: 'countdown' });
  },

  /**
   * Show the current question (called after countdown).
   */
  showQuestion: () => {
    set({
      phase: 'question',
      answersThisRound: [],
      showExplanation: false,
      questionStartTime: Date.now(),
    });
  },

  /**
   * Submit an answer (Player → Host via BroadcastChannel).
   * Host processes this to update scores.
   */
  submitAnswer: (playerName, answerIndex, timeMs) => {
    const { answersThisRound, players, questions, currentQuestionIndex, timeLimit } = get();

    // Prevent double submit
    if (answersThisRound.some(a => a.playerName === playerName)) return;

    const question = questions[currentQuestionIndex];
    const correct = answerIndex === question.correct_answer_index;
    const player = players.find(p => p.name === playerName);
    if (!player) return;

    const { points, streak, multiplier } = calculateRoundScore(
      correct, timeMs, timeLimit * 1000, player.streak
    );

    // Update player score
    const updatedPlayers = players.map(p => {
      if (p.name !== playerName) return p;
      return {
        ...p,
        score: p.score + points,
        streak,
        answers: [...p.answers, {
          questionIndex: currentQuestionIndex,
          answerIndex,
          correct,
          timeMs,
          points,
          multiplier,
        }],
      };
    });

    set({
      answersThisRound: [
        ...answersThisRound,
        { playerName, answerIndex, timeMs, correct, points }
      ],
      players: updatedPlayers,
    });
  },

  /**
   * Reveal the correct answer (Host triggers).
   */
  revealAnswer: () => {
    set({ phase: 'reveal' });
  },

  /**
   * Toggle explanation display.
   */
  toggleExplanation: () => {
    set({ showExplanation: !get().showExplanation });
  },

  /**
   * Show the leaderboard after reveal.
   */
  showLeaderboard: () => {
    set({ phase: 'leaderboard' });
  },

  /**
   * Advance to the next question or end the game.
   */
  nextQuestion: (skipCountdown = false) => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex + 1 >= questions.length) {
      // Game over
      get().endGame();
    } else {
      set({
        currentQuestionIndex: currentQuestionIndex + 1,
        phase: skipCountdown ? 'question' : 'countdown',
        answersThisRound: [],
        showExplanation: false,
        questionStartTime: skipCountdown ? Date.now() : null,
      });
    }
  },

  /**
   * End the game and show results.
   */
  endGame: () => {
    const { sessionId, courseKey, players, questions } = get();

    // Persist session results via Store
    const sessions = Store.get('kahootSessions') || [];
    sessions.push({
      id: sessionId,
      courseKey,
      date: new Date().toISOString(),
      questionCount: questions.length,
      playerCount: players.length,
      players: players.map(p => ({
        name: p.name,
        score: p.score,
        correctAnswers: p.answers.filter(a => a.correct).length,
        totalAnswers: p.answers.length,
        avgTimeMs: p.answers.length > 0
          ? Math.round(p.answers.reduce((sum, a) => sum + a.timeMs, 0) / p.answers.length)
          : 0,
        longestStreak: Math.max(...p.answers.map((_, i) => {
          let s = 0;
          for (let j = i; j < p.answers.length && p.answers[j].correct; j++) s++;
          return s;
        }), 0),
      })),
      winner: getTopPlayers(players, 1)[0]?.name || null,
    });
    Store.set('kahootSessions', sessions);

    set({ phase: 'results' });
  },

  /**
   * Reset to idle state.
   */
  resetQuiz: () => {
    set({
      phase: 'idle',
      sessionId: null,
      courseKey: null,
      questions: [],
      currentQuestionIndex: 0,
      players: [],
      answersThisRound: [],
      showExplanation: false,
      questionStartTime: null,
    });
  },

  // --- Computed getters ---

  getCurrentQuestion: () => {
    const { questions, currentQuestionIndex } = get();
    return questions[currentQuestionIndex] || null;
  },

  getAnswerCount: () => get().answersThisRound.length,
  getPlayerCount: () => get().players.length,
  getTotalQuestions: () => get().questions.length,

  getCorrectPercent: () => {
    const { answersThisRound } = get();
    if (answersThisRound.length === 0) return 0;
    const correct = answersThisRound.filter(a => a.correct).length;
    return Math.round((correct / answersThisRound.length) * 100);
  },
}));

export default useQuizStore;
