"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('admin@thitronik.de');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { Auth } = useAuth();

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
    }, 600); // Simulate network delay
  };

  return (
    <div className="login-container">
      <div className="login-sidebar" style={{ background: 'var(--bg-card)' }}>
        <div className="login-brand">
          <img 
            src="/logo.png" 
            alt="THITRONIK Logo" 
            style={{ maxWidth: '280px', height: 'auto', marginBottom: 'var(--sp-6)' }} 
          />
          <h2 className="login-subtitle" style={{ color: 'var(--th-blue-primary)', fontWeight: '600' }}>Lernplattform</h2>
          
          <div className="login-features">
            <div className="feature">
              <div className="feature-icon">🎓</div>
              <div>
                <strong>Fachwissen aufbauen</strong>
                <p>Umfassende Kurse zu allen Systemen</p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">🛡️</div>
              <div>
                <strong>Zertifizierung</strong>
                <p>Werden Sie offizieller Partner</p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">📱</div>
              <div>
                <strong>Flexibel lernen</strong>
                <p>Auf allen Geräten jederzeit verfügbar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="login-content">
        <div className="login-form-wrapper">
          <div className="login-header">
            <h3>System Login</h3>
            <p>Bitte melden Sie sich an, um fortzufahren.</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {error && (
              <div className="error-alert animate-fade-in-up">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label className="label">E-Mail Adresse</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  className="input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ihre.email@beispiel.de"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="label">Passwort</label>
                <a href="#" className="forgot-password">Passwort vergessen?</a>
              </div>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  className="input" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary login-btn" disabled={isLoading}>
              {isLoading ? 'Wird angemeldet...' : 'Anmelden'}
            </button>
          </form>

          <div className="demo-credentials">
            <h4>Demo Zugangsdaten:</h4>
            <ul>
              <li><strong>Admin:</strong> admin@thitronik.de / admin123</li>
              <li><strong>Trainer:</strong> trainer@thitronik.de / trainer123</li>
              <li><strong>Lernender:</strong> monteur@thitronik.de / monteur123</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-container { display: flex; min-height: 100vh; background: var(--bg-page); }
        .login-sidebar { 
          flex: 1; 
          background: linear-gradient(135deg, var(--th-blue-primary), var(--th-blue-primary-dark));
          color: white; 
          padding: var(--sp-12); 
          display: flex; 
          flex-direction: column; 
          justify-content: center;
        }
        .login-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--sp-6);
        }
        .login-brand { max-width: 400px; margin: 0 auto; }
        .login-title { font-size: 48px; font-weight: 800; letter-spacing: 1px; margin-bottom: 0; color: white; }
        .login-subtitle { font-size: 24px; font-weight: 400; opacity: 0.8; margin-bottom: var(--sp-12); color: white; }
        
        .login-features { display: flex; flex-direction: column; gap: var(--sp-6); }
        .feature { display: flex; gap: var(--sp-4); align-items: flex-start; }
        .feature-icon { font-size: 24px; background: rgba(255,255,255,0.1); width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; }
        .feature strong { font-size: var(--fs-body-lg); display: block; margin-bottom: 4px; }
        .feature p { opacity: 0.8; font-size: var(--fs-body-sm); margin: 0; }
        
        .login-form-wrapper { width: 100%; max-width: 400px; }
        .login-header { margin-bottom: var(--sp-8); }
        .login-header h3 { font-size: var(--fs-h2); margin-bottom: var(--sp-2); }
        .login-header p { color: var(--text-secondary); }
        
        .login-form { display: flex; flex-direction: column; gap: var(--sp-4); }
        .form-group { display: flex; flex-direction: column; }
        .input-with-icon { position: relative; }
        .input-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); }
        .input-with-icon .input { padding-left: 40px; }
        
        .forgot-password { font-size: var(--fs-caption); color: var(--th-blue-secondary); }
        .forgot-password:hover { text-decoration: underline; }
        
        .login-btn { width: 100%; padding: var(--sp-4); font-size: var(--fs-body-lg); margin-top: var(--sp-4); }
        
        .error-alert { 
          background: var(--color-error-bg); 
          color: var(--color-error); 
          padding: var(--sp-3); 
          border-radius: var(--radius-md); 
          display: flex; 
          align-items: center; 
          gap: var(--sp-2); 
          font-size: var(--fs-body-sm);
        }
        
        .demo-credentials {
          margin-top: var(--sp-8);
          padding: var(--sp-4);
          background: var(--gray-soft);
          border-radius: var(--radius-md);
          font-size: var(--fs-caption);
        }
        .demo-credentials h4 { margin-bottom: var(--sp-2); color: var(--text-secondary); }
        .demo-credentials ul { padding-left: var(--sp-4); color: var(--text-tertiary); list-style-type: disc; }
        .demo-credentials li { margin-bottom: 4px; }

        @media (max-width: 800px) {
          .login-container { flex-direction: column; }
          .login-sidebar { padding: var(--sp-8) var(--sp-4); min-height: 300px; }
        }
      `}</style>
    </div>
  );
}
