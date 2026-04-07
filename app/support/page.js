"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Headphones, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  { q: "Wie erhalte ich Zugang zur Lernplattform?", a: "Als autorisierter Thitronik-Händler erhalten Sie Ihre Zugangsdaten per E-Mail von Ihrem zuständigen Thitronik-Ansprechpartner. Falls Sie noch keine Zugangsdaten erhalten haben, wenden Sie sich bitte an kontakt@thitronik.de." },
  { q: "Ich habe mein Passwort vergessen – was tun?", a: 'Nutzen Sie die „Passwort vergessen“-Funktion auf der Login-Seite. Sie erhalten eine E-Mail mit einem Link zur Passwortrücksetzung. Prüfen Sie ggf. Ihren Spam-Ordner.' },
  { q: "Kann ich die Lernplattform auf mobilen Geräten nutzen?", a: "Ja, die Lernplattform ist responsiv gestaltet und kann auf Smartphones und Tablets genutzt werden. Wir empfehlen für die beste Lernerfahrung jedoch einen Desktop-Browser." },
  { q: "Wie erhalte ich mein Zertifikat nach Kursabschluss?", a: "Nach erfolgreichem Abschluss eines Kurses und Bestehen des Abschlusstests wird Ihr Zertifikat automatisch in Ihrem Profil hinterlegt. Sie können es dort jederzeit herunterladen und ausdrucken." },
  { q: "Können mehrere Mitarbeiter meines Unternehmens die Plattform nutzen?", a: "Ja, jeder Mitarbeiter erhält einen eigenen, personalisierten Zugang. Bitte kontaktieren Sie uns, um weitere Zugänge für Ihre Mitarbeiter anzufordern." },
  { q: "Welche Browser werden unterstützt?", a: "Wir empfehlen aktuelle Versionen von Google Chrome, Mozilla Firefox, Microsoft Edge oder Safari. Für ältere Browser-Versionen können wir keine volle Funktionalität garantieren." },
];

export default function Support() {
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
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
            <div className="legal-icon"><Headphones size={24} /></div>
            <h1>Support</h1>
            <p className="legal-subtitle">Hilfe & Kontakt für die Thitronik Händler-Lernplattform</p>
          </div>

          <div className="legal-content">

            {/* Contact Cards */}
            <div className="support-contact-grid">
              <div className="support-contact-card">
                <div className="support-contact-icon">📞</div>
                <div className="support-contact-label">Telefon-Support</div>
                <a href="tel:+49435176744112" className="support-contact-value">+49 4351 76744-112</a>
                <div className="support-contact-desc">Mo–Fr, 8:00–17:00 Uhr</div>
              </div>
              <div className="support-contact-card">
                <div className="support-contact-icon">✉️</div>
                <div className="support-contact-label">E-Mail-Support</div>
                <a href="mailto:kontakt@thitronik.de" className="support-contact-value">kontakt@thitronik.de</a>
                <div className="support-contact-desc">Antwort innerhalb von 24h</div>
              </div>
              <div className="support-contact-card">
                <div className="support-contact-icon">🏢</div>
                <div className="support-contact-label">Vor-Ort-Service</div>
                <div className="support-contact-value" style={{ color: 'rgba(255,255,255,0.7)' }}>Finkenweg 9–15, Eckernförde</div>
                <div className="support-contact-desc">Nur nach Terminvereinbarung</div>
              </div>
            </div>

            {/* FAQ */}
            <div className="legal-section">
              <h2>Häufig gestellte Fragen (FAQ)</h2>
              <div className="support-faq-list">
                {faqs.map((faq, i) => (
                  <div key={i} className="support-faq-item">
                    <button
                      className="support-faq-toggle"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                    >
                      <span>{faq.q}</span>
                      <span className={`support-faq-chevron ${openFaq === i ? 'support-faq-chevron--open' : ''}`}>
                        <ChevronDown size={18} />
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="support-faq-answer">{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="legal-section">
              <h2>Technische Probleme?</h2>
              <p>Sollten Sie technische Schwierigkeiten mit der Lernplattform haben, helfen Ihnen folgende Schritte häufig weiter:</p>

              <div className="support-tips">
                <div className="support-tip">
                  <div className="support-tip-num">1</div>
                  <span>Browser-Cache und Cookies löschen, dann die Seite neu laden.</span>
                </div>
                <div className="support-tip">
                  <div className="support-tip-num">2</div>
                  <span>Stellen Sie sicher, dass Sie eine aktuelle Browser-Version verwenden.</span>
                </div>
                <div className="support-tip">
                  <div className="support-tip-num">3</div>
                  <span>Deaktivieren Sie ggf. Werbeblocker oder VPN-Verbindungen.</span>
                </div>
                <div className="support-tip">
                  <div className="support-tip-num">4</div>
                  <span>Versuchen Sie den Zugang über ein anderes Gerät oder Netzwerk.</span>
                </div>
              </div>

              <p style={{ marginTop: 16, color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
                Besteht das Problem weiterhin? Kontaktieren Sie uns unter{' '}
                <a href="tel:+49435176744112">+49 4351 76744-112</a> oder per E-Mail an{' '}
                <a href="mailto:kontakt@thitronik.de">kontakt@thitronik.de</a>.
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
        .legal-section { margin-bottom: 32px; }
        .legal-section:last-child { margin-bottom: 0; }
        .legal-section h2 {
          font-size: 13px; font-weight: 700; color: #e63946;
          text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 16px;
        }
        .legal-section p { margin: 0 0 12px; }
        .legal-section p:last-child { margin-bottom: 0; }

        /* Contact grid */
        .support-contact-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px; margin-bottom: 40px;
        }
        .support-contact-card {
          background: rgba(17, 24, 39, 0.8); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px; padding: 20px; transition: border-color 0.2s;
        }
        .support-contact-card:hover { border-color: rgba(59, 169, 211, 0.2); }
        .support-contact-icon { font-size: 24px; margin-bottom: 10px; }
        .support-contact-label {
          font-size: 11px; color: rgba(255,255,255,0.35); font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px;
        }
        .support-contact-value { font-size: 14px; font-weight: 600; display: block; margin-bottom: 4px; }
        .support-contact-desc { font-size: 12px; color: rgba(255,255,255,0.3); }

        /* FAQ */
        .support-faq-list { display: flex; flex-direction: column; }
        .support-faq-item { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .support-faq-item:last-child { border-bottom: none; }
        .support-faq-toggle {
          width: 100%; background: none; border: none; padding: 16px 0;
          display: flex; justify-content: space-between; align-items: center;
          cursor: pointer; font-family: inherit; text-align: left;
        }
        .support-faq-toggle span:first-child {
          color: rgba(255,255,255,0.85); font-size: 14px; font-weight: 500; padding-right: 16px;
        }
        .support-faq-chevron {
          color: #e63946; transition: transform 0.2s; flex-shrink: 0;
        }
        .support-faq-chevron--open { transform: rotate(180deg); }
        .support-faq-answer {
          padding: 0 0 16px; color: rgba(255,255,255,0.45); font-size: 13px; line-height: 1.7;
        }

        /* Tips */
        .support-tips { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
        .support-tip { display: flex; align-items: flex-start; gap: 12px; }
        .support-tip-num {
          width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
          background: #e63946; display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: white;
        }
        .support-tip span { font-size: 13px; line-height: 1.6; padding-top: 4px; }

        @media (max-width: 640px) {
          .legal-card { padding: 28px 20px; }
          .legal-container { padding: 24px 16px 60px; }
          .support-contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
