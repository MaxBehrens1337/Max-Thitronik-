"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Lock, Mail, AlertCircle, GraduationCap, ShieldCheck, Smartphone, ChevronRight, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('admin@thitronik.de');
  const [password, setPassword] = useState('admin123');
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
    }, 600);
  };

  const features = [
    {
      icon: <GraduationCap size={22} />,
      title: 'Fachwissen aufbauen',
      desc: 'Umfassende Kurse zu allen THITRONIK Systemen'
    },
    {
      icon: <ShieldCheck size={22} />,
      title: 'Zertifizierung',
      desc: 'Werden Sie offizieller THITRONIK Partner'
    },
    {
      icon: <Smartphone size={22} />,
      title: 'Flexibel lernen',
      desc: 'Auf allen Geräten jederzeit verfügbar'
    }
  ];

  return (
    <div className={`login-page ${mounted ? 'login-page--visible' : ''}`}>
      {/* Animated background */}
      <div className="login-bg">
        <div className="login-bg-orb login-bg-orb--1" />
        <div className="login-bg-orb login-bg-orb--2" />
        <div className="login-bg-orb login-bg-orb--3" />
        <div className="login-bg-grid" />
      </div>

      <div className="login-wrapper">
        {/* Left Side: Branding & Features */}
        <div className="login-hero">
          <div className="login-hero-content">
            <div className="login-logo-area">
              <img 
                src="/logo.png" 
                alt="THITRONIK Logo" 
                className="login-logo"
              />
              <div className="login-logo-divider" />
              <span className="login-logo-label">Lernplattform</span>
            </div>

            <h1 className="login-hero-title">
              Willkommen bei der<br />
              <span className="login-hero-highlight">THITRONIK UNI</span>
            </h1>
            <p className="login-hero-subtitle">
              Die zentrale Schulungsplattform für Monteure, Partner und Mitarbeiter. 
              Lernen Sie alle Systeme kennen und werden Sie zertifizierter Experte.
            </p>

            <div className="login-features-list">
              {features.map((f, i) => (
                <div 
                  key={i} 
                  className="login-feature-item"
                  style={{ animationDelay: `${300 + i * 100}ms` }}
                >
                  <div className="login-feature-icon-wrap">
                    {f.icon}
                  </div>
                  <div className="login-feature-text">
                    <strong>{f.title}</strong>
                    <span>{f.desc}</span>
                  </div>
                  <ChevronRight size={16} className="login-feature-arrow" />
                </div>
              ))}
            </div>
          </div>

          <div className="login-hero-footer">
            <span>© {new Date().getFullYear()} THITRONIK GmbH</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="login-form-side">
          <div className="login-form-container">
            <div className="login-form-card">
              <div className="login-form-header">
                <div className="login-form-icon">
                  <Lock size={24} />
                </div>
                <h2>Anmelden</h2>
                <p>Bitte melden Sie sich mit Ihren Zugangsdaten an.</p>
              </div>

              <form onSubmit={handleLogin} className="login-form">
                {error && (
                  <div className="login-error animate-fade-in-up">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <div className="login-field">
                  <label htmlFor="login-email">E-Mail Adresse</label>
                  <div className="login-input-wrap">
                    <Mail size={18} className="login-input-icon" />
                    <input 
                      id="login-email"
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ihre.email@beispiel.de"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="login-field">
                  <div className="login-field-header">
                    <label htmlFor="login-password">Passwort</label>
                    <a href="#" className="login-forgot" tabIndex={-1}>Vergessen?</a>
                  </div>
                  <div className="login-input-wrap">
                    <Lock size={18} className="login-input-icon" />
                    <input 
                      id="login-password"
                      type={showPassword ? 'text' : 'password'} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                    />
                    <button 
                      type="button" 
                      className="login-toggle-pw"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                      Wird angemeldet…
                    </>
                  ) : (
                    <>
                      Anmelden
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <div className="login-demo">
                <div className="login-demo-label">
                  <span>Demo-Zugänge</span>
                </div>
                <div className="login-demo-accounts">
                  <button type="button" className="login-demo-btn" onClick={() => { setEmail('admin@thitronik.de'); setPassword('admin123'); }}>
                    <div className="login-demo-avatar login-demo-avatar--admin">A</div>
                    <div className="login-demo-info">
                      <strong>Administrator</strong>
                      <span>admin@thitronik.de</span>
                    </div>
                  </button>
                  <button type="button" className="login-demo-btn" onClick={() => { setEmail('trainer@thitronik.de'); setPassword('trainer123'); }}>
                    <div className="login-demo-avatar login-demo-avatar--trainer">T</div>
                    <div className="login-demo-info">
                      <strong>Trainer</strong>
                      <span>trainer@thitronik.de</span>
                    </div>
                  </button>
                  <button type="button" className="login-demo-btn" onClick={() => { setEmail('monteur@thitronik.de'); setPassword('monteur123'); }}>
                    <div className="login-demo-avatar login-demo-avatar--learner">M</div>
                    <div className="login-demo-info">
                      <strong>Monteur</strong>
                      <span>monteur@thitronik.de</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ============================================
           Login Page — Premium Redesign
           ============================================ */
        
        .login-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        .login-page--visible {
          opacity: 1;
        }

        /* === Animated Background === */
        .login-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: #020617;
        }
        .login-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: orbFloat 20s ease-in-out infinite;
        }
        .login-bg-orb--1 {
          width: 600px;
          height: 600px;
          background: rgba(29, 54, 97, 0.4);
          top: -10%;
          right: -5%;
          animation-duration: 25s;
        }
        .login-bg-orb--2 {
          width: 500px;
          height: 500px;
          background: rgba(59, 169, 211, 0.15);
          bottom: -15%;
          left: -10%;
          animation-duration: 30s;
          animation-delay: -5s;
        }
        .login-bg-orb--3 {
          width: 300px;
          height: 300px;
          background: rgba(175, 202, 5, 0.1);
          top: 50%;
          left: 40%;
          animation-duration: 22s;
          animation-delay: -10s;
        }
        .login-bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.05); }
          50% { transform: translate(-20px, 30px) scale(0.95); }
          75% { transform: translate(15px, 15px) scale(1.02); }
        }

        /* === Layout Wrapper === */
        .login-wrapper {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 48px 24px;
          max-width: 1100px;
          margin: 0 auto;
          gap: 48px;
        }

        /* === Left Hero Side === */
        .login-hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          max-width: 520px;
        }
        .login-hero-content {
          max-width: 520px;
        }
        
        /* Logo Area */
        .login-logo-area {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 48px;
          animation: fadeSlideIn 0.6s ease forwards;
          opacity: 0;
        }
        .login-logo {
          height: 48px;
          width: auto;
          object-fit: contain;
        }
        .login-logo-divider {
          width: 1px;
          height: 32px;
          background: rgba(255,255,255,0.2);
        }
        .login-logo-label {
          font-size: 16px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.02em;
        }

        /* Hero Title */
        .login-hero-title {
          font-size: 42px;
          font-weight: 800;
          line-height: 1.15;
          color: #f8fafc;
          margin-bottom: 20px;
          animation: fadeSlideIn 0.6s ease 0.1s forwards;
          opacity: 0;
        }
        .login-hero-highlight {
          background: linear-gradient(135deg, var(--th-blue-secondary), var(--th-accent-lime));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .login-hero-subtitle {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
          max-width: 440px;
          margin-bottom: 48px;
          animation: fadeSlideIn 0.6s ease 0.2s forwards;
          opacity: 0;
        }

        /* Features */
        .login-features-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .login-feature-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          transition: all 0.2s ease;
          animation: fadeSlideIn 0.5s ease forwards;
          opacity: 0;
          cursor: default;
        }
        .login-feature-item:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(59, 169, 211, 0.2);
          transform: translateX(4px);
        }
        .login-feature-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(59, 169, 211, 0.15), rgba(59, 169, 211, 0.05));
          color: var(--th-blue-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .login-feature-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .login-feature-text strong {
          font-size: 14px;
          font-weight: 600;
          color: #f0f4f8;
        }
        .login-feature-text span {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
        }
        .login-feature-arrow {
          color: rgba(255,255,255,0.15);
          transition: all 0.2s ease;
        }
        .login-feature-item:hover .login-feature-arrow {
          color: var(--th-blue-secondary);
          transform: translateX(2px);
        }

        /* Hero Footer */
        .login-hero-footer {
          color: rgba(255,255,255,0.25);
          font-size: 12px;
          animation: fadeSlideIn 0.6s ease 0.5s forwards;
          opacity: 0;
        }

        /* === Right Form Side === */
        .login-form-side {
          flex: 0 0 auto;
          width: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-form-container {
          width: 100%;
          animation: fadeScaleIn 0.5s ease 0.2s forwards;
          opacity: 0;
        }

        /* Form Card */
        .login-form-card {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 40px 32px;
          box-shadow: 
            0 0 0 1px rgba(255,255,255,0.05),
            0 20px 60px rgba(0,0,0,0.4);
        }

        /* Form Header */
        .login-form-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .login-form-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--th-blue-secondary), rgba(59, 169, 211, 0.6));
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          box-shadow: 0 8px 24px rgba(59, 169, 211, 0.25);
        }
        .login-form-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 6px;
        }
        .login-form-header p {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
        }

        /* Form Fields */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .login-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .login-field label {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
        }
        .login-field-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .login-forgot {
          font-size: 12px;
          color: var(--th-blue-secondary);
          opacity: 0.8;
          transition: opacity 0.15s ease;
        }
        .login-forgot:hover {
          opacity: 1;
          text-decoration: underline;
        }
        .login-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .login-input-icon {
          position: absolute;
          left: 14px;
          color: rgba(255,255,255,0.25);
          pointer-events: none;
          transition: color 0.15s ease;
        }
        .login-input-wrap input {
          width: 100%;
          padding: 14px 14px 14px 44px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: #f8fafc;
          font-size: 15px;
          font-family: inherit;
          transition: all 0.2s ease;
        }
        .login-input-wrap input::placeholder {
          color: rgba(255,255,255,0.2);
        }
        .login-input-wrap input:focus {
          outline: none;
          border-color: var(--th-blue-secondary);
          background: rgba(59, 169, 211, 0.06);
          box-shadow: 0 0 0 3px rgba(59, 169, 211, 0.12);
        }
        .login-input-wrap:focus-within .login-input-icon {
          color: var(--th-blue-secondary);
        }
        .login-toggle-pw {
          position: absolute;
          right: 12px;
          padding: 4px;
          color: rgba(255,255,255,0.25);
          transition: color 0.15s ease;
          cursor: pointer;
          background: none;
          border: none;
        }
        .login-toggle-pw:hover {
          color: rgba(255,255,255,0.6);
        }

        /* Submit Button */
        .login-submit {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, var(--th-blue-secondary), #2b8fb3);
          color: white;
          font-size: 15px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
          margin-top: 4px;
          box-shadow: 0 4px 16px rgba(59, 169, 211, 0.25);
        }
        .login-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(59, 169, 211, 0.35);
          background: linear-gradient(135deg, #43b5db, var(--th-blue-secondary));
        }
        .login-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .login-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Spinner */
        .login-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        /* Error Alert */
        .login-error {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(220, 38, 38, 0.12);
          border: 1px solid rgba(220, 38, 38, 0.2);
          border-radius: 10px;
          color: #f87171;
          font-size: 13px;
          font-weight: 500;
        }

        /* Demo Accounts */
        .login-demo {
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .login-demo-label {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .login-demo-label span {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.3);
          padding: 0 12px;
          background: rgba(15, 23, 42, 0.7);
          position: relative;
          z-index: 1;
        }
        .login-demo-accounts {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .login-demo-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          text-align: left;
          font-family: inherit;
          color: inherit;
        }
        .login-demo-btn:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.1);
        }
        .login-demo-avatar {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
          color: white;
          flex-shrink: 0;
        }
        .login-demo-avatar--admin {
          background: linear-gradient(135deg, var(--th-blue-primary), var(--th-blue-secondary));
        }
        .login-demo-avatar--trainer {
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
        }
        .login-demo-avatar--learner {
          background: linear-gradient(135deg, #0d9488, #5eead4);
        }
        .login-demo-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .login-demo-info strong {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
        }
        .login-demo-info span {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
        }

        /* === Animations === */
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* === Responsive === */
        @media (max-width: 1024px) {
          .login-wrapper {
            flex-direction: column;
            padding: 40px 24px;
            gap: 32px;
          }
          .login-hero {
            max-width: 100%;
          }
          .login-hero-title {
            font-size: 32px;
          }
          .login-hero-subtitle {
            margin-bottom: 32px;
          }
          .login-form-side {
            flex: none;
            width: 100%;
            max-width: 480px;
          }
        }
        @media (max-width: 640px) {
          .login-wrapper {
            padding: 24px 20px;
          }
          .login-hero-title {
            font-size: 26px;
          }
          .login-hero-subtitle {
            display: none;
          }
          .login-features-list {
            display: none;
          }
          .login-form-card {
            padding: 28px 24px;
          }
          .login-logo-area {
            margin-bottom: 24px;
          }
        }
      `}</style>
    </div>
  );
}
