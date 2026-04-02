---
name: ui-ux-review
description: "UI/UX Design Intelligence für die THITRONIK Lernplattform. Enthält 100+ Regeln in 10 Kategorien, THITRONIK CI-Token-Referenz, Audit-Workflows, Pre-Delivery Checklisten, Farbkontrast-Richtlinien, Typografie-System, Animation-Standards, Accessibility-Prüfungen, Responsive-Design-Regeln und Dark-Mode-Best-Practices. Verwende diesen Skill bei: UI-Reviews, Design-Verbesserungen, neuen Seiten/Komponenten, Accessibility-Audits, Performance-Optimierung, Dark-Mode-Fixes, Responsive-Anpassungen und visueller Qualitätskontrolle."
---

# UI/UX Pro Review Skill — THITRONIK Lernplattform

> Umfassender Design-Intelligence-Skill für die THITRONIK Lernplattform.
> Adaptiert aus dem [ui-ux-pro-max Skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), maßgeschneidert für Next.js 16 + Vanilla CSS + Dark Mode.

---

## Wann diesen Skill verwenden

### Muss verwendet werden bei:
- Erstellen neuer Seiten (Dashboard, Admin, Quiz, Kurse, Profile)
- Erstellen oder Refactoring von UI-Komponenten (Buttons, Cards, Modals, Forms, Tables)
- Auswahl oder Änderung von Farben, Typografie, Spacing, Schatten
- UI-Review auf User Experience, Accessibility oder visuelle Konsistenz
- Implementierung von Navigation, Animationen oder Responsive-Verhalten
- Dark-Mode-Anpassungen oder Theming-Entscheidungen

### Empfohlen bei:
- UI sieht „nicht professionell genug" aus, aber der Grund ist unklar
- Feedback zu Usability oder Nutzererlebnis
- Qualitätsoptimierung vor Release
- Erstellung von wiederverwendbaren Komponenten oder Design-System-Erweiterungen

### Nicht nötig bei:
- Reine Backend-Logik / Store-Operationen
- Seed-Daten-Änderungen (ohne UI-Auswirkung)
- DevOps / Deployment-Konfiguration

**Entscheidungskriterium:** Wenn die Aufgabe beeinflusst, wie etwas **aussieht, sich anfühlt, animiert oder bedient wird** → diesen Skill verwenden.

---

## THITRONIK Design System Referenz

### CI-Farben (Quelle der Wahrheit: `globals.css`)

| Token | Light | Dark | Verwendung |
|-------|-------|------|------------|
| `--th-blue-primary` | `#1D3661` | `#2a4a80` | Primärfarbe, Sidebar, Buttons, Branding |
| `--th-blue-secondary` | `#3BA9D3` | `#3BA9D3` | Akzente, Links, aktive Sidebar-Items, Focus-Ringe |
| `--th-red-brand` | `#CE132D` | `#CE132D` | Zurück-Buttons, destruktive Aktionen, CI-Rot |
| `--th-accent-lime` | `#AFCA05` | `#AFCA05` | Erfolgs-Buttons, positive Hervorhebungen |

### Semantische Farben

| Token | Light | Dark | Verwendung |
|-------|-------|------|------------|
| `--color-success` | `#16a34a` | `#4ade80` | Bestanden, Abgeschlossen |
| `--color-warning` | `#d97706` | `#fbbf24` | In Bearbeitung, Hinweise |
| `--color-error` | `#dc2626` | `#f87171` | Fehler, Nicht bestanden |
| `--color-info` | `#0284c7` | `#38bdf8` | Informationen, Tips |

### Neutrale Palette

| Token | Light | Dark |
|-------|-------|------|
| `--bg-page` | `#f8fafc` | `#020617` |
| `--bg-card` | `#ffffff` | `#0f172a` |
| `--border-color` | `#e2e8f0` | `#1e293b` |
| `--text-primary` | `#020617` | `#f8fafc` |
| `--text-secondary` | `#334155` | `#cbd5e1` |
| `--text-tertiary` | `#64748b` | `#94a3b8` |
| `--gray-soft` | `#f1f5f9` | `#1e293b` |

### Typografie-System

| Token | Wert | Verwendung |
|-------|------|------------|
| `--font-primary` | `'Inter', system-ui, sans-serif` | Alles |
| `--fs-h1` | `36px` | Seitentitel |
| `--fs-h2` | `30px` | Abschnittstitel |
| `--fs-h3` | `24px` | Karten-Titel |
| `--fs-body-lg` | `18px` | Subtitles, Feature-Text |
| `--fs-body` | `16px` | Standard-Body |
| `--fs-body-sm` | `14px` | Labels, sekundärer Text |
| `--fs-caption` | `12px` | Meta-Infos, Badges |

