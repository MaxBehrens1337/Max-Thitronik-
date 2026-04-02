<![CDATA[<p align="center">
  <img src="public/logo.png" alt="THITRONIK Logo" width="300" />
</p>

<h1 align="center">THITRONIK Lernplattform</h1>

<p align="center">
  <strong>Interne Schulungs- und Zertifizierungsplattform für THITRONIK Monteure, Partner & Mitarbeiter</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Lizenz-Proprietär-red" alt="Lizenz" />
  <img src="https://img.shields.io/badge/Sprache-Deutsch-gold" alt="Sprache" />
</p>

---

## 📋 Inhaltsverzeichnis

- [Über das Projekt](#-über-das-projekt)
- [Features](#-features)
- [Lernmodule](#-lernmodule)
- [Technologie-Stack](#-technologie-stack)
- [Architektur](#-architektur)
- [Projektstruktur](#-projektstruktur)
- [Schnellstart](#-schnellstart)
- [Demo-Zugangsdaten](#-demo-zugangsdaten)
- [Design-System](#-design-system)
- [Datenmodell](#-datenmodell)
- [Wichtige Hinweise für Entwickler](#-wichtige-hinweise-für-entwickler)
- [Roadmap](#️-roadmap)
- [Lizenz](#-lizenz)

---

## 🎯 Über das Projekt

Die **THITRONIK Lernplattform** (auch "THITRONIK UNI") ist eine webbasierte Schulungsanwendung für die interne Weiterbildung von Monteuren, Händlern und Partnern der Firma [THITRONIK](https://www.thitronik.de/) – einem führenden Hersteller von Alarmanlagen und Sicherheitssystemen für Wohnmobile und Nutzfahrzeuge.

### Zweck

Die Plattform ermöglicht es Nutzern:
- **Schulungsvideos** anzusehen (zu THITRONIK Produkten und Einbautechniken)
- **Bildbasierte Quiz-Fragen** zu beantworten (Single- & Multiple-Choice mit Bildern als Antworten)
- **Lernfortschritte** zu verfolgen und Zertifizierungen abzulegen
- Admins können **Kurse und Nutzer verwalten** sowie **Reporting-Statistiken** einsehen

### Aktueller Status

> **MVP (Minimum Viable Product)** – Die Anwendung ist ein voll funktionsfähiger Prototyp mit LocalStorage als Datenspeicher. Es ist kein Backend/Server-Datenbank vorhanden. Alle Daten werden im Browser des Nutzers gespeichert und beim ersten Laden über Seed-Daten initialisiert.

---

## ✨ Features

| Feature | Beschreibung |
|---------|-------------|
| 🔐 **Authentifizierung** | Rollen-basiertes Login (Admin, Trainer, Lernender) mit LocalStorage-Session |
| 📊 **Dashboard** | Personalisierte Übersicht mit Lernfortschritt, KPIs und letzten Aktivitäten |
| 📚 **Kursübersicht** | Alle verfügbaren Module mit Einschreibungsfunktion |
| 🎬 **Video-Lektionen** | Schulungsvideos pro Modul (Dateien nicht im Repo enthalten) |
| ❓ **Quiz Engine** | Single- und Multiple-Choice Fragen mit Bildern als Antwortoptionen |
| 📈 **Fortschrittsverfolgung** | Pro Kurs und pro Lektion mit Prozent-Berechnung |
| ⚙️ **Admin Dashboard** | Verwaltung von Kursen, Fragen, Nutzern und Reporting |
| 👤 **Profil & Einstellungen** | Profiländerung, Passwort-Änderung, Dark/Light Theme |
| 🌙 **Dark Mode** | Vollständiger Dark Mode mit `next-themes` als Standard |
| 📱 **Responsive Design** | Mobile-optimiertes Layout mit Sidebar-Navigation |

---

## 📚 Lernmodule

Die Plattform enthält **11 aktive Schulungsmodule** (Seed Data v14):

| # | Modul | Fragen | Video | Thema |
|---|-------|--------|-------|-------|
| 1 | 📋 Allgemeine Fragen | 4 | ❌ | Einbauzeiten, Status-LED, Übergabe |
| 2 | 🔌 CAN-Bus | 5 | ✅ | CAN-Bus Überwachung im Fahrzeug |
| 3 | 📱 Fahrzeugübergabe | 5 | ✅ | Korrekte Kundenübergabe nach Einbau |
| 4 | 🔧 Gelverbinder | 4 | ✅ | Verarbeitung von Gelverbindern |
| 5 | 🔍 Fehlersuche | 6 | ❌ | Einbaufehler erkennen (Multiple Choice) |
| 6 | 📡 Funkzubehör Anlernen | 5 | ✅ | Funkzubehör korrekt anlernen |
| 7 | 📚 Grundlagen | 5 | ✅ | Einbauanleitungen, Baujahr ermitteln |
| 8 | ⚙️ Konfigurator | 5 | ✅ | THITRONIK Konfigurator bedienen |
| 9 | 🧲 Magnet & Montageadapter | 5 | ✅ | Montageadapter richtig einsetzen |
| 10 | 📍 Pro-finder | 5 | ✅ | GPS-Ortungssystem installieren |
| 11 | 🛡️ WiPro | 5 | ✅ | WiPro III Zentrale montieren |

> **Hinweis:** Schulungsvideos (~800 MB) sind aus Größengründen **nicht im Repository enthalten**. Sie müssen separat in den `/public/`-Ordner gelegt werden. Siehe [Wichtige Hinweise](#-wichtige-hinweise-für-entwickler).

---

## 🛠 Technologie-Stack

| Technologie | Version | Zweck |
|------------|---------|-------|
| [Next.js](https://nextjs.org/) | 16.2.1 | React-basiertes Full-Stack Framework (App Router) |
| [React](https://react.dev/) | 19.2.4 | UI-Komponentenbibliothek |
| [Lucide React](https://lucide.dev/) | 1.7+ | Icon-System (Tree-shakeable SVG Icons) |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4.6 | Dark/Light Mode Unterstützung |
| Vanilla CSS | – | Custom Design-Token-System (CI-konform) |
| LocalStorage | – | Client-seitiger Datenspeicher (MVP) |

---

## 🏗 Architektur

```
┌──────────────────────────────────────────────────────────────┐
│                        Browser (Client)                       │
│                                                                │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │  AuthContext │  │  ThemeProvider│  │     AppLayout         │ │
│  │  (lib/auth)  │  │  (next-themes)│  │  (Header + Sidebar)  │ │
│  └──────┬──────┘  └──────────────┘  └───────────────────────┘ │
│         │                                                      │
│  ┌──────▼─────────────────────────────────────────────────┐   │
│  │                    App Router (Pages)                    │   │
│  │  /login  /dashboard  /courses  /profile  /admin         │   │
│  └──────┬──────────────────────────────────────────────────┘   │
│         │                                                      │
│  ┌──────▼──────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  API Layer  │──│ Store (Cache)│──│ localStorage (th_*)   │  │
│  │ (lib/store) │  │    + Events  │  │ Seed Data (lib/seed)  │  │
│  └─────────────┘  └──────────────┘  └──────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Architektur-Prinzipien

- **Client-Only SPA**: Alle Seiten nutzen `"use client"` – kein Server-seitiges Rendering
- **LocalStorage als "DB"**: Über den `Store`-Wrapper mit `th_`-Prefix und In-Memory-Cache
- **Seed-on-First-Load**: Beim ersten Aufruf werden Demo-Daten via `initializeSeedData()` geschrieben
- **Event-basierte Reaktivität**: `th_store_change` Custom Events für Cross-Tab-Synchronisation
- **CI-konformes Design-Token-System**: Alle Farben und Abstände als CSS Custom Properties

---

## 📂 Projektstruktur

```
thitronik-lernplattform/
├── app/                          # Next.js App Router (Pages)
│   ├── layout.js                 # Root Layout (AuthProvider, ThemeProvider, AppLayout)
│   ├── page.js                   # Root → Redirect zu /login oder /dashboard
│   ├── globals.css               # Globale Styles + Design Tokens (Light/Dark)
│   ├── login/
│   │   └── page.js               # Login-Seite mit Demo-Credentials
│   ├── dashboard/
│   │   └── page.js               # User-Dashboard (Fortschritte, KPIs, Aktivitäten)
│   ├── courses/
│   │   ├── page.js               # Kursübersicht (alle Module)
│   │   └── [id]/
│   │       ├── page.js           # Einzelne Kursseite
│   │       └── lesson/
│   │           └── [lessonId]/
│   │               └── page.js   # Lektions-Player (Video + Quiz Engine)
│   ├── profile/
│   │   └── page.js               # Profil & Lernfortschritt
│   ├── settings/
│   │   └── page.js               # Einstellungen (Profil, Passwort, Theme)
│   └── admin/
│       ├── page.js               # Admin Dashboard (KPIs + Schnellzugriff)
│       ├── courses/
│       │   └── page.js           # Kursverwaltung
│       ├── questions/
│       │   └── page.js           # Fragenverwaltung
│       ├── users/
│       │   └── page.js           # Benutzerverwaltung (nur Admin)
│       └── reporting/
│           └── page.js           # Berichte & Analysen
│
├── components/                   # Wiederverwendbare React-Komponenten
│   ├── AppLayout.js              # Layout-Wrapper (Sidebar + Header + Content)
│   ├── Header.js                 # Top-Navigation mit Suche, Theme-Toggle, Profil-Dropdown
│   ├── Sidebar.js                # Seitenleiste mit Navigation (Responsive)
│   ├── ThemeProvider.js          # next-themes Wrapper
│   └── ui.js                     # UI-Primitives (ProgressBar, StatusBadge)
│
├── lib/                          # Business-Logik & Datenschicht
│   ├── auth.js                   # AuthContext, Auth-Objekt, Login/Logout, Rollen
│   ├── store.js                  # Store (LocalStorage-Wrapper) + API-Abstraktionsschicht
│   └── seed.js                   # Seed-Daten: Benutzer, Kurse, Lektionen, Fragen (V14)
│
├── public/                       # Statische Assets
│   ├── logo.png                  # THITRONIK Logo
│   ├── Allgemeinfragen/          # Quiz-Bilder Modul "Allgemeine Fragen"
│   ├── Can-Bus/                  # Quiz-Bilder + Video* Modul "CAN-Bus"
│   ├── Fahrzeugübergabe/         # Quiz-Bilder + Video* Modul "Fahrzeugübergabe"
│   ├── Fehlersuche/              # Quiz-Bilder Modul "Fehlersuche"
│   ├── Funkzubehör anlernen/     # Quiz-Bilder + Video* Modul "Funkzubehör"
│   ├── Gelverbinder/             # Quiz-Bilder + Video* Modul "Gelverbinder"
│   ├── Grundlagen/               # Quiz-Bilder + Video* Modul "Grundlagen"
│   ├── Konfigurator/             # Quiz-Bilder + Video* Modul "Konfigurator"
│   ├── Magnet Montageadapter/    # Quiz-Bilder + Video* Modul "Montageadapter"
│   ├── pro-finder/               # Quiz-Bilder + Video* Modul "Pro-finder"
│   └── WiPro/                    # Quiz-Bilder + Video* Modul "WiPro"
│
├── package.json                  # Dependencies & Scripts
├── next.config.mjs               # Next.js Konfiguration
├── jsconfig.json                 # Path Aliases (@/ → Root)
├── eslint.config.mjs             # ESLint Konfiguration
├── AGENTS.md                     # Kontext-Datei für KI-Agenten
├── CONTRIBUTING.md               # Beitrags-Richtlinien
└── .gitignore                    # Git-Ignore (inkl. Videodateien)
```

> **\*** Video-Dateien (`.mp4`, `.m4v`) sind in `.gitignore` ausgeschlossen und nicht im Repository.

---

## 🚀 Schnellstart

### Voraussetzungen

- **Node.js** 18+ (empfohlen: 20 LTS)
- **npm** 9+ (wird mit Node.js mitgeliefert)

### Installation

```bash
# 1. Repository klonen
git clone https://github.com/MaxBehrens1337/Max-Thitronik-.git
cd Max-Thitronik-

# 2. Dependencies installieren
npm install

# 3. Development Server starten
npm run dev
```

Die App ist dann unter **http://localhost:3000** erreichbar.

### Verfügbare Scripts

| Script | Beschreibung |
|--------|-------------|
| `npm run dev` | Startet den Development Server (Hot Reload) |
| `npm run build` | Erstellt den Production Build |
| `npm run start` | Startet den Production Server |
| `npm run lint` | Führt ESLint Code-Analyse durch |

---

## 🔑 Demo-Zugangsdaten

| Rolle | E-Mail | Passwort | Berechtigungen |
|-------|--------|----------|----------------|
| **Admin** | `admin@thitronik.de` | `admin123` | Vollzugriff: Kurse, Fragen, Nutzer, Reporting |
| **Trainer** | `trainer@thitronik.de` | `trainer123` | Kurse und Fragen verwalten, Reporting einsehen |
| **Lernender** | `monteur@thitronik.de` | `monteur123` | Kurse ansehen, Quizze absolvieren, Profil verwalten |
| **Lernender** | `partner@thitronik.de` | `partner123` | Wie Monteur |

> ⚠️ **Hinweis:** Dies sind Demo-Credentials. Im MVP werden Passwörter im Klartext im LocalStorage gespeichert. Für den Produktivbetrieb muss eine echte Authentifizierung implementiert werden.

---

## 🎨 Design-System

Das Projekt verwendet ein **CI-konformes Design-Token-System** mit CSS Custom Properties, definiert in `app/globals.css`.

### Farbpalette

| Token | Light | Dark | Verwendung |
|-------|-------|------|------------|
| `--th-blue-primary` | `#1D3661` | `#2a4a80` | Hauptfarbe, Sidebar, Buttons |
| `--th-blue-secondary` | `#3BA9D3` | `#3BA9D3` | Akzentfarbe, Links, Fortschritt |
| `--th-accent-lime` | `#AFCA05` | `#AFCA05` | Erfolgs-Akzent, CTA |
| `--th-red-brand` | `#CE132D` | `#CE132D` | Markenrot, Zurück-Buttons, Warnungen |

### Typografie

- **Schriftfamilie:** Inter (Google Fonts)
- **Gewichte:** Regular (400), Medium (500), Semibold (600), Bold (700)
- **Größen:** Caption (12px) → H1 (36px)

### Komponenten

| Klasse | Beschreibung |
|--------|-------------|
| `.btn-primary` | Primärer Button (Blau) |
| `.btn-secondary` | Sekundärer Button (Outlined) |
| `.btn-back` | Zurück-Button (Rot, THITRONIK CI) |
| `.btn-success` | Erfolgs-Button (Lime) |
| `.card` | Karten-Container mit Shadow |
| `.card-hover` | Karte mit Hover-Animation |
| `.input` | Eingabefeld mit Focus-State |

---

## 📦 Datenmodell

Alle Daten werden als JSON-Arrays im `localStorage` mit dem Prefix `th_` gespeichert.

### Entitäten

```
th_users       → [{id, email, password, firstName, lastName, role, active}]
th_courses     → [{id, title, slug, status, sortOrder, icon, intro, learningGoals, questionCount}]
th_lessons     → [{id, courseId, title, status, sortOrder, videoUrl}]
th_questions   → [{id, lessonId, courseId, type, question, answers[], correctAnswers[], explanation}]
th_enrollments → [{userId, courseId, enrolledAt}]
th_progress    → [{userId, lessonId, status}]
th_quizAttempts → [{userId, lessonId, percent, answers, timestamp}]
```

### Beziehungen

```
User ──< Enrollment >── Course
Course ──< Lesson
Lesson ──< Question
User ──< Progress >── Lesson
User ──< QuizAttempt >── Lesson
```

### Seed-Versionierung

Die Seed-Daten verwenden einen Versionsschlüssel (`th__initialized_v14`). Bei Version-Bump wird der gesamte LocalStorage gelöscht und neu initialisiert.

---

## ⚠️ Wichtige Hinweise für Entwickler

### Videodateien

Schulungsvideos sind **nicht im Repository** enthalten (`.gitignore`). Die erwarteten Dateipfade sind in `lib/seed.js` bei den Lesson-Definitionen hinterlegt. Die Videos müssen manuell in die entsprechenden `/public/`-Unterordner gelegt werden.

**Unterstützte Formate:** `.mp4`, `.m4v`  
**Gesamtgröße:** ca. 800 MB

### LocalStorage-Limitierung

- **Kein Backend** – alle Daten sind lokal und gehen beim Löschen der Browserdaten verloren
- **Keine Synchronisation** zwischen verschiedenen Browsern/Geräten
- **Passwörter im Klartext** – nicht für Produktivbetrieb geeignet
- **Begrenzte Speicherkapazität** (~5-10 MB je nach Browser)

### Bildbasierte Quizze

Die Quiz-Fragen verwenden **Bilder als Antwortoptionen**, nicht Text. Die Bild-Dateien liegen im `/public/`-Ordner und werden über ihre Dateipfade referenziert. Die Dateinamen enthalten den vollständigen Fragetext als Identifier.

### Next.js 16 Besonderheiten

> ⚠️ **Dieses Projekt verwendet Next.js 16.2**, das Breaking Changes gegenüber früheren Versionen haben kann. Vor dem Schreiben von Code immer die Dokumentation in `node_modules/next/dist/docs/` konsultieren.

---

## 🗺️ Roadmap

### Phase 2 – Backend & Persistenz
- [ ] Datenbank-Integration (z.B. PostgreSQL / Supabase)
- [ ] Echte Authentifizierung (OAuth / NextAuth)
- [ ] Server-seitige API Routes

### Phase 3 – Erweiterte Features
- [ ] Zertifikats-PDF-Generierung
- [ ] E-Mail-Benachrichtigungen
- [ ] Video-Streaming statt lokaler Dateien
- [ ] Mehrstufige Lernpfade
- [ ] Erweiterte Analytics & Reporting

### Phase 4 – Qualität & Deployment
- [ ] Unit & Integration Tests
- [ ] Accessibility-Audit (WCAG 2.1)
- [ ] Performance-Optimierung
- [ ] CI/CD Pipeline
- [ ] Produktiv-Deployment (Vercel / eigenes Hosting)

---

## 📄 Lizenz

Dieses Projekt ist **proprietäre Software** der Firma THITRONIK GmbH. Alle Rechte vorbehalten. Nicht zur öffentlichen Nutzung oder Verbreitung bestimmt.

---

<p align="center">
  <sub>Entwickelt für THITRONIK GmbH · 2026</sub>
</p>
]]>
