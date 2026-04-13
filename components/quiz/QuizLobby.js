"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Users, Play, Settings, Copy, Check } from 'lucide-react';

// ============================================
// QuizLobby – Session setup & waiting room
// ============================================

const AVATAR_COLORS = [
  '#E21B3C', '#1368CE', '#D89E00', '#26890C', '#9B59B6', '#E67E22',
];

const TIMER_OPTIONS = [10, 15, 20, 30];
const DIFFICULTY_OPTIONS = [
  { value: 'all', label: 'Alle' },
  { value: 'mittel', label: 'Mittel' },
  { value: 'schwer', label: 'Schwer' },
  { value: 'sehr_schwer', label: 'Sehr schwer' },
];

export default function QuizLobby({
  mode = 'host',         // 'host' or 'player'
  sessionId,
  players = [],
  courses = [],          // available courses for host
  maxQuestions = 45,
  onStartGame,           // host callback
  onJoinGame,            // player callback: (name, avatarColor)
  onSettingsChange,      // host callback: (settings)
}) {
  // Host state
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.key || '');
  const [questionCount, setQuestionCount] = useState(20);
  const [difficulty, setDifficulty] = useState('all');
  const [timeLimit, setTimeLimit] = useState(20);
  const [copied, setCopied] = useState(false);

  // Player state
  const [playerName, setPlayerName] = useState('');
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[0]);
  const [joined, setJoined] = useState(false);

  // Build join URL for QR code
  const joinUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/quiz/play/${sessionId}`
    : '';

  useEffect(() => {
    if (mode === 'host' && onSettingsChange) {
      onSettingsChange({
        courseKey: selectedCourse,
        questionCount,
        difficulty,
        timeLimit,
      });
    }
  }, [selectedCourse, questionCount, difficulty, timeLimit]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(sessionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback: ignore */ }
  };

  const handleJoin = () => {
    if (!playerName.trim()) return;
    setJoined(true);
    onJoinGame?.(playerName.trim(), avatarColor);
  };

  // ---- PLAYER VIEW ----
  if (mode === 'player') {
    if (joined) {
      return (
        <div className="quiz-lobby quiz-lobby--player">
          <motion.div
            className="quiz-lobby-waiting"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div
              className="quiz-lobby-avatar-large"
              style={{ backgroundColor: avatarColor }}
            >
              {playerName.charAt(0).toUpperCase()}
            </div>
            <h2>{playerName}</h2>
            <p className="quiz-lobby-wait-text">Warte auf den Start...</p>
            <motion.div
              className="quiz-lobby-pulse"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <div className="quiz-lobby-dot" />
            </motion.div>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="quiz-lobby quiz-lobby--player">
        <div className="quiz-lobby-join-form">
          <h2>Quiz beitreten</h2>
          <p className="quiz-lobby-session-info">Session: <strong>{sessionId}</strong></p>

          <div className="quiz-lobby-field">
            <label className="label" htmlFor="player-name">Dein Name</label>
            <input
              id="player-name"
              className="input"
              type="text"
              placeholder="Name eingeben..."
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              maxLength={20}
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleJoin()}
            />
          </div>

          <div className="quiz-lobby-field">
            <label className="label">Farbe wählen</label>
            <div className="quiz-lobby-colors">
              {AVATAR_COLORS.map(color => (
                <button
                  key={color}
                  className={`quiz-lobby-color-btn ${avatarColor === color ? 'quiz-lobby-color-btn--active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setAvatarColor(color)}
                  aria-label={`Farbe ${color}`}
                />
              ))}
            </div>
          </div>

          <button
            className="btn btn-primary quiz-lobby-join-btn"
            onClick={handleJoin}
            disabled={!playerName.trim()}
          >
            Beitreten
          </button>
        </div>
      </div>
    );
  }

  // ---- HOST VIEW ----
  return (
    <div className="quiz-lobby quiz-lobby--host">
      <div className="quiz-lobby-grid">
        {/* Left: Settings + QR */}
        <div className="quiz-lobby-setup">
          <h2 className="quiz-lobby-title">Live-Quiz erstellen</h2>

          {/* Course selection */}
          <div className="quiz-lobby-field">
            <label className="label" htmlFor="quiz-course">Fahrzeugkurs</label>
            <select
              id="quiz-course"
              className="input"
              value={selectedCourse}
              onChange={e => setSelectedCourse(e.target.value)}
            >
              {courses.map(c => (
                <option key={c.key} value={c.key}>
                  {c.title} ({c.questionCount} Fragen)
                </option>
              ))}
            </select>
          </div>

          {/* Settings row */}
          <div className="quiz-lobby-settings-row">
            <div className="quiz-lobby-field">
              <label className="label" htmlFor="quiz-count">Fragenzahl</label>
              <input
                id="quiz-count"
                className="input"
                type="range"
                min={5}
                max={maxQuestions}
                value={questionCount}
                onChange={e => setQuestionCount(Number(e.target.value))}
              />
              <span className="quiz-lobby-range-value">{questionCount}</span>
            </div>

            <div className="quiz-lobby-field">
              <label className="label" htmlFor="quiz-difficulty">Schwierigkeit</label>
              <select
                id="quiz-difficulty"
                className="input"
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
              >
                {DIFFICULTY_OPTIONS.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>

            <div className="quiz-lobby-field">
              <label className="label" htmlFor="quiz-timer">Timer (Sek.)</label>
              <select
                id="quiz-timer"
                className="input"
                value={timeLimit}
                onChange={e => setTimeLimit(Number(e.target.value))}
              >
                {TIMER_OPTIONS.map(t => (
                  <option key={t} value={t}>{t}s</option>
                ))}
              </select>
            </div>
          </div>

          {/* QR Code + Session Code */}
          <div className="quiz-lobby-join-info">
            <div className="quiz-lobby-qr">
              <QRCodeSVG
                value={joinUrl}
                size={180}
                bgColor="transparent"
                fgColor="#ffffff"
                level="M"
              />
            </div>
            <div className="quiz-lobby-code-area">
              <p className="quiz-lobby-code-label">Session-Code:</p>
              <div className="quiz-lobby-code">
                <span className="quiz-lobby-code-text">{sessionId}</span>
                <button
                  className="quiz-lobby-copy-btn"
                  onClick={handleCopyCode}
                  aria-label="Code kopieren"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              <p className="quiz-lobby-code-url">{joinUrl}</p>
            </div>
          </div>
        </div>

        {/* Right: Player list */}
        <div className="quiz-lobby-players">
          <div className="quiz-lobby-players-header">
            <Users size={20} />
            <h3>Teilnehmer ({players.length})</h3>
          </div>

          <div className="quiz-lobby-player-list">
            <AnimatePresence>
              {players.map((player, idx) => (
                <motion.div
                  key={player.name}
                  className="quiz-lobby-player"
                  initial={{ opacity: 0, x: 30, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div
                    className="quiz-lobby-player-avatar"
                    style={{ backgroundColor: player.avatarColor }}
                  >
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="quiz-lobby-player-name">{player.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>

            {players.length === 0 && (
              <div className="quiz-lobby-empty">
                <p>Warte auf Teilnehmer...</p>
                <p className="quiz-lobby-empty-hint">QR-Code scannen oder Code eingeben</p>
              </div>
            )}
          </div>

          {/* Start button */}
          <button
            className="btn btn-success quiz-lobby-start-btn"
            onClick={() => onStartGame?.({
              courseKey: selectedCourse,
              questionCount,
              difficulty,
              timeLimit,
            })}
            disabled={players.length === 0}
          >
            <Play size={20} />
            Spiel starten ({players.length} Spieler)
          </button>
        </div>
      </div>
    </div>
  );
}
