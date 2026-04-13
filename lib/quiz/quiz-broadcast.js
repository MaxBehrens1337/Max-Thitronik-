"use client";

// ============================================
// THITRONIK Kahoot Quiz – BroadcastChannel API
// ============================================

const CHANNEL_PREFIX = 'thitronik-quiz-';

/**
 * Quiz BroadcastChannel wrapper.
 * Enables real-time communication between Host (Beamer) and Players (Smartphones)
 * on the same origin (same LAN webserver).
 */
export class QuizChannel {
  constructor(sessionId) {
    this.sessionId = sessionId;
    this.channel = null;
    this.listeners = [];

    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.channel = new BroadcastChannel(CHANNEL_PREFIX + sessionId);
      this.channel.onmessage = (event) => {
        this.listeners.forEach(fn => fn(event.data));
      };
    }
  }

  /**
   * Send a message to all other tabs/windows on the same channel.
   * @param {string} type - Message type (e.g., 'GAME_START', 'ANSWER_SUBMIT')
   * @param {object} payload - Message payload
   */
  send(type, payload = {}) {
    if (!this.channel) return;
    this.channel.postMessage({ type, payload, timestamp: Date.now() });
  }

  /**
   * Register a message listener.
   * @param {function} callback - Called with { type, payload, timestamp }
   * @returns {function} Unsubscribe function
   */
  onMessage(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(fn => fn !== callback);
    };
  }

  /**
   * Close the channel and remove all listeners.
   * Call this on component unmount.
   */
  close() {
    this.listeners = [];
    if (this.channel) {
      this.channel.close();
      this.channel = null;
    }
  }
}

// ============================================
// Message Types (constants)
// ============================================

// Host → Players
export const MSG = {
  GAME_START:     'GAME_START',
  QUESTION_SHOW:  'QUESTION_SHOW',
  REVEAL:         'REVEAL',
  LEADERBOARD:    'LEADERBOARD',
  GAME_END:       'GAME_END',
  // Players → Host
  PLAYER_JOIN:    'PLAYER_JOIN',
  ANSWER_SUBMIT:  'ANSWER_SUBMIT',
};

/**
 * Generate a 6-digit alphanumeric session code.
 * @returns {string} e.g. "A3X7K9"
 */
export function generateSessionCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no O/0/I/1
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