**Type Scale:** 12 → 14 → 16 → 18 → 24 → 30 → 36  
**Gewichte:** Regular (400), Medium (500), Semibold (600), Bold (700)  
**Line-height:** Body 1.6, Headings 1.2

### Spacing-System (4px-Basis)

```
--sp-1: 4px    --sp-2: 8px    --sp-3: 12px   --sp-4: 16px
--sp-6: 24px   --sp-8: 32px   --sp-12: 48px  --sp-16: 64px
```

**Regel:** Immer `var(--sp-X)` verwenden. Keine willkürlichen Pixel-Werte.

### Radien & Schatten

| Token | Wert | Verwendung |
|-------|------|------------|
| `--radius-sm` | `6px` | Buttons, Badges |
| `--radius-md` | `8px` | Inputs, Dropdowns |
| `--radius-lg` | `12px` | Cards, Panels |
| `--radius-full` | `9999px` | Avatare, Pills, Suchfelder |
| `--shadow-card` | Light: `0 4px 12px rgba(29,54,97,0.05)` / Dark: `0 4px 12px rgba(0,0,0,0.4)` | Cards |
| `--shadow-card-hover` | Light: `0 12px 24px rgba(29,54,97,0.08)` / Dark: `0 12px 24px rgba(0,0,0,0.6)` | Card-Hover |

### Transition-Tokens

| Token | Wert | Verwendung |
|-------|------|------------|
| `--transition-fast` | `150ms ease-out` | Hover, Button-Press, Toggle |
| `--transition-normal` | `200ms ease-out` | Seiten-Elemente, Sidebar |

### Layout-Tokens

| Token | Wert |
|-------|------|
| `--max-content` | `1280px` |
| `--sidebar-width` | `260px` |
| `--header-height` | `64px` |
| `--z-sticky` | `100` |
| `--z-sidebar` | `200` |
| `--z-modal-backdrop` | `300` |

### Bestehende Klassen (nie duplizieren, immer wiederverwenden)

| Klasse | Zweck |
|--------|-------|
| `.btn` | Basis-Button mit Flex, Padding, Radius, Transition |
| `.btn-primary` | THITRONIK Blue, weißer Text |
| `.btn-secondary` | Transparent mit Border |
| `.btn-success` | Lime-grün Akzent |
| `.btn-back` | CI-Rot Border + Text → Hover: Rot gefüllt |
| `.card` | Karten-Container mit Border, Shadow, Radius |
| `.card-hover` | Hover-Lift-Effekt (translateY + Shadow) |
| `.card-body` | Card-Inneres Padding |
| `.input` | Standard-Input-Feld |
| `.label` | Form-Label |
| `.animate-fade-in-up` | Einblend-Animation von unten |

---

## Prioritäts-Checkliste (1→10)

Folge der Priorität 1→10 bei jedem UI-Review. Höhere Priorität = zuerst prüfen.

### Priorität 1: Accessibility (KRITISCH)

| Regel-ID | Regel | Standard | Anti-Pattern |
|-----------|-------|----------|-------------|
| `a11y-contrast` | Farbkontrast | Min 4.5:1 für normalen Text, 3:1 für großen Text | Grau-auf-Grau, z.B. `--text-tertiary` auf `--bg-card` im Dark Mode ungeprüft |
| `a11y-focus` | Focus-Ringe | Sichtbare Focus-Ringe auf allen interaktiven Elementen (2–4px) | `outline: none` ohne Ersatz |
| `a11y-alt` | Alt-Texte | Beschreibender Alt-Text für bedeutungsvolle Bilder | `alt=""` für inhaltliche Bilder |
| `a11y-aria` | ARIA-Labels | `aria-label` für Icon-only Buttons (Theme-Toggle, Menü) | Icon-Button ohne Label |
| `a11y-keyboard` | Keyboard-Navigation | Tab-Reihenfolge = visuelle Reihenfolge, volle Tastaturunterstützung | Klickbare `<div>` ohne `role="button"` und `tabIndex` |
| `a11y-labels` | Formular-Labels | Jedes Input hat ein zugehöriges `<label>` mit `htmlFor` | Nur Placeholder als Label |
| `a11y-skip` | Skip-Link | „Zum Inhalt springen" für Tastatur-Nutzer | Kein Skip-Link bei Sidebar-Layout |
| `a11y-heading` | Heading-Hierarchie | Sequenziell h1→h6, kein Level-Sprung | h1 → h3 (h2 übersprungen) |
| `a11y-color-only` | Farbe nicht allein | Information nicht nur durch Farbe vermitteln (Icon/Text ergänzen) | Rot/Grün ohne Icon bei Quiz-Antworten |
| `a11y-reduced-motion` | Reduzierte Bewegung | `@media (prefers-reduced-motion: reduce)` respektieren | Animationen ohne Motion-Query |
| `a11y-live` | Live-Regionen | `aria-live="polite"` für dynamische Inhalte (Toast, Errors) | Fehler die nur visuell erscheinen |
| `a11y-role` | Semantische Rollen | Korrekte ARIA-Rollen und -Zustände (selected, disabled, expanded) | Custom-Dropdowns ohne ARIA |

