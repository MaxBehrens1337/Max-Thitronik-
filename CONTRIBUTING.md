<![CDATA[# Beitragen zur THITRONIK Lernplattform

Vielen Dank für dein Interesse an der Weiterentwicklung der THITRONIK Lernplattform! 🎉

## 🚀 Schnellstart für Entwickler

```bash
# Repository klonen
git clone https://github.com/MaxBehrens1337/Max-Thitronik-.git
cd Max-Thitronik-

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

## 📋 Workflow

1. **Issue erstellen oder bestehendes Issue auswählen**
2. **Branch erstellen:** `feature/issue-nr-kurze-beschreibung` oder `fix/issue-nr-kurze-beschreibung`
3. **Änderungen implementieren**
4. **Testen:** Manuell im Browser prüfen (alle 3 Rollen: Admin, Trainer, Lernender)
5. **Commit mit aussagekräftiger Nachricht** (siehe Commit-Konventionen)
6. **Pull Request erstellen**

## 📝 Commit-Konventionen

Wir verwenden [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Neues Feature hinzugefügt
fix: Bugfix
docs: Dokumentation aktualisiert
style: Formatierung, CSS-Änderungen (kein Logik-Change)
refactor: Code-Refactoring (kein Feature, kein Fix)
chore: Build-Prozess, Dependencies, Tooling
content: Seed-Daten / Lerninhalte geändert
```

**Beispiele:**
```
feat: Quiz-Timer für Zeitlimit pro Frage hinzugefügt
fix: Fortschrittsberechnung zählt abgeschlossene Lektionen doppelt
docs: README um Architektur-Diagramm ergänzt
content: Seed-Daten v15 mit neuem Modul "Sprinter VS30"
```

## 🏗 Architektur-Regeln

### Datei-Konventionen

- **Seiten:** `app/[route]/page.js` – Jede Seite beginnt mit `"use client";`
- **Komponenten:** `components/KomponentenName.js` – PascalCase
- **Business-Logik:** `lib/modulname.js` – camelCase
- **Styles:** Alle CSS Custom Properties in `app/globals.css`

### Styling

- **Verwende CSS Custom Properties** (`var(--th-blue-primary)`) statt hartcodierter Farben
- **Responsive Design** ist Pflicht – teste auf Mobile (< 768px) und Desktop
- **Dark Mode** muss für alle neuen Komponenten funktionieren
- **Keine CSS-Frameworks** (kein Tailwind, kein Bootstrap) – nur Vanilla CSS mit Design-Tokens

### Datenfluss

- Alle Daten laufen über die `API`-Abstraktionsschicht in `lib/store.js`
- **Niemals direkt auf `localStorage` zugreifen** – immer über `Store.get()` / `Store.set()`
- Bei neuen Entitäten: API-Methoden in `lib/store.js` ergänzen

### Seed-Daten

- Beim Hinzufügen neuer Module den Versions-Key in `lib/seed.js` (z.B. `th__initialized_v14` → `v15`) hochsetzen
- Bestehende IDs nicht ändern, nur neue anhängen
- Bild-Dateien in den korrekten `/public/[Modulname]/`-Ordner legen

## 🧪 Testen

Da es noch keine automatisierten Tests gibt, bitte manuell prüfen:

- [ ] Login mit allen 3 Rollen (Admin, Trainer, Lernender)
- [ ] Dashboard zeigt korrekte KPIs und Fortschritte
- [ ] Kursübersicht: Einschreibung und Weiterleitung funktioniert
- [ ] Quiz: Fragen werden korrekt geladen, Bilder angezeigt, Auswertung stimmt
- [ ] Admin: Nur für berechtigte Rollen sichtbar
- [ ] Dark Mode: Alle Elemente korrekt dargestellt
- [ ] Mobile: Sidebar-Toggle und Layout funktionieren

## ⚠️ Bekannte Einschränkungen

- **Kein Backend** – LocalStorage-only (MVP)
- **Keine automatisierten Tests** – nur manuelle Prüfung
- **Passwörter im Klartext** im LocalStorage
- **Video-Dateien nicht im Repo** – müssen separat bereitgestellt werden
]]>
