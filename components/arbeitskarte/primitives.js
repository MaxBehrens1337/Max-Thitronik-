"use client";

import React, { useRef, useEffect } from 'react';
import { Check, Pen, X } from 'lucide-react';

/* ── Reusable Primitives ── */

export function AkSection({ title, subtitle, children }) {
  return (
    <section className="ak-section">
      <div>
        <h2 className="ak-section-title">{title}</h2>
        {subtitle && <p className="ak-section-subtitle">{subtitle}</p>}
      </div>
      <div className="ak-section-body">{children}</div>
    </section>
  );
}

export function AkInput(props) {
  return <input {...props} className={`ak-input ${props.className || ''}`} />;
}

export function AkTextarea(props) {
  return <textarea {...props} className={`ak-input ak-textarea ${props.className || ''}`} />;
}

export function AkLabel({ children, required, icon: Icon }) {
  return (
    <label className="ak-label">
      {Icon && <Icon size={14} />}
      {children}
      {required && <span className="required">*</span>}
    </label>
  );
}

export function TogglePill({ active, onClick, label, icon: Icon }) {
  return (
    <button type="button" onClick={onClick} className={`ak-toggle ${active ? 'ak-toggle--active' : 'ak-toggle--inactive'}`}>
      <Icon size={20} />
      <span>{label}</span>
      {active && <Check size={16} />}
    </button>
  );
}

export function CheckTile({ checked, onChange, label, description }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className={`ak-check ${checked ? 'ak-check--active' : ''}`}>
      <div className="ak-check-box">{checked && <Check size={14} />}</div>
      <div>
        <div className="ak-check-label">{label}</div>
        {description && <div className="ak-check-desc">{description}</div>}
      </div>
    </button>
  );
}

export function SignatureBox({ title, value, onCreate, onClear }) {
  return (
    <div className="ak-sig">
      <div className="ak-sig-header">
        <h4>{title}</h4>
        {value && (
          <button onClick={onClear} className="icon-btn icon-btn--delete"><X size={16} /></button>
        )}
      </div>
      {value ? (
        <img src={value} alt={title} className="ak-sig-img" />
      ) : (
        <button onClick={onCreate} className="ak-sig-placeholder">
          <Pen size={20} />
          <span>Digital unterschreiben</span>
        </button>
      )}
    </div>
  );
}

export function SignatureCanvas({ onSave, onClose, title }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getPos = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const start = (e) => { const ctx = canvasRef.current?.getContext("2d"); if (!ctx) return; const pos = getPos(e); drawing.current = true; ctx.beginPath(); ctx.moveTo(pos.x, pos.y); };
  const move = (e) => { if (!drawing.current) return; const ctx = canvasRef.current?.getContext("2d"); if (!ctx) return; const pos = getPos(e); ctx.lineTo(pos.x, pos.y); ctx.stroke(); };
  const end = () => { drawing.current = false; };
  const clear = () => { const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return; ctx.save(); ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,canvas.width,canvas.height); ctx.restore(); const rect = canvas.getBoundingClientRect(); ctx.fillStyle="#ffffff"; ctx.fillRect(0,0,rect.width,rect.height); };
  const save = () => { const canvas = canvasRef.current; if (!canvas) return; onSave(canvas.toDataURL("image/png")); onClose(); };

  return (
    <div className="ak-modal">
      <div className="ak-modal-content">
        <div className="ak-modal-header">
          <div>
            <h3 className="ak-section-title">{title}</h3>
            <p className="ak-section-subtitle">Bitte direkt im Feld unterschreiben.</p>
          </div>
          <button onClick={onClose} className="icon-btn"><X size={20} /></button>
        </div>
        <canvas ref={canvasRef} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerLeave={end} />
        <div className="ak-modal-actions">
          <button onClick={clear} className="ak-action-btn">Leeren</button>
          <button onClick={save} className="ak-action-btn ak-action-btn--primary">Übernehmen</button>
        </div>
      </div>
    </div>
  );
}

