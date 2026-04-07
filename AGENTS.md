<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# THITRONIK Campus Online – Agent Context

> Dieses Dokument liefert strukturierten Kontext für KI-Agenten, die mit dieser Codebasis arbeiten. Lies dieses Dokument vollständig, bevor du Code schreibst oder Änderungen vorschlägst.

## Projekt-Übersicht

**Name:** THITRONIK Campus Online (THITRONIK UNI)  
**Typ:** Client-seitige SPA (Single Page Application)  
**Framework:** Next.js 16.2.1 (App Router, `"use client"` auf allen Seiten)  
**Sprache:** JavaScript (kein TypeScript)  
**Styling:** Vanilla CSS mit Design-Token-System (kein Tailwind/Bootstrap)  
**Datenspeicher:** LocalStorage (kein Backend, keine Datenbank)  
**Sprache der UI:** Deutsch  
**Seed-Version:** V14  

## Kritische Architektur-Regeln

### 1. Client-Only Rendering
- **Alle Seiten** beginnen mit `"use client";` — es gibt keinen Server-seitigen Code.
- Next.js App Router wird nur für Routing genutzt, nicht für Server Components oder API Routes.

### 2. Datenschicht (lib/store.js)
- `Store` ist ein LocalStorage-Wrapper mit In-Memory-Cache und `th_`-Prefix.
- `API` ist die Abstraktionsschicht über `Store` mit CRUD-Operationen für alle Entitäten.
- **Greife niemals direkt auf `localStorage` zu** — immer über `Store` oder `API`.
- Änderungen triggern ein `th_store_change` CustomEvent für Reaktivität.

### 3. Authentifizierung (lib/auth.js)
- `Auth` Objekt: `login()`, `logout()`, `isLoggedIn()`, `isAdmin()`, `isTrainer()`.
- `AuthProvider` stellt den React Context bereit.
- `useAuth()` Hook gibt `{ currentUser, Auth }` zurück.
- Rollen: `admin` (Vollzugriff), `trainer` (Kurse/Fragen/Reporting), `learner` (nur lernen).

### 4. Seed-Daten (lib/seed.js)
- Enthält **alle** Kurse, Lektionen, Fragen und Demo-Benutzer.
- Versioniert durch `th__initialized_v14` Key — bei Änderungen Version hochsetzen!
- `initializeSeedData(API)` wird beim App-Start aufgerufen.
- **Fragen verwenden Bilder als Antworten** (Dateipfade im `answers[]` Array).
- Kurs-IDs: `c1`–`c13` (nicht fortlaufend, `c10` und `c12` sind Platzhalter).
- Lesson-IDs: `l1`–`l13` (korrespondierend zu Kursen).

### 5. Design-System (app/globals.css)
- **CI-Farben:** `--th-blue-primary` (#1D3661), `--th-blue-secondary` (#3BA9D3), `--th-red-brand` (#CE132D), `--th-accent-lime` (#AFCA05).
- **Dark Mode:** Automatisch via `[data-theme='dark']` Selektor, gesteuert durch `next-themes`.
- **Immer CSS Custom Properties verwenden**, keine hartcodierten Werte.
- **Zurück-Buttons** verwenden `.btn-back` (rot, THITRONIK CI).

### 6. Komponenten-Struktur
- `AppLayout.js` — Prüft ob Login-Seite → rendert ohne Layout, sonst mit Sidebar + Header.
- `Header.js` — Top-Bar mit Suche, Theme-Toggle, Profil-Dropdown (mit Logout und Einstellungen).
- `Sidebar.js` — Rollenbasierte Navigation (responsive, mobile mit Overlay).
- `ui.js` — Wiederverwendbare Primitives (`ProgressBar`, `StatusBadge`).

### 7. Quiz Engine (app/courses/[id]/lesson/[lessonId]/page.js)
- **Single Choice:** Ein Bild auswählen.
- **Multiple Choice:** Mehrere Bilder auswählen.
- Richtige Antworten werden in `correctAnswers[]` definiert (Dateipfade).
- Bestanden ab **80% Korrektheit**.
- Ergebnisse werden als `quizAttempt` in `th_quizAttempts` gespeichert.

### 8. Rollen-System (lib/roles.js)
- Definiert Berechtigungen und Navigations-Items pro Rolle.
- `admin`: Vollzugriff auf alle Bereiche inkl. Admin-Panel.
- `trainer`: Kursverwaltung, Fragen, Reporting (kein User-Management).
- `learner`: Kurse, Quiz, eigenes Profil.

### 9. Forum-System (lib/forum.js + app/forum/)
- Forum mit Kategorien, Themen und Antworten.
- Daten werden ebenfalls in LocalStorage über den Store gespeichert.
- Unterstützt Erstellen, Antworten und Kategorisierung.

## Datei-Referenz (Quick-Lookup)

| Wenn du ändern willst... | Bearbeite... |
|--------------------------|-------------|
| Neue Kurse/Fragen hinzufügen | `lib/seed.js` (Version-Key hochsetzen!) |
| Login-Logik, Rollen | `lib/auth.js` |
| Rollen-Berechtigungen | `lib/roles.js` |
| Daten CRUD-Operationen | `lib/store.js` (API-Objekt) |
| Forum-Logik | `lib/forum.js` |
| Farben, Abstände, Schatten | `app/globals.css` (Design-Tokens) |
| Navigation / Menü-Einträge | `components/Sidebar.js` |
| Header (Suche, Profil, Theme) | `components/Header.js` |
| Layout-Logik | `components/AppLayout.js` |
| UI-Primitives (Badges, Bars) | `components/ui.js` |
| Forum-Seiten | `app/forum/` |
| Wiki-Seite | `app/wiki/page.js` |
| THI-Bereich | `app/thi/page.js` |
| Legal Pages | `app/impressum/`, `app/datenschutz/`, `app/support/` |

## Häufige Fallstricke

1. **Seed-Daten werden nicht aktualisiert:** Version-Key vergessen hochzusetzen → `localStorage.clear()` im Browser und neu laden.
2. **CSS-Variablen im Dark Mode:** Neue Farben müssen auch im `[data-theme='dark']`-Block definiert werden.
3. **SSR-Fehler:** `typeof window === 'undefined'` Checks sind in `Store.get()` bereits eingebaut — bei neuen Client-Zugriffen ebenfalls prüfen.
4. **Dateiname mit Sonderzeichen:** Quiz-Bilder haben deutsche Umlaute und Sonderzeichen im Dateinamen — URL-Encoding beachten.
5. **Video-Dateien fehlen:** Die `.mp4`/`.m4v`-Dateien sind nicht im Repo — Seiten müssen graceful mit fehlenden Videos umgehen.

## Deployment-Hinweise

- **Aktuell:** Lokal via `npm run dev` (Development-Only)
- **Für Production:** `npm run build && npm start`
- **Video-Hosting:** Videos müssen separat bereitgestellt werden (CDN oder lokaler Ordner)
- **Kein `.env` benötigt** — alle Konfiguration ist hartcodiert (MVP)
