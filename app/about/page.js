"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Zap, Factory, GraduationCap, Users, Globe, ChevronRight } from 'lucide-react';

export default function AboutPage() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-visible');
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.about-animate').forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const stats = [
    { value: '2010', label: 'Gegründet' },
    { value: 'ca. 65', label: 'Mitarbeiter' },
    { value: '700+', label: 'Handelspartner' },
    { value: '100.000+', label: 'Zufriedene Kunden' },
    { value: '100%', label: 'Made in Eckernförde' },
  ];

  const timelineData = [
    { year: '2010', title: 'Gründung in Kiel', text: 'Mark Thietje gründet die Thitronik GmbH mit der Vision: intelligente Sicherheitstechnik für Campingfahrzeuge, made in Norddeutschland.' },
    { year: '2012', title: 'WiPro wird zum Standard', text: 'Die WiPro Funk-Alarmanlagen setzen sich am Markt durch und werden zum Branchenstandard für Reisemobil-Sicherheit.' },
    { year: '2015', title: 'Gaswarnsysteme & Ausbau', text: 'Das Portfolio wächst um die G.A.S.-Gaswarnsysteme. Hersteller wie Hymer, Dethleffs und Hobby setzen auf Thitronik ab Werk.' },
    { year: '2019', title: 'Umzug nach Eckernförde', text: 'Von Kiel in größere, modernere Produktionsstätten im Finkenweg. Mehr Platz für Entwicklung, Produktion und ein wachsendes Team.' },
    { year: '2020+', title: 'Smarte Ortung & Internationalisierung', text: 'Launch des Pro-finder Ortungssystems und Expansion nach Europa.' },
    { year: 'Heute', title: 'Marktführer mit ca. 65 Mitarbeitern', text: 'Über 700 Handelspartner, 100.000+ zufriedene Kunden. Inhabergeführt, familiär und bodenständig – so wie am ersten Tag.' },
  ];

  const team = [
    { name: 'Mark Thietje', role: 'Geschäftsführer & Gründer', initials: 'MT' },
    { name: 'Daniela Hierl', role: 'Geschäftsführerin', initials: 'DH' },
    { name: 'Vertriebsteam', role: 'Vertrieb & Händlerbetreuung', initials: 'VT' },
    { name: 'Technik & Entwicklung', role: 'Produktentwicklung & Produktion', initials: 'TE' },
  ];

  const partners = [
    { name: 'Hymer', logo: '/Bilder/wohnmobil-aufkleber-hymer.jpg' },
    { name: 'Dethleffs', logo: '/Bilder/dethleffs.jpg' },
    { name: 'Hobby', logo: '/Bilder/hobby.jpg' },
    { name: 'Concorde', logo: '/Bilder/concorde.JPG' },
    { name: 'Carado', logo: '/Bilder/carado.jpg' },
    { name: 'La Strada', logo: '/Bilder/la-strada_logo.jpeg' },
    { name: 'Kompanja', logo: '/Bilder/Kompanja Logo.avif' },
    { name: 'Robeta', logo: '/Bilder/robeta.webp' },
  ];

  const sustainability = [
    { icon: Zap, title: 'Nachhaltige Energie', text: 'Hauseigene PV-Anlage deckt gesamten Produktionsbedarf, vier E-Ladesäulen' },
    { icon: Factory, title: 'Regionale Fertigung', text: 'Regionale Zulieferer, kurze Transportwege' },
    { icon: GraduationCap, title: 'Ausbildung & Nachwuchs', text: 'Ausbildung in Elektronik, Büromanagement, Mediengestaltung + Werkstudenten' },
  ];

  return (
    <div className="about-page">
      {/* ── Back Button ── */}
      <div className="about-back-row">
        <Link href="/dashboard" className="btn btn-back">
          <ArrowLeft size={16} /> Zurück zum Dashboard
        </Link>
      </div>

      {/* ── 1. Hero ── */}
      <section className="about-hero about-animate">
        <div className="about-hero-bg">
          <img src="/Bilder/Firma Gelände.webp" alt="Thitronik Firmengelände in Eckernförde" />
          <div className="about-hero-overlay" />
        </div>
        <div className="about-hero-content">
          <h1 className="about-hero-title">Das sind wir. Thitronik.</h1>
          <p className="about-hero-subtitle">
            Wir lieben, was wir tun. So sehr, dass wir es Euch zeigen möchten: Wo, wie und warum unsere Technik entsteht. Damit Ihr Euch unterwegs eine schöne Zeit macht – und keine Sorgen.
          </p>
        </div>
        <div className="about-stats-bar">
          {stats.map((s, i) => (
            <div className="about-stat" key={i}>
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. Philosophie ── */}
      <section className="about-section">
        <div className="about-section-header about-animate">
          <span className="about-section-tag">Philosophie</span>
          <h2>Mit Sicherheit besser</h2>
        </div>

        {/* Block 1 – Kompromisslos */}
        <div className="about-philo-block about-animate">
          <div className="about-philo-img">
            <img src="/Bilder/Wir sind Kompromislos.jpg" alt="Thitronik Produktion – Kompromisslose Qualität" />
          </div>
          <div className="about-philo-text">
            <h3>Wir sind kompromisslos</h3>
            <p>
              Wenn es um die Handhabung und Sicherheit unserer Produkte geht, machen wir keine halben Sachen. Wir entwickeln intelligente, modulare Sicherheitssysteme, die wir mit kompromissloser Zielgenauigkeit auf die Ansprüche unserer Kunden zuschneiden. Jedes einzelne Produkt wird hier vor Ort in Eckernförde entwickelt, getestet und produziert.
            </p>
          </div>
        </div>

        {/* Block 2 – Heimatverbunden (reversed) */}
        <div className="about-philo-block about-philo-block--reverse about-animate">
          <div className="about-philo-img">
            <img src="/Bilder/philospohie-heimatverbunden.webp" alt="Ostseestrand in Schleswig-Holstein" />
          </div>
          <div className="about-philo-text">
            <h3>Wir sind heimatverbunden</h3>
            <p>
              Und weltoffen. Aktuell weiten wir unseren Kunden- und Händlerkreis auf das europäische Ausland aus. Unser Ankerpunkt ist und bleibt aber der echte Norden. Hier wurde Thitronik 2010 gegründet. 2019 zogen wir von Kiel nach Eckernförde, in größere und modernere Produktionsstätten. Sicherheit „made in Eckernförde" – das ist unser Versprechen.
            </p>
          </div>
        </div>

        {/* Block 3 – Techies */}
        <div className="about-philo-block about-animate">
          <div className="about-philo-img">
            <img src="/Bilder/Wir sind Techies.jpg" alt="Techniker beim Löten im Thitronik-Labor" />
          </div>
          <div className="about-philo-text">
            <h3>Wir sind Techies</h3>
            <p>
              Die ihr Handwerk lieben. Unsere Arbeitsprozesse gestalten wir effizient – mit modernster Produktions- und Entwicklungstechnologie und 3D-Druckern für das Prototyping. So konzentrieren wir uns auf das, was wir am liebsten machen: Wir entwickeln, testen und bauen Technik, die einfach ein gutes Gefühl gibt.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Timeline ── */}
      <section className="about-section about-section--alt">
        <div className="about-section-header about-animate">
          <span className="about-section-tag">Geschichte</span>
          <h2>Vom Tüftler zum Marktführer</h2>
        </div>
        <div className="about-timeline">
          {timelineData.map((item, i) => (
            <div className="about-timeline-item about-animate" key={i}>
              <div className="about-timeline-dot" />
              <div className="about-timeline-card card card-hover">
                <div className="card-body">
                  <span className="about-timeline-year">{item.year}</span>
                  <h3 className="about-timeline-title">{item.title}</h3>
                  <p className="about-timeline-text">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Team ── */}
      <section className="about-section">
        <div className="about-section-header about-animate">
          <span className="about-section-tag">Team</span>
          <h2>Die Menschen hinter Thitronik</h2>
        </div>
        <div className="about-team-grid">
          {team.map((t, i) => (
            <div className="about-team-card card card-hover about-animate" key={i}>
              <div className="card-body">
                <div className="about-team-avatar">
                  <span>{t.initials}</span>
                </div>
                <h3>{t.name}</h3>
                <p>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Partner ── */}
      <section className="about-section about-section--alt">
        <div className="about-section-header about-animate">
          <span className="about-section-tag">Partner</span>
          <h2>Diese Marken setzen auf Thitronik</h2>
        </div>
        <div className="about-partners-grid about-animate">
          {partners.map((p, i) => (
            <div className="about-partner-logo-card" key={i}>
              <img src={p.logo} alt={`${p.name} Logo`} />
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Standort ── */}
      <section className="about-section">
        <div className="about-section-header about-animate">
          <span className="about-section-tag">Standort</span>
          <h2>Eckernförde – Zuhause an der Ostsee</h2>
        </div>
        <div className="about-location about-animate">
          <div className="about-location-img">
            <img src="/Bilder/Eckernförde Wallpaper.jpg" alt="Eckernförde an der Ostsee" />
          </div>
          <div className="about-location-details">
            <div className="about-location-item">
              <MapPin size={20} />
              <div>
                <strong>Adresse</strong>
                <span>Finkenweg 9–15, 24340 Eckernförde</span>
              </div>
            </div>
            <div className="about-location-item">
              <Users size={20} />
              <div>
                <strong>Team</strong>
                <span>Ca. 65 Mitarbeiter, inhabergeführt</span>
              </div>
            </div>
            <div className="about-location-item">
              <Globe size={20} />
              <div>
                <strong>Reichweite</strong>
                <span>Europaweiter Vertrieb über den Fachhandel</span>
              </div>
            </div>
            <div className="about-location-item">
              <Zap size={20} />
              <div>
                <strong>Energie</strong>
                <span>Eigene Photovoltaik-Anlage & E-Ladesäulen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Nachhaltigkeit ── */}
      <section className="about-section about-section--alt">
        <div className="about-section-header about-animate">
          <span className="about-section-tag">Nachhaltigkeit</span>
          <h2>Wir denken an die Zukunft</h2>
        </div>
        <div className="about-sustain-grid">
          {sustainability.map((s, i) => (
            <div className="about-sustain-card card card-hover about-animate" key={i}>
              <div className="card-body">
                <div className="about-sustain-icon">
                  <s.icon size={24} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. CTA ── */}
      <section className="about-cta about-animate">
        <div className="about-cta-inner">
          <h2>Bereit, uns kennenzulernen?</h2>
          <p>Starte jetzt mit Deiner Schulung auf der Thitronik Lernplattform.</p>
          <Link href="/dashboard" className="btn btn-primary about-cta-btn">
            Zum Dashboard <ChevronRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