### Priorität 2: Interaktion (KRITISCH)

| Regel-ID | Regel | Standard | Anti-Pattern |
|-----------|-------|----------|-------------|
| `int-target` | Touch-Target-Größe | Min 44×44px für klickbare Elemente | Kleine Icon-Buttons unter 44px |
| `int-spacing` | Touch-Abstände | Min 8px Abstand zwischen klickbaren Elementen | Aneinandergereihte Buttons ohne Gap |
| `int-hover-tap` | Hover vs. Click | Click/Tap für primäre Interaktionen, Hover nicht voraussetzen | Tooltips nur bei Hover, wichtige Info verborgen |
| `int-loading` | Lade-Buttons | Button bei async-Ops deaktivieren + Spinner/Text zeigen | Submit-Button der doppelt geklickt werden kann |
| `int-error` | Fehler-Feedback | Klare Fehlermeldung nah am Problem | `alert()` statt Inline-Fehlermeldung |
| `int-cursor` | Cursor-Pointer | `cursor: pointer` auf alle klickbaren Elemente | Klickbare Card ohne Pointer-Cursor |
| `int-feedback` | Press-Feedback | Visuelles Feedback bei Click (Opacity, Scale, Color-Shift) | Klick ohne jede visuelle Reaktion |
| `int-disabled` | Disabled-Zustand | `opacity: 0.5` + `cursor: not-allowed` + `pointer-events: none` | Deaktivierter Button der normal aussieht |

### Priorität 3: Performance (HOCH)

| Regel-ID | Regel | Standard | Anti-Pattern |
|-----------|-------|----------|-------------|
| `perf-images` | Bildoptimierung | WebP/AVIF, responsive srcset, Lazy-Loading für off-screen | Unkomprimierte PNGs über 500KB |
| `perf-dimensions` | Bild-Dimensionen | `width`/`height` oder `aspect-ratio` setzen | Bilder ohne Dimensionen → Layout Shift |
| `perf-fonts` | Font-Loading | `font-display: swap`, nur kritische Fonts vorladen | Unsichtbarer Text während Font-Load (FOIT) |
| `perf-lazy` | Lazy-Loading | Nicht-sichtbare Komponenten via dynamic import laden | Alles im initialen Bundle |
| `perf-skeleton` | Skeleton-Screens | Skeleton/Shimmer statt leerer Bereich bei >300ms Laden | Leere Seite während Daten laden |
| `perf-cls` | Layout-Stabilität | Platz für async-Content reservieren (CLS < 0.1) | Inhalte die nach dem Laden springen |
| `perf-debounce` | Debounce/Throttle | Für hochfrequente Events (Scroll, Resize, Input-Suche) | Suche die bei jedem Tastendruck filtert ohne Debounce |
| `perf-transform` | Transform-Performance | Nur `transform`/`opacity` animieren | `width`, `height`, `top`, `left` animieren |

### Priorität 4: Stilauswahl & Konsistenz (HOCH)

| Regel-ID | Regel | Standard | Anti-Pattern |
|-----------|-------|----------|-------------|
| `style-match` | Stil-Konsistenz | Gleicher Stil auf allen Seiten (THITRONIK CI) | Glasmorphism auf einer Seite, Flat auf einer anderen |
| `style-icons` | Icon-System | Lucide React Icons konsistent verwenden (gleiche Größe, Stroke) | Emojis als strukturelle Icons (🎓🛡️📱) |
| `style-tokens` | Token-Nutzung | Immer CSS Custom Properties, nie hart-kodierte Werte | `color: #334155` statt `color: var(--text-secondary)` |
| `style-elevation` | Schatten-System | Konsistente Schatten-Skala (`--shadow-sm`, `--shadow-card`, `--shadow-card-hover`) | Willkürliche `box-shadow`-Werte pro Komponente |
| `style-dark-pair` | Dark-Mode-Paarung | Light/Dark Varianten zusammen gestalten | Dark Mode als Nachgedanke, ungeprüfte Kontraste |
| `style-primary-cta` | Primäre Aktion | Nur einen primären CTA pro Screen; sekundäre visuell unterordnen | Drei gleichwertig gestylte Buttons |
| `style-inline` | Inline-Styles vermeiden | CSS-Klassen in `globals.css` bevorzugen | `style={{ ... }}` für wiederkehrende Patterns |

