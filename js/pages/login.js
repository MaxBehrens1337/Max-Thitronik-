// ============================================
// THITRONIK Login Page
// ============================================

import { Auth } from '../auth.js';
import { showToast, Icons } from '../components.js';

export function renderLogin() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="login-page">
      <div class="login-container">
        <div class="login-branding">
          <div class="login-branding-content animate-fade-in-up">
            <div class="login-brand-logo">
              <svg class="logo-segel" width="56" height="56" viewBox="0 0 100 100">
                <polygon points="50,5 95,95 5,95" fill="#CE132D"/>
                <polygon points="50,20 82,85 18,85" fill="#1D3661"/>
              </svg>
              <div>
                <div class="login-brand-name">THITRONIK</div>
                <div class="login-brand-sub">Lernplattform</div>
              </div>
            </div>
            <h1 class="login-tagline">Wissen aufbauen.<br><span>Sicherheit</span> stärken.</h1>
            <p class="login-description">
              Ihre zentrale Schulungsplattform für THITRONIK Produkte. 
              Erlernen Sie alles über Installation, Konfiguration und Fehlersuche.
            </p>
            <div class="login-features">
              <div class="login-feature">
                <div class="login-feature-icon">📚</div>
                <span>13+ Schulungsmodule für alle Produktbereiche</span>
              </div>
              <div class="login-feature">
                <div class="login-feature-icon">✅</div>
                <span>Interaktive Quizfragen zur Wissensüberprüfung</span>
              </div>
              <div class="login-feature">
                <div class="login-feature-icon">📊</div>
                <span>Persönlicher Lernfortschritt und Zertifikate</span>
              </div>
            </div>
          </div>
        </div>
        <div class="login-form-side">
          <div class="login-card animate-scale-in">
            <h2 class="login-card-title">Anmelden</h2>
            <p class="login-card-subtitle">Melden Sie sich mit Ihren Zugangsdaten an.</p>
            <form id="login-form">
              <div class="form-group">
                <label class="form-label" for="login-email">E-Mail-Adresse</label>
                <input class="form-input" type="email" id="login-email" placeholder="name@thitronik.de" required autocomplete="email" value="admin@thitronik.de">
              </div>
              <div class="form-group">
                <label class="form-label" for="login-password">Passwort</label>
                <input class="form-input" type="password" id="login-password" placeholder="Passwort eingeben" required autocomplete="current-password" value="admin123">
              </div>
              <div class="login-remember-row">
                <label><input type="checkbox" checked> Angemeldet bleiben</label>
                <a href="#" class="text-secondary">Passwort vergessen?</a>
              </div>
              <button type="submit" class="btn btn-primary btn-lg" id="login-submit">Anmelden</button>
            </form>
            <div class="login-footer">
              <p>Demo-Zugänge: admin@thitronik.de / admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const result = Auth.login(email, password);
    if (result.success) {
      showToast(`Willkommen, ${result.user.firstName}!`, 'success');
      window.location.hash = '/dashboard';
    } else {
      showToast(result.error, 'error');
    }
  });
}
