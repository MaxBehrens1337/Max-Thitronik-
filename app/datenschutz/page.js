"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Datenschutz() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className={`legal-page ${mounted ? 'legal-page--visible' : ''}`}>
      <div className="legal-bg">
        <img src="/logIn/screen.png" alt="" className="legal-bg-image" aria-hidden="true" />
        <div className="legal-bg-vignette" />
      </div>

      <div className="legal-container">
        <Link href="/login" className="legal-back">
          <ArrowLeft size={16} />
          <span>Zurück zum Login</span>
        </Link>

        <div className="legal-card">
          <div className="legal-header">
            <div className="legal-icon"><Shield size={24} /></div>
            <h1>Datenschutzerklärung</h1>
            <p className="legal-subtitle">Informationen zur Verarbeitung Ihrer Daten auf der Thitronik Händler-Lernplattform</p>
          </div>

          <div className="legal-content">

            <div className="legal-section">
              <h2>1. Datenschutz auf einen Blick</h2>
              <p>
                Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie die Thitronik Händler-Lernplattform nutzen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
              <p>
                Diese Lernplattform ist ein geschlossener Bereich für autorisierte Thitronik-Händler. Die Nutzung setzt eine persönliche Registrierung voraus.
              </p>
            </div>

            <div className="legal-section">
              <h2>2. Verantwortliche Stelle</h2>
              <div className="legal-info-grid">
                <div className="legal-info-row"><span className="legal-info-label">Verantwortlicher</span><span>Mark Thietje, Geschäftsführer</span></div>
                <div className="legal-info-row"><span className="legal-info-label">Unternehmen</span><span>Thitronik GmbH</span></div>
                <div className="legal-info-row"><span className="legal-info-label">Anschrift</span><span>Finkenweg 9–15, 24340 Eckernförde</span></div>
                <div className="legal-info-row"><span className="legal-info-label">Telefon</span><a href="tel:+494351767440">+49 4351 76744-0</a></div>
                <div className="legal-info-row"><span className="legal-info-label">E-Mail</span><a href="mailto:kontakt@thitronik.de">kontakt@thitronik.de</a></div>
              </div>
              <div className="legal-highlight-box">
                <strong style={{ color: '#e63946' }}>Datenschutzbeauftragter:</strong><br />
                Dipl.-Ing. Karsten Dreyer<br />
                <a href="mailto:datenschutz@thitronik.de">datenschutz@thitronik.de</a>
              </div>
            </div>

            <div className="legal-section">
              <h2>3. Datenerfassung auf der Lernplattform</h2>
              
              <h3>a) Registrierungsdaten</h3>
              <p>
                Für die Nutzung der Lernplattform ist eine Registrierung erforderlich. Dabei werden folgende Daten erhoben: Name, E-Mail-Adresse, Unternehmen/Händlername, Händlernummer sowie ggf. Telefonnummer. Diese Daten sind zur Vertragsdurchführung und Bereitstellung der Lernplattform erforderlich (Art. 6 Abs. 1 lit. b DSGVO).
              </p>

              <h3>b) Nutzungsdaten / Lernfortschritt</h3>
              <p>
                Um Ihnen eine optimale Lernerfahrung zu bieten und Ihren Fortschritt zu dokumentieren, erfassen wir: absolvierte Kurse und Module, Testergebnisse und Zertifizierungen, Zeitpunkt und Dauer der Nutzung sowie den Lernfortschritt. Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an der Qualitätssicherung des Händlernetzwerks (Art. 6 Abs. 1 lit. f DSGVO).
              </p>

              <h3>c) Technische Daten</h3>
              <p>
                Beim Zugriff auf die Plattform werden automatisch technische Daten erfasst: IP-Adresse, Browser-Typ und -Version, verwendetes Betriebssystem, Referrer-URL, Datum und Uhrzeit des Zugriffs. Diese Daten sind für den technisch fehlerfreien Betrieb der Plattform erforderlich (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </div>

            <div className="legal-section">
              <h2>4. Hosting</h2>
              <p>
                Die Lernplattform wird bei der Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen gehostet. Mit Hetzner wurde ein Vertrag über Auftragsverarbeitung (AVV) geschlossen, der die Verarbeitung personenbezogener Daten nur nach Weisung und unter Einhaltung der DSGVO sicherstellt. Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </div>

            <div className="legal-section">
              <h2>5. Cookies & Tracking</h2>
              <p>
                Die Lernplattform verwendet ausschließlich technisch notwendige Cookies zur Sitzungsverwaltung und Authentifizierung. Diese Cookies sind für den Betrieb der Plattform zwingend erforderlich und können nicht deaktiviert werden. Es werden keine Marketing- oder Tracking-Cookies eingesetzt. Eine Analyse des Nutzerverhaltens zu Werbezwecken findet nicht statt.
              </p>
            </div>

            <div className="legal-section">
              <h2>6. Speicherdauer</h2>
              <p>
                Ihre Registrierungsdaten werden für die Dauer Ihrer Händlerpartnerschaft mit Thitronik gespeichert. Lernfortschritte und Zertifizierungen werden zur Dokumentation der Qualifikation aufbewahrt. Nach Beendigung der Händlerpartnerschaft werden die Daten innerhalb von 12 Monaten gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </p>
            </div>

            <div className="legal-section">
              <h2>7. Ihre Rechte</h2>
              <p>
                Sie haben jederzeit folgende Rechte: Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO), Berichtigung unrichtiger Daten (Art. 16 DSGVO), Löschung Ihrer Daten (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie ein Widerspruchsrecht gegen die Verarbeitung (Art. 21 DSGVO).
              </p>
              <p>
                Bei Anliegen zum Datenschutz wenden Sie sich bitte an unseren Datenschutzbeauftragten unter{' '}
                <a href="mailto:datenschutz@thitronik.de">datenschutz@thitronik.de</a>.
                Zudem steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
            </div>

            <div className="legal-section">
              <h2>8. Datenweitergabe</h2>
              <p>
                Eine Weitergabe Ihrer personenbezogenen Daten an Dritte erfolgt nur, soweit dies zur Vertragserfüllung erforderlich ist (z. B. Hosting-Dienstleister) oder eine gesetzliche Verpflichtung besteht. Eine Übermittlung in Drittstaaten außerhalb der EU findet nur statt, wenn angemessene Datenschutzgarantien vorliegen (z. B. EU-Standardvertragsklauseln).
              </p>
            </div>

            <div className="legal-section">
              <h2>9. Datensicherheit</h2>
              <p>
                Die Lernplattform nutzt eine SSL-/TLS-Verschlüsselung für die gesamte Datenübertragung. Der Zugang ist durch individuelle Zugangsdaten geschützt. Wir empfehlen Ihnen, Ihr Passwort regelmäßig zu ändern und nicht an Dritte weiterzugeben. Trotz sorgfältiger Sicherheitsmaßnahmen kann ein lückenloser Schutz bei der Datenübertragung im Internet nicht garantiert werden.
              </p>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .legal-page {
          min-height: 100vh; position: relative; overflow: hidden;
          opacity: 0; transition: opacity 0.6s ease;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #070d18;
        }
        .legal-page--visible { opacity: 1; }
        .legal-bg { position: fixed; inset: 0; z-index: 0; }
        .legal-bg-image { width: 100%; height: 100%; object-fit: cover; opacity: 0.2; }
        .legal-bg-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(7, 13, 24, 0.8) 70%, rgba(7, 13, 24, 0.98) 100%);
        }
        .legal-container { position: relative; z-index: 2; max-width: 720px; margin: 0 auto; padding: 40px 24px 80px; }
        .legal-back {
          display: inline-flex; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.4); font-size: 13px; font-weight: 500; text-decoration: none;
          margin-bottom: 32px; padding: 8px 16px; border-radius: 8px;
          background: rgba(206, 19, 45, 0.15); border: 1px solid rgba(206, 19, 45, 0.2);
          transition: all 0.2s ease;
        }
        .legal-back:hover { background: rgba(206, 19, 45, 0.25); color: rgba(255,255,255,0.7); }
        .legal-card {
          background: rgba(10, 19, 37, 0.75); backdrop-filter: blur(20px);
          border: 1.5px solid rgba(59, 169, 211, 0.2); border-radius: 16px;
          padding: 48px 40px;
          box-shadow: 0 0 30px rgba(59, 169, 211, 0.06), 0 0 60px rgba(7, 13, 24, 0.5);
        }
        .legal-header { text-align: center; margin-bottom: 40px; }
        .legal-icon {
          width: 56px; height: 56px; border-radius: 14px;
          background: linear-gradient(135deg, rgba(59, 169, 211, 0.2), rgba(59, 169, 211, 0.05));
          color: #3BA9D3; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
        }
        .legal-header h1 { font-size: 24px; font-weight: 700; color: #dae2fc; margin-bottom: 8px; }
        .legal-subtitle { font-size: 13px; color: rgba(255,255,255,0.35); }
        .legal-content { color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.7; }
        .legal-content a { color: #e63946; text-decoration: none; }
        .legal-content a:hover { text-decoration: underline; }
        .legal-content h3 { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.85); margin: 16px 0 8px; }
        .legal-section { margin-bottom: 32px; }
        .legal-section:last-child { margin-bottom: 0; }
        .legal-section h2 {
          font-size: 13px; font-weight: 700; color: #e63946;
          text-transform: uppercase; letter-spacing: 0.06em;
          margin-bottom: 16px;
        }
        .legal-info-grid { display: flex; flex-direction: column; }
        .legal-info-row {
          display: flex; gap: 12px; padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .legal-info-row:last-child { border-bottom: none; }
        .legal-info-label {
          min-width: 180px; color: rgba(255,255,255,0.35);
          font-size: 13px; font-weight: 500;
        }
        .legal-highlight-box {
          margin-top: 16px; padding: 16px;
          background: rgba(26, 34, 54, 0.8); border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.06);
          line-height: 1.8;
        }
        .legal-section p { margin: 0 0 12px; }
        .legal-section p:last-child { margin-bottom: 0; }
        @media (max-width: 640px) {
          .legal-card { padding: 28px 20px; }
          .legal-container { padding: 24px 16px 60px; }
          .legal-info-row { flex-direction: column; gap: 4px; }
          .legal-info-label { min-width: auto; }
        }
      `}</style>
    </div>
  );
}