### Priorität 5: Layout & Responsive (HOCH)

| Regel-ID | Regel | Standard | Anti-Pattern |
|-----------|-------|----------|-------------|
| `layout-viewport` | Viewport-Meta | `width=device-width, initial-scale=1` (Zoom nie deaktivieren) | `user-scalable=no` |
| `layout-mobile-first` | Mobile-First | Mobile zuerst designen, dann hochskalieren | Desktop-Design das auf Mobile bricht |
| `layout-breakpoints` | Breakpoints | System: `640px` / `768px` / `1024px` / `1440px` | Willkürliche Breakpoints pro Komponente |
| `layout-font-min` | Mindestschriftgröße | Min 16px Body-Text auf Mobile (verhindert iOS Auto-Zoom) | 14px Body auf Mobile |
| `layout-line-length` | Zeilenlänge | Mobile 35–60 Zeichen, Desktop 60–75 Zeichen | Edge-to-Edge Fließtext auf 1440px Viewport |
| `layout-no-hscroll` | Kein horizontales Scroll | Content passt in Viewport-Breite | Tabellen die seitlich scrollen auf Mobile |
| `layout-spacing` | Spacing-System | 4px/8px inkrementelles System (`--sp-X`) | Willkürliche Pixel-Werte für Abstände |
| `layout-z-index` | Z-Index-Skala | Definierte Stufen: `100` / `200` / `300` | `z-index: 9999` willkürlich |
| `layout-fixed-offset` | Fixed-Element-Offset | Sticky Header/Footer reserviert Padding für Content darunter | Content verschwindet hinter Sticky-Header |
| `layout-container` | Container-Breite | Konsistentes `max-width: var(--max-content)` | Seiten ohne Max-Width die zu breit laufen |
| `layout-grid` | Grid-System | CSS Grid oder Flexbox mit konsistenten Gaps | Float-basiertes Layout |

### Priorität 6: Typografie & Farbe (MITTEL)

| Regel-ID | Regel | Standard | Anti-Pattern |
|-----------|-------|----------|-------------|
| `typo-line-height` | Line-Height | 1.5–1.75 für Body-Text (aktuell: 1.6 ✓) | Line-Height 1.0 auf Fließtext |
| `typo-scale` | Type-Scale | Konsistente Stufen: 12→14→16→18→24→30→36 | Willkürliche Schriftgrößen wie 15px, 17px, 22px |
| `typo-weight` | Gewichts-Hierarchie | Bold (700) für Headings, Medium (500) für Labels, Regular (400) für Body | Alles auf Regular oder alles auf Bold |
| `typo-contrast` | Text-Lesbarkeit | Dunklerer Text auf hellen Hintergründen | `--text-tertiary` für primären Content |
| `typo-truncation` | Textkürzung | Wrapping bevorzugen; bei Kürzung: Ellipsis + Tooltip für vollen Text | Text der abgeschnitten wird ohne Zugang zum Rest |
| `typo-semantic` | Semantische Farb-Token | `var(--color-error)` statt `#dc2626` | Hart-kodierte Hex-Werte in Komponenten |
| `typo-dark-mode` | Dark-Mode-Töne | Entsättigte/hellere Töne im Dark Mode, nicht invertiert | Gleiche Werte für Light und Dark |
| `typo-whitespace` | Weißraum | Bewusster Weißraum zum Gruppieren und Trennen | Überladene Layouts ohne Luft |

### Priorität 7: Animation (MITTEL)

| Regel-ID | Regel | Standard | Anti-Pattern |
|-----------|-------|----------|-------------|
| `anim-duration` | Dauer & Timing | 150–300ms für Micro-Interactions, ≤400ms für komplexe | >500ms Animationen, Linear-Easing |
| `anim-transform` | Transform-Only | Nur `transform`/`opacity` animieren für 60fps | `width`, `height`, `margin` animieren |
| `anim-loading` | Lade-Zustand | Skeleton oder Progress bei Laden >300ms | Leere Bereiche während Content lädt |
| `anim-restraint` | Max 1–2 Animationen | Pro View höchstens 1–2 animierte Key-Elemente | Alles gleichzeitig einblenden |
| `anim-easing` | Easing-Kurven | `ease-out` für Einblenden, `ease-in` für Ausblenden | Linear für UI-Transitions |
| `anim-meaning` | Bedeutung | Jede Animation drückt eine Ursache-Wirkung aus | Dekorative Animation ohne Sinn |
| `anim-stagger` | Stagger-Sequenz | Listen-Items um 30–50ms versetzt einblenden | Alles-auf-einmal oder zu langsam |
| `anim-exit` | Exit schneller als Enter | Exit-Animationen ~60–70% der Enter-Dauer | Exit genauso lang wie Enter |
| `anim-interruptible` | Unterbrechbar | Animationen durch User-Aktion sofort abbruchbar | Animation die User-Input blockiert |
| `anim-reduced` | Reduzierte Bewegung | `@media (prefers-reduced-motion: reduce)` → Animationen minimieren | Motion-Preference ignoriert |
| `anim-no-cls` | Kein Layout-Shift | Animationen dürfen keinen Reflow verursachen | `margin`/`padding` Animationen die Nachbarn verschieben |

