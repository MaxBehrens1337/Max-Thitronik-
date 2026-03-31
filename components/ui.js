"use client";

import React from 'react';
import { Check, Clock, Lock, AlertCircle } from 'lucide-react';

export function ProgressBar({ percent, size = 'default' }) {
  const isComplete = percent >= 100;
  const isStarted = percent > 0;
  
  const heightClass = size === 'lg' ? '12px' : '8px';
  const radiusClass = '9999px';
  
  let color = 'var(--th-blue-secondary)';
  if (isComplete) {
    color = 'var(--color-success)';
  }

  return (
    <div style={{ width: '100%', backgroundColor: 'var(--gray-soft)', height: heightClass, borderRadius: radiusClass, overflow: 'hidden' }}>
      <div 
        style={{ 
          width: `${percent}%`, 
          backgroundColor: color, 
          height: '100%', 
          borderRadius: radiusClass,
          transition: 'width 300ms ease-out, background-color 300ms ease-out'
        }} 
      />
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    'published': { label: 'Veröffentlicht', bg: 'var(--color-success-bg)', text: 'var(--color-success)' },
    'draft': { label: 'Entwurf', bg: 'var(--color-warning-bg)', text: 'var(--color-warning)' },
    'incomplete': { label: 'Unvollständig', bg: 'var(--color-error-bg)', text: 'var(--color-error)' },
    'review': { label: 'In Prüfung', bg: 'var(--color-info-bg)', text: 'var(--color-info)' },
    'completed': { label: 'Abgeschlossen', bg: 'var(--color-success-bg)', text: 'var(--color-success)', icon: <Check size={12}/> },
    'in_progress': { label: 'In Bearbeitung', bg: 'rgba(59, 169, 211, 0.1)', text: 'var(--th-blue-secondary)', icon: <Clock size={12}/> },
    'not_started': { label: 'Nicht gestartet', bg: 'var(--gray-soft)', text: 'var(--text-tertiary)' },
    'passed': { label: 'Bestanden', bg: 'var(--color-success-bg)', text: 'var(--color-success)', icon: <Check size={12}/> },
    'failed': { label: 'Nicht bestanden', bg: 'var(--color-error-bg)', text: 'var(--color-error)', icon: <AlertCircle size={12} /> }
  };
  
  const config = map[status] || { label: status, bg: 'var(--gray-soft)', text: 'var(--text-primary)' };

  return (
    <span style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: '4px',
      backgroundColor: config.bg, 
      color: config.text, 
      padding: '4px 8px', 
      borderRadius: 'var(--radius-sm)', 
      fontSize: 'var(--fs-caption)', 
      fontWeight: 'var(--fw-medium)' 
    }}>
      {config.icon}
      {config.label}
    </span>
  );
}
