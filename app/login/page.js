"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { AtSign, Lock, AlertCircle, Eye, EyeOff, Shield, Users, User } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const router = useRouter();
  const { Auth } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const result = Auth.login(email, password);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error);
        setIsLoading(false);
      }
    }, 800);
  };

  const handleDemoLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      const result = Auth.login(demoEmail, demoPassword);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error);
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className={`login-page ${mounted ? 'login-page--visible' : ''}`}>
      {/* Circuit board background */}
      <div className="login-bg">
        <img 
          src="/logIn/screen.png" 
          alt="" 
          className="login-bg-image"
          aria-hidden="true"
        />
        <div className="login-bg-vignette" />
      </div>

      {/* Radar overlay - top right */}
      <div className="login-radar" aria-hidden="true">
        <div className="login-radar-ring login-radar-ring--1" />
        <div className="login-radar-ring login-radar-ring--2" />
        <div className="login-radar-ring login-radar-ring--3" />
        <div className="login-radar-sweep" />
        <div className="login-radar-dot" />
      </div>

      {/* Main content */}
      <div className="login-container">
        {/* Header - Logo & System Login */}
        <div className="login-header">
          <div className="login-brand">
            <img 
              src="/Bilder/Thitronik_vektor.webp" 
              alt="THITRONIK Logo" 
              className="login-logo"
            />
            <span className="login-brand-sub">ONLINE</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="login-card">
          <form onSubmit={handleLogin} className="login-form">
            {error && (
              <div className="login-error">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <div className="login-field">
              <label htmlFor="login-email" className="login-label">E-MAIL</label>
              <div className="login-input-wrap">
                <input 
                  id="login-email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.de"
                  required
                  autoComplete="email"
                />
                <AtSign size={16} className="login-input-icon-right" />
              </div>
            </div>

            <div className="login-field">
              <div className="login-field-header">
                <label htmlFor="login-password" className="login-label">PASSWORT</label>
                <a href="#" className="login-recover" tabIndex={-1}>Passwort vergessen?</a>
              </div>
              <div className="login-input-wrap">
                <input 
                  id="login-password"
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                />
                <button 
                  type="button" 
                  className="login-toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Lock size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="login-submit" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="login-spinner" />
                  VERBINDUNG WIRD HERGESTELLT...
                </>
              ) : (
                <>LOGIN</>
              )}
            </button>
          </form>

          {/* Status Bar */}
          <div className="login-status-bar">
            <div className="login-status-online">
              <span className="login-status-dot" />
              <span>SYSTEM ONLINE</span>
            </div>
            <span className="login-status-version">v.1.32.0_NODE</span>
          </div>
        </div>

        {/* Demo Quick Access */}
        <div className="login-demo-section">
          <div className="login-demo-buttons">
            <button 
              type="button" 
              className="login-demo-pill login-demo-pill--admin"
              onClick={() => handleDemoLogin('admin@thitronik.de', 'admin123')}
            >
              <Shield size={12} />
              <span>ADMIN</span>
            </button>
            <button 
              type="button" 
              className="login-demo-pill login-demo-pill--manager"
              onClick={() => handleDemoLogin('trainer@thitronik.de', 'trainer123')}
            >
              <Users size={12} />
              <span>MANAGER</span>
            </button>
            <button 
              type="button" 
              className="login-demo-pill login-demo-pill--nutzer"
              onClick={() => handleDemoLogin('monteur@thitronik.de', 'monteur123')}
            >
              <User size={12} />
              <span>NUTZER</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="login-footer">
          <p className="login-footer-notice">
            Access restricted to authorised Thitronik partners and campus users.
          </p>
          <div className="login-footer-links">
            <a href="/datenschutz">DATENSCHUTZ</a>
            <a href="/impressum">IMPRESSUM</a>
            <a href="/support">SUPPORT</a>
          </div>
        </footer>
      </div>

      <style jsx>{`
        /* ============================================
           Login Page — Stitch "Neue LogIN Seite" Rebuild
           Terminal/Tactical Dark Theme
           ============================================ */
        
        .login-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.8s ease;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #070d18;
        }
        .login-page--visible {
          opacity: 1;
        }

        /* === Background === */
        .login-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
        }
        .login-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.35;
        }
        .login-bg-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 80% 80% at 50% 50%,
            transparent 20%,
            rgba(7, 13, 24, 0.7) 70%,
            rgba(7, 13, 24, 0.95) 100%
          );
        }

        /* === Radar Overlay - Top Right === */
        .login-radar {
          position: fixed;
          top: -60px;
          right: -60px;
          width: 280px;
          height: 280px;
          z-index: 1;
          opacity: 0.4;
        }
        .login-radar-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(59, 169, 211, 0.2);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .login-radar-ring--1 {
          width: 100px;
          height: 100px;
        }
        .login-radar-ring--2 {
          width: 180px;
          height: 180px;
        }
        .login-radar-ring--3 {
          width: 260px;
          height: 260px;
        }
        .login-radar-sweep {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 130px;
          height: 2px;
          background: linear-gradient(90deg, rgba(59, 169, 211, 0.6), transparent);
          transform-origin: left center;
          animation: radarSweep 4s linear infinite;
        }
        .login-radar-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 6px;
          background: #3BA9D3;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 8px rgba(59, 169, 211, 0.6);
        }

        @keyframes radarSweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* === Container === */
        .login-container {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 40px 24px;
          max-width: 440px;
          margin: 0 auto;
        }

        /* === Header === */
        .login-header {
          width: 100%;
          margin-bottom: 0px;
          transform: translate(50px, 180px);
          animation: fadeSlideDown 0.6s ease forwards;
          opacity: 0;
        }
        .login-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 0px;
        }
        .login-logo {
          height: 240px;
          width: auto;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .login-brand-sub {
          font-size: 11px;
          font-weight: 700;
          color: #AFCA05;
          letter-spacing: 0.18em;
          border-left: 2px solid rgba(255, 255, 255, 0.2);
          padding-left: 10px;
        }


        /* === Login Card === */
        .login-card {
          width: 100%;
          background: rgba(10, 19, 37, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(59, 169, 211, 0.35);
          border-radius: 16px;
          padding: 32px 28px 20px;
          box-shadow: 
            0 0 30px rgba(59, 169, 211, 0.08),
            0 0 60px rgba(7, 13, 24, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
          animation: fadeScaleIn 0.5s ease 0.15s forwards;
          opacity: 0;
        }

        /* === Form === */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Error */
        .login-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: rgba(206, 19, 45, 0.12);
          border: 1px solid rgba(206, 19, 45, 0.25);
          border-radius: 8px;
          color: #ff6b6b;
          font-size: 12px;
          font-weight: 500;
          animation: fadeSlideDown 0.3s ease;
        }

        /* Field */
        .login-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .login-label {
          font-size: 10px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .login-field-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .login-recover {
          font-size: 10px;
          font-weight: 500;
          color: rgba(59, 169, 211, 0.7);
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.2s ease;
        }
        .login-recover:hover {
          color: #3BA9D3;
          text-decoration: underline;
        }

        /* Input */
        .login-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .login-input-wrap input {
          width: 100%;
          padding: 13px 40px 13px 16px;
          background: rgba(5, 14, 32, 0.8);
          border: 1px solid rgba(59, 169, 211, 0.15);
          border-radius: 8px;
          color: #dae2fc;
          font-size: 14px;
          font-family: 'Inter', monospace, sans-serif;
          letter-spacing: 0.02em;
          transition: all 0.25s ease;
        }
        .login-input-wrap input::placeholder {
          color: rgba(255, 255, 255, 0.18);
          font-family: inherit;
        }
        .login-input-wrap input:focus {
          outline: none;
          border-color: rgba(59, 169, 211, 0.5);
          background: rgba(5, 14, 32, 0.95);
          box-shadow: 
            0 0 0 2px rgba(59, 169, 211, 0.1),
            0 0 12px rgba(59, 169, 211, 0.08);
        }
        .login-input-icon-right {
          position: absolute;
          right: 14px;
          color: rgba(59, 169, 211, 0.4);
          pointer-events: none;
        }
        .login-toggle-pw {
          position: absolute;
          right: 10px;
          padding: 4px;
          color: rgba(59, 169, 211, 0.4);
          transition: color 0.2s ease;
          cursor: pointer;
          background: none;
          border: none;
          display: flex;
          align-items: center;
        }
        .login-toggle-pw:hover {
          color: rgba(59, 169, 211, 0.8);
        }

        /* Submit Button */
        .login-submit {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #3BA9D3, #2b8fb3);
          color: #001020;
          font-size: 12px;
          font-weight: 700;
          font-family: 'Inter', monospace, sans-serif;
          letter-spacing: 0.12em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          margin-top: 4px;
          box-shadow: 
            0 4px 20px rgba(59, 169, 211, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          text-transform: uppercase;
        }
        .login-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 
            0 8px 30px rgba(59, 169, 211, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          background: linear-gradient(135deg, #4ec4ec, #3BA9D3);
        }
        .login-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .login-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Spinner */
        .login-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(0, 16, 32, 0.3);
          border-top-color: #001020;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* Status Bar */
        .login-status-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid rgba(59, 169, 211, 0.08);
        }
        .login-status-online {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 9px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .login-status-dot {
          width: 6px;
          height: 6px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
          animation: pulse 2s ease-in-out infinite;
        }
        .login-status-version {
          font-size: 9px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.2);
          letter-spacing: 0.05em;
          font-family: 'Inter', monospace, sans-serif;
        }

        /* === Demo Section === */
        .login-demo-section {
          width: 100%;
          margin-top: 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          animation: fadeSlideUp 0.5s ease 0.3s forwards;
          opacity: 0;
        }
        .login-demo-title {
          font-size: 9px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.3);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .login-demo-buttons {
          display: flex;
          gap: 10px;
        }
        .login-demo-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          font-size: 10px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.1em;
          transition: all 0.25s ease;
        }
        .login-demo-pill:hover {
          transform: translateY(-2px);
        }

        /* Admin pill - dark/charcoal */
        .login-demo-pill--admin {
          background: #1a1e26;
          color: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        .login-demo-pill--admin:hover {
          background: #252a34;
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }

        /* Manager pill - red */
        .login-demo-pill--manager {
          background: #CE132D;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 2px 12px rgba(206, 19, 45, 0.3);
        }
        .login-demo-pill--manager:hover {
          background: #e0152f;
          box-shadow: 0 4px 20px rgba(206, 19, 45, 0.45);
        }

        /* Nutzer pill - amber/gold */
        .login-demo-pill--nutzer {
          background: #d4a017;
          color: #1a1000;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 2px 12px rgba(212, 160, 23, 0.3);
        }
        .login-demo-pill--nutzer:hover {
          background: #e6b020;
          box-shadow: 0 4px 20px rgba(212, 160, 23, 0.45);
        }

        /* === Footer === */
        .login-footer {
          width: 100%;
          margin-top: 48px;
          text-align: center;
          animation: fadeSlideUp 0.5s ease 0.4s forwards;
          opacity: 0;
        }
        .login-footer-notice {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.2);
          margin-bottom: 12px;
          letter-spacing: 0.02em;
        }
        .login-footer-links {
          display: flex;
          justify-content: center;
          gap: 24px;
        }
        .login-footer-links a {
          font-size: 10px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.25);
          text-decoration: none;
          letter-spacing: 0.08em;
          transition: color 0.2s ease;
        }
        .login-footer-links a:hover {
          color: rgba(59, 169, 211, 0.7);
        }

        /* === Animations === */
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* === Responsive === */
        @media (max-width: 480px) {
          .login-container {
            padding: 24px 16px;
          }
          .login-card {
            padding: 24px 20px 16px;
            border-radius: 12px;
          }
          .login-demo-buttons {
            flex-wrap: wrap;
            justify-content: center;
          }
          .login-radar {
            width: 180px;
            height: 180px;
            top: -40px;
            right: -40px;
          }
          .login-logo {
            height: 28px;
          }
        }
      `}</style>
    </div>
  );
}