### Priorität 8: Formulare & Feedback (MITTEL)

| Regel-ID | Regel | Standard | Anti-Pattern |
|-----------|-------|----------|-------------|
| `form-labels` | Sichtbare Labels | Jedes Input hat ein sichtbares Label (nicht nur Placeholder) | Placeholder-only Labels |
| `form-error-place` | Fehler-Platzierung | Fehlermeldung direkt unter dem betroffenen Feld | Alle Fehler nur am Seitenanfang |
| `form-submit` | Submit-Feedback | Loading → Success/Error State bei Absenden | Kein Feedback nach Submit |
| `form-required` | Pflichtfelder | Mit `*` oder Text markieren | Pflichtfelder ohne Kennzeichnung |
| `form-empty` | Leerzustände | Hilfreiche Nachricht + Handlungsaufforderung bei leerem Content | Leere Tabelle/Liste ohne Erklärung |
| `form-validation` | Inline-Validierung | Validierung bei blur (nicht bei jedem Tastendruck) | Echtzeit-Validierung die nervt |
| `form-input-type` | Input-Typen | Semantische Typen (`email`, `tel`, `number`) für Mobile-Keyboards | `type="text"` für E-Mail-Felder |
| `form-confirm` | Bestätigungs-Dialoge | Bestätigung vor destruktiven Aktionen (Löschen, Abmelden) | Sofortiges Löschen ohne Rückfrage |
| `form-toast` | Toast-Nachrichten | Auto-Dismiss in 3–5 Sekunden | Toast die den User blockieren |
| `form-destructive` | Destruktive Aktionen | Rote Farbgebung, visuell getrennt von normalen Aktionen | Lösch-Button neben Speichern-Button gleichwertig gestylt |
| `form-error-clarity` | Fehler-Klarheit | Fehlermeldung = Ursache + Lösung | "Ungültige Eingabe" ohne Kontext |
| `form-focus-mgmt` | Focus-Management | Nach Submit-Fehler: Fokus auf erstes ungültiges Feld | User muss selbst das Fehler-Feld suchen |
| `form-touch-height` | Mobile Input-Höhe | Min 44px Höhe für Touch-Targets | 32px hohe Inputs auf Mobile |

### Priorität 9: Navigation (HOCH)

| Regel-ID | Regel | Standard | Anti-Pattern |
|-----------|-------|----------|-------------|
| `nav-back` | Vorhersagbares Zurück | Back-Navigation muss konsistent sein, Scroll/State bewahren | Zurück = Reset der Seite |
| `nav-active` | Aktiver Zustand | Aktueller Standort visuell hervorgehoben in Navigation | Alle Nav-Items sehen gleich aus |
| `nav-label-icon` | Label + Icon | Nav-Items haben Icon UND Text-Label | Nur Icons ohne Beschriftung |
| `nav-hierarchy` | Hierarchie | Primär (Sidebar-Items) vs. Sekundär (Footer, Submenus) klar getrennt | Alles auf einer Ebene vermischt |
| `nav-modal-escape` | Modal-Schließen | Modals bieten klares Schließen-Affordance + Klick-außerhalb | Modal ohne Schließen-Möglichkeit |
| `nav-search` | Suche erreichbar | Suchfunktion leicht erreichbar (Header) | Suche versteckt in tiefem Menü |
| `nav-consistent` | Konsistente Platzierung | Navigation an gleicher Stelle auf allen Seiten | Nav-Position ändert sich je nach Seite |
| `nav-destructive-sep` | Destruktiv getrennt | Gefährliche Aktionen (Logout, Account löschen) visuell separiert | Logout direkt neben normalen Nav-Items |
| `nav-state-preserve` | Zustand bewahren | Zurücknavigieren stellt Scroll-Position, Filter, Input wieder her | Jede Navigation = kompletter State-Reset |
| `nav-overflow` | Overflow-Menü | Bei zu vielen Aktionen: „Mehr"-Menü statt Quetschen | 8 Buttons in eine Zeile gequetscht |

### Priorität 10: Charts & Daten (NIEDRIG)