export function PhotoUpload({ label, value, onChange }) {
  const inputRef = useRef(null);
  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(String(ev.target?.result || ""));
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="ak-photo">
      <div className="ak-photo-header">
        <div>
          <h4 className="ak-check-label">{label}</h4>
          <p className="ak-section-subtitle">Foto als Vorschaden-Dokumentation</p>
        </div>
        {value && <button onClick={() => onChange(undefined)} className="icon-btn icon-btn--delete"><X size={16} /></button>}
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFile} />
      {value ? (
        <>
          <img src={value} alt={label} className="ak-photo-preview" />
          <button onClick={() => inputRef.current?.click()} className="ak-action-btn" style={{ marginTop: '12px' }}>Foto ersetzen</button>
        </>
      ) : (
        <button onClick={() => inputRef.current?.click()} className="ak-photo-placeholder">Foto hochladen</button>
      )}
    </div>
  );
}

export function SketchCanvas({ label, value, onChange, backgroundSrc }) {
  const bgCanvasRef = useRef(null);
  const drawCanvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const drawing = useRef(false);
  const bgLoaded = useRef(false);
  const CANVAS_H = 320;

  // Initialize background canvas with vehicle image
  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const wrapper = wrapperRef.current;
    if (!bgCanvas || !wrapper) return;
    const dpr = window.devicePixelRatio || 1;
    const w = wrapper.getBoundingClientRect().width;
    bgCanvas.width = w * dpr;
    bgCanvas.height = CANVAS_H * dpr;
    bgCanvas.style.width = `${w}px`;
    bgCanvas.style.height = `${CANVAS_H}px`;
    const ctx = bgCanvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Fill background
    ctx.fillStyle = "#0d1b2a";
    ctx.fillRect(0, 0, w, CANVAS_H);

    if (backgroundSrc) {
      const img = new Image();
      img.onload = () => {
        // Center the image, keeping aspect ratio, with padding
        const pad = 20;
        const availW = w - pad * 2;
        const availH = CANVAS_H - pad * 2;
        const scale = Math.min(availW / img.width, availH / img.height);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        const x = (w - drawW) / 2;
        const y = (CANVAS_H - drawH) / 2;
        ctx.drawImage(img, x, y, drawW, drawH);
        bgLoaded.current = true;
      };
      img.src = backgroundSrc;
    } else {
      // Fallback: dashed placeholder
      ctx.fillStyle = "#94a3b8"; ctx.font = "14px sans-serif";
      ctx.fillText(`${label} – Skizze / Markierung`, 16, 28);
      ctx.strokeStyle = "#334155"; ctx.setLineDash([5, 5]);
      ctx.strokeRect(16, 42, w - 32, CANVAS_H - 62); ctx.setLineDash([]);
    }
  }, [label, backgroundSrc]);

  // Initialize drawing canvas (transparent overlay) and restore previous drawings
  useEffect(() => {
    const drawCanvas = drawCanvasRef.current;
    const wrapper = wrapperRef.current;
    if (!drawCanvas || !wrapper) return;
    const dpr = window.devicePixelRatio || 1;
    const w = wrapper.getBoundingClientRect().width;
    drawCanvas.width = w * dpr;
    drawCanvas.height = CANVAS_H * dpr;
    drawCanvas.style.width = `${w}px`;
    drawCanvas.style.height = `${CANVAS_H}px`;
    const ctx = drawCanvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Restore previous drawing data if available
    if (value) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, w, CANVAS_H);
      img.src = value;
    }
  }, [label]);

  const point = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e) => {
    const ctx = drawCanvasRef.current?.getContext("2d");
    if (!ctx) return;
    const pos = point(e);
    drawing.current = true;
    ctx.setLineDash([]);
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const move = (e) => {
    if (!drawing.current) return;
    const ctx = drawCanvasRef.current?.getContext("2d");
    if (!ctx) return;
    const pos = point(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const end = () => {
    drawing.current = false;
    // Save only the drawing layer (transparent PNG, no background)
    if (drawCanvasRef.current) onChange(drawCanvasRef.current.toDataURL("image/png"));
  };

  const clearDrawing = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    onChange("");
  };

  return (
    <div className="ak-sketch">
      <div ref={wrapperRef}>
        <div className="ak-sketch-header">
          <h4 className="ak-check-label">{label}</h4>
          <button onClick={clearDrawing} className="ak-action-btn" style={{ padding: '4px 12px', fontSize: '12px' }}>Leeren</button>
        </div>
        <div className="ak-sketch-canvas-stack">
          <canvas ref={bgCanvasRef} className="ak-sketch-bg" />
          <canvas
            ref={drawCanvasRef}
            className="ak-sketch-draw"
            onPointerDown={start}
            onPointerMove={move}
            onPointerUp={end}
            onPointerLeave={end}
          />
        </div>
      </div>
    </div>
  );
}
