"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function Impressum() {
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
            <div className="legal-icon"><Building2 size={24} /></div>
            <h1>Impressum</h1>
            <p className="legal-subtitle">Angaben gemäß § 5 TMG</p>
          </div>

          <div className="legal-content">

            <div className="legal-section">
              <h2>Unternehmen</h2>
              <div className="legal-info-grid">
                <div className="legal-info-row"><span className="legal-info-label">Firma</span><span>Thitronik GmbH</span></div>
                <div className="legal-info-row"><span className="legal-info-label">Geschäftsführer</span><span>Mark Thietje</span></div>
                <div className="legal-info-row"><span className="legal-info-label">Anschrift</span><span>Finkenweg 9–15, 24340 Eckernförde</span></div>
                <div className="legal-info-row"><span className="legal-info-label">Telefon (Zentrale)</span><a href="tel:+494351767440">+49 4351 76744-0</a></div>
                <div className="legal-info-row"><span className="legal-info-label">Telefon (Support)</span><a href="tel:+49435176744112">+49 4351 76744-112</a></div>
                <div className="legal-info-row"><span className="legal-info-label">E-Mail</span><a href="mailto:kontakt@thitronik.de">kontakt@thitronik.de</a></div>
              </div>
            </div>

            <div className="legal-section">
              <h2>Registereintrag</h2>
              <div className="legal-info-grid">
                <div className="legal-info-row"><span className="legal-info-label">Registergericht</span><span>Amtsgericht Kiel</span></div>
                <div className="legal-info-row"><span className="legal-info-label">Handelsregister-Nr.</span><span>HRB 11453 KI</span></div>
                <div className="legal-info-row"><span className="legal-info-label">USt-IdNr.</span><span>DE268454642</span></div>
                <div className="legal-info-row"><span className="legal-info-label">WEEE Reg.-Nr.</span><span>DE33826840</span></div>
              </div>
            </div>

            <div className="legal-section">
              <h2>Berufshaftpflichtversicherung</h2>
              <p>
                <strong>Versicherer:</strong> CARSTEN A. HÖNEISE e.K. – Generalvertretung<br />
                Zweiter Steg 4, 24340 Eckernförde<br />
                <span style={{ opacity: 0.6 }}>Geltungsraum: weltweit (ausgenommen USA, Kanada und US-Territorien)</span>
              </p>
            </div>

            <div className="legal-section">
              <h2>Streitbeilegung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p>
                Die Thitronik GmbH ist nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div className="legal-section">
              <h2>Urheberrecht</h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf dieser Plattform unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
            </div>

            <div className="legal-section">
              <h2>Hinweis zur Lernplattform</h2>
              <p>
                Diese digitale Lernplattform richtet sich ausschließlich an autorisierte Thitronik-Händler und deren Mitarbeiter. Die bereitgestellten Schulungsinhalte, Produktinformationen und Materialien sind vertraulich und dürfen nicht an Dritte weitergegeben werden. Der Zugang wird über individuelle Zugangsdaten geregelt, die personengebunden und nicht übertragbar sind.
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
          text-transform: uppercase; letter-spacing: 0.06em;
          margin-bottom: 16px; font-family: 'Inter', sans-serif;
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