| Regel-ID | Regel | Standard | Anti-Pattern |
|-----------|-------|----------|-------------|
| `chart-type` | Chart-Typ passend | Trend → Linie, Vergleich → Balken, Anteil → Pie/Donut | Pie-Chart für Zeitverläufe |
| `chart-legend` | Legende sichtbar | Immer Legende zeigen, nah am Chart | Legende unterhalb des Scroll-Folds |
| `chart-tooltip` | Tooltips | Exakte Werte bei Hover/Tap anzeigen | Kein Tooltip bei interaktiven Datenpunkten |
| `chart-empty` | Leerer Zustand | "Noch keine Daten" + Handlungshinweis, kein leeres Chart | Leere Achsen ohne Erklärung |
| `chart-a11y` | Barrierefreiheit | Nicht nur Farbe zur Unterscheidung, Pattern/Textur ergänzen | Rot vs. Grün ohne Alternative für Farbenblinde |
| `chart-responsive` | Responsive Charts | Charts passen sich an oder vereinfachen auf kleinen Screens | Charts die auf Mobile unlesbar werden |

---

## THITRONIK-spezifische Regeln

### Bekannte Verstöße im aktuellen Code (Stand V14)

Diese Issues sind bekannt und sollten bei UI-Verbesserungen prioritär behoben werden:

| Issue | Datei | Regel | Problem |
|-------|-------|-------|---------|
| Emoji-Icons | `app/login/page.js` | `style-icons` | 🎓🛡️📱 als Feature-Icons auf der Login-Seite |
| Emoji-Icons | `app/dashboard/page.js` | `style-icons` | 👋 in der Begrüßung, Kurs-Icons sind Emojis |
| Inline-Styles | Alle JS-Dateien | `style-inline` | Massiver Einsatz von `style={{ }}` statt CSS-Klassen |
| `alert()` Nutzung | `components/Header.js` | `int-error` | `alert()` für "Einstellungen - Bald verfügbar" |
| Fehlende Focus-Ringe | `globals.css` | `a11y-focus` | Kein globales Focus-Ring-System definiert |
| Kein Skip-Link | `components/AppLayout.js` | `a11y-skip` | Kein "Zum Inhalt springen" Link |
| Kein Reduced-Motion | `globals.css` | `anim-reduced` | Keine `prefers-reduced-motion` Media Query |
| Fehlende ARIA-Labels | `components/Header.js` | `a11y-aria` | Theme-Toggle, Menü-Button ohne `aria-label` |
| Hart-kodierte Werte | `components/Header.js` | `style-tokens` | `gap: '12px'`, `padding: '8px'` statt Tokens |
| Login Sidebar | `app/login/page.js` | `style-dark-pair` | Login-Sidebar Farbe hart-kodiert für Light-Mode |

### THITRONIK Button-Konventionen

```
Primäre Aktion:     .btn .btn-primary     → Blau (Speichern, Weiter, Anmelden)
Sekundäre Aktion:   .btn .btn-secondary   → Transparent + Border (Abbrechen, Alle ansehen)
Erfolg/Positiv:     .btn .btn-success     → Lime-Grün (Kurs starten, Bestätigen)
Zurück/Abbrechen:   .btn .btn-back        → Rot Border → Hover: Rot gefüllt
Destruktiv:         Inline-Style          → var(--color-error) (Löschen, Abmelden)
```

### THITRONIK Card-Pattern

```css
/* Standard-Card */
.card                → Background, Border, Shadow, Radius
.card .card-body     → Inneres Padding (24px)
.card.card-hover     → Lift + Shadow-Verstärkung bei Hover

/* NICHT: Individuelle Styles pro Card-Instanz */
```

### Quiz-spezifische Regeln

- Antwort-Bilder: Grid-Layout mit `minmax(250px, 1fr)` für responsive Bildgröße
- Selection-State: 3px Border + leichte Hintergrundfarbe
- Resolved-State: Grün (korrekt) / Rot (falsch) + Opacity für neutrale Optionen
- Progress-Bar: `--th-blue-primary` Füllung auf `--border-color` Hintergrund
- Bestanden ab 80%: Farbe wechselt zu `--color-success`

---

## Audit-Workflows

### Workflow 1: Vollständiger UI-Review einer Seite

```
1. Screenshot der Seite machen (Light + Dark Mode)
2. Priorität 1 (Accessibility) prüfen:
   - Kontrast-Verhältnisse messen
   - Tab-Reihenfolge testen
   - ARIA-Labels prüfen
3. Priorität 2 (Interaktion) prüfen:
   - Alle Touch-Targets ≥44px?
   - Hover/Click-Feedback vorhanden?
   - Loading-States implementiert?
4. Priorität 4 (Stil) prüfen:
   - Alle Farben via Tokens?
   - Icons konsistent (Lucide)?
   - Keine Emojis als strukturelle Icons?
5. Priorität 5 (Layout) prüfen:
   - Mobile-Ansicht testen (375px)
   - Tablet-Ansicht testen (768px)
   - Desktop-Ansicht testen (1440px)
6. Befunde dokumentieren mit Regel-IDs
7. Fixes nach Priorität implementieren
```

