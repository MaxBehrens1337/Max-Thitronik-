# THITRONIK Lernplattform

## Lokale Inbetriebnahme

### Voraussetzungen
- Ein moderner Webbrowser (Chrome, Firefox, Edge)
- Ein lokaler Webserver (z.B. `npx serve`)

### Starten
```bash
cd "Thitronik Online"
npx -y serve
```
Dann im Browser öffnen: `http://localhost:3000`

### Demo-Zugänge
| Rolle | E-Mail | Passwort |
|-------|--------|----------|
| **Admin** | admin@thitronik.de | admin123 |
| **Trainer** | trainer@thitronik.de | trainer123 |
| **Monteur** | monteur@thitronik.de | monteur123 |
| **Partner** | partner@thitronik.de | partner123 |

## Projektstruktur
```
├── index.html           # Einstiegspunkt
├── css/                 # Stylesheets
│   ├── tokens.css       # CI Design Tokens
│   ├── base.css         # Reset & Utilities
│   ├── layout.css       # Layout-System
│   ├── components.css   # UI-Komponenten
│   ├── pages.css        # Seitenspezifisch
│   └── responsive.css   # Responsive Breakpoints
├── js/
│   ├── app.js           # Haupt-App & Router-Setup
│   ├── router.js        # Hash-basierter SPA-Router
│   ├── store.js         # Daten-Store & API
│   ├── auth.js          # Authentifizierung
│   ├── components.js    # UI-Komponenten (JS)
│   ├── pages/           # Seitenmodule
│   └── data/            # Seed-Daten
└── docs/                # Dokumentation
```

## Funktionsumfang

### Lerner-Bereich
- **Dashboard** mit Statistiken und Kursfortschritt
- **Kursübersicht** mit Filtern (Alle, Eingeschrieben, In Bearbeitung, Abgeschlossen)
- **Kursdetailseite** mit Lektionsliste und Fortschrittsanzeige
- **Lektionsansicht** mit Rich-Text, Callouts, Schrittanleitungen
- **Quizsystem** (Single Choice, Multiple Choice) mit sofortiger Auswertung
- **Ergebnisansicht** mit Score und Versuchshistorie
- **Profil/Fortschritt** mit Übersicht aller Kurse

### Admin-Bereich
- **Admin Dashboard** mit Systemstatistiken
- **Kursverwaltung** (CRUD, Status, Sortierung)
- **Fragenverwaltung** (Erstellen, Bearbeiten, Löschen, Optionen verwalten)
- **Benutzerverwaltung** (Erstellen, Rollen zuweisen)
- **Reporting** (Kursfortschritt, Quiz-Ergebnisse, Nutzerübersicht)

## Datenmodell
Alle Daten werden im LocalStorage gespeichert. Beim ersten Start werden automatisch Seed-Daten angelegt:
- 4 Demo-Benutzer
- 13 Kurse (alle THITRONIK Module)
- 10 Lektionen mit Inhalten
- 11 Quizfragen mit Antwortoptionen

## Daten zurücksetzen
Browser-Konsole: `localStorage.clear()` → Seite neu laden.

## Erweiterung
- Neue Kurse/Lektionen über Admin-Bereich anlegen
- Neue Fragen über Fragenverwaltung erstellen  
- Für Backend-Anbindung: `store.js` → API-Aufrufe ersetzen