### Workflow 2: Neue Komponente erstellen

```
1. Prüfe ob ähnliche Klasse in globals.css existiert
2. Verwende bestehende Design-Tokens (Farben, Spacing, Radien)
3. Definiere CSS-Klassen in globals.css (nicht inline)
4. Dark-Mode-Variante im [data-theme='dark'] Block
5. Responsive Breakpoints berücksichtigen
6. Hover/Focus/Active/Disabled States definieren
7. ARIA-Labels für interaktive Elemente
8. Animation mit --transition-fast oder --transition-normal
9. prefers-reduced-motion Fallback
10. Review gegen Priorität 1-5 Checkliste
```

### Workflow 3: Dark-Mode-Fix

```
1. Element im Dark Mode screenshotten
2. Kontrast prüfen (text auf background):
   - Primärer Text: ≥7:1 (AAA) oder ≥4.5:1 (AA)
   - Sekundärer Text: ≥4.5:1 (AA)
   - Tertiärer Text: ≥3:1
3. Prüfe ob Token im [data-theme='dark'] Block überschrieben wird
4. Semantic Colors nutzen entsättigte Varianten im Dark Mode
5. Borders und Divider müssen in beiden Modi sichtbar sein
6. Schatten müssen im Dark Mode stärker sein (höhere Opacity)
```

---

## Pre-Delivery Checkliste

Vor jeder Auslieferung von UI-Code diese Punkte abarbeiten:

### Visuelle Qualität
- [ ] Keine Emojis als strukturelle Icons (SVG/Lucide verwenden)
- [ ] Alle Icons aus konsistenter Icon-Familie (Lucide React)
- [ ] Konsistente Icon-Größen (16px für inline, 20px für Nav, 24px für Features)
- [ ] Semantische Theme-Tokens konsistent verwendet (kein ad-hoc Hex)
- [ ] Inline-Styles auf Minimum reduziert (CSS-Klassen bevorzugt)
- [ ] Schatten/Elevation folgen dem Token-System

### Interaktion
- [ ] Alle klickbaren Elemente haben `cursor: pointer`
- [ ] Touch-Targets ≥44px
- [ ] Micro-Interaction Timing 150–300ms
- [ ] Disabled-States visuell klar und nicht interaktiv
- [ ] Keine `alert()` Aufrufe (Inline-Feedback oder Toast verwenden)

### Light/Dark Mode
- [ ] Primärer Text Kontrast ≥4.5:1 in beiden Modi
- [ ] Sekundärer Text Kontrast ≥3:1 in beiden Modi
- [ ] Borders/Divider in beiden Modi sichtbar
- [ ] Beide Themes vor Auslieferung getestet (nicht aus einem abgeleitet)

### Layout
- [ ] Getestet auf 375px (kleines Phone), 768px (Tablet), 1440px (Desktop)
- [ ] Kein horizontales Scrollen
- [ ] Spacing aus Token-System (`var(--sp-X)`)
- [ ] Content nicht hinter Sticky-Header/Footer verborgen

### Accessibility
- [ ] Alle interaktiven Elemente keyboard-navigierbar
- [ ] Sichtbare Focus-Ringe
- [ ] `aria-label` auf Icon-only Buttons
- [ ] Fehlermeldungen per `aria-live` angekündigt
- [ ] `prefers-reduced-motion` respektiert
- [ ] Heading-Hierarchie korrekt (h1 → h2 → h3)

### THITRONIK-spezifisch
- [ ] CI-Farben korrekt eingesetzt (Blue Primary, Red Brand, Lime Accent)
- [ ] Zurück-Buttons verwenden `.btn-back` (Rot)
- [ ] Login-Seite funktioniert in Light + Dark
- [ ] Sidebar aktiver Zustand korrekt hervorgehoben
- [ ] Quiz-Antworten zeigen korrekten Selection/Resolved State

---

## CSS-Verbesserungs-Templates

### Focus-Ring-System (fehlt aktuell)

```css
/* Globales Focus-Ring-System */
:focus-visible {
  outline: 2px solid var(--th-blue-secondary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Focus-Ring auf Dark Backgrounds (Sidebar) */
.sidebar :focus-visible {
  outline-color: #fff;
}
```

### Reduced-Motion-Support (fehlt aktuell)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Skip-Link (fehlt aktuell)

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--sp-4);
  padding: var(--sp-3) var(--sp-4);
  background: var(--th-blue-primary);
  color: #fff;
  border-radius: var(--radius-sm);
  z-index: 10000;
  font-weight: var(--fw-semibold);
  transition: top var(--transition-fast);
}
.skip-link:focus {
  top: var(--sp-4);
}
```

### Stagger-Animationen (teilweise vorhanden)

```css
.stagger-1 { animation-delay: 50ms; }
.stagger-2 { animation-delay: 100ms; }
.stagger-3 { animation-delay: 150ms; }
.stagger-4 { animation-delay: 200ms; }
.stagger-5 { animation-delay: 250ms; }
```

### Button Active/Pressed State (fehlt)

```css
.btn:active {
  transform: scale(0.97);
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

### Smooth Scrollbar Styling

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: var(--radius-full);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--text-tertiary);
}
```

---

## Kontrast-Referenztabelle

Schnelle Referenz für häufig verwendete Farbkombinationen:

### Light Mode

| Vordergrund | Hintergrund | Ratio | WCAG |
|-------------|-------------|-------|------|
| `--text-primary` (#020617) | `--bg-card` (#ffffff) | 19.9:1 | ✅ AAA |
| `--text-secondary` (#334155) | `--bg-card` (#ffffff) | 9.7:1 | ✅ AAA |
| `--text-tertiary` (#64748b) | `--bg-card` (#ffffff) | 4.6:1 | ✅ AA |
| `--th-blue-primary` (#1D3661) | `--bg-card` (#ffffff) | 11.3:1 | ✅ AAA |
| `--th-blue-secondary` (#3BA9D3) | `--bg-card` (#ffffff) | 3.1:1 | ⚠️ Nur für großen Text |
| `--th-red-brand` (#CE132D) | `--bg-card` (#ffffff) | 5.3:1 | ✅ AA |
| White (#fff) | `--th-blue-primary` (#1D3661) | 11.3:1 | ✅ AAA |

### Dark Mode

| Vordergrund | Hintergrund | Ratio | WCAG |
|-------------|-------------|-------|------|
| `--text-primary` (#f8fafc) | `--bg-card` (#0f172a) | 15.4:1 | ✅ AAA |
| `--text-secondary` (#cbd5e1) | `--bg-card` (#0f172a) | 9.8:1 | ✅ AAA |
| `--text-tertiary` (#94a3b8) | `--bg-card` (#0f172a) | 5.7:1 | ✅ AA |
| `--th-blue-secondary` (#3BA9D3) | `--bg-card` (#0f172a) | 5.3:1 | ✅ AA |
| `--color-error` (#f87171) | `--bg-card` (#0f172a) | 5.4:1 | ✅ AA |
| `--text-tertiary` (#94a3b8) | `--bg-page` (#020617) | 6.5:1 | ✅ AA |

---

## Farb-Harmonien für Erweiterungen

Wenn neue Farben benötigt werden, diese Harmonien verwenden:

### Empfohlene Ergänzungsfarben (CI-kompatibel)

| Zweck | Light | Dark | Passt zu |
|-------|-------|------|----------|
| Purple Accent | `#7c3aed` | `#a78bfa` | Premium-Features, Badges |
| Teal Info | `#0d9488` | `#2dd4bf` | Statistiken, Fortschritt alternativ |
| Amber Warn | `#d97706` | `#fbbf24` | Bereits als `--color-warning` |
| Rose Danger | `#e11d48` | `#fb7185` | Alternative zu `--color-error` |

---

## Quick-Reference: Häufige Probleme & Lösungen

| Problem | Was prüfen | Lösung |
|---------|-----------|--------|
| UI sieht billig aus | Priorität 4: Tokens, Konsistenz, Schatten | Token-System konsequent nutzen, Inline-Styles entfernen |
| Dark Mode sieht falsch aus | Priorität 6: Kontrast-Tabelle | Entsättigte Farben, stärkere Schatten, Kontrast prüfen |
| Animation fühlt sich unnatürlich an | Priorität 7: `ease-out`, 150–300ms | `ease-out` für Enter, kürzer als 300ms, Exit 60–70% von Enter |
| Formular-UX ist schlecht | Priorität 8: Labels, Fehler, Validation | Sichtbare Labels, Fehler am Feld, blur-Validation |
| Navigation verwirrt | Priorität 9: Hierarchie, aktiver State | Klare Hierarchie, aktiven State hervorheben, konsistente Position |
| Mobile bricht | Priorität 5: Breakpoints, Touch-Targets | Mobile-first, min 44px Targets, kein hScroll |
| Performance/Ruckeln | Priorität 3: Transform-only, Lazy-Load | Nur transform/opacity animieren, Code-Splitting |
| Accessibility-Audit schlägt fehl | Priorität 1: Die volle Checkliste | Focus-Ringe, ARIA, Kontrast, Keyboard-Nav, Skip-Link |
