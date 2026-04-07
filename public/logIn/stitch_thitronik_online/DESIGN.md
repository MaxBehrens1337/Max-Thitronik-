# Design System Documentation: Technical Elegance & Tonal Depth

## 1. Overview & Creative North Star: "The Precision Navigator"

This design system is built upon the Creative North Star of **"The Precision Navigator."** For a German learning management system (LMS) dedicated to technical excellence, the UI must feel like a high-end cockpit—authoritative, hyper-functional, yet ethereal. 

We are moving away from the "standard dashboard" aesthetic. By leveraging **topographic layering**, we create a sense of vast digital space. We break the "template" look through **intentional asymmetry**: using large display typography offset against technical data points, and overlapping glass surfaces that suggest a continuous, interconnected learning journey. This system doesn't just display information; it curates an environment of focus and mastery.

---

## 2. Colors: Tonal Architecture

Our palette is rooted in the depth of the deep navy, using light and transparency to guide the eye rather than rigid containment.

### Core Palette
- **Primary (`#6dd2fe` / `#3ba9d3`):** Our "Interactive Light." Use these for progression and focus.
- **Secondary (`#c8e42f`):** "The Achievement Lime." Reserved for success states, completed modules, and brand accents that pop against the dark void.
- **Tertiary (`#ffb3b0` / `#ce132d`):** "The Critical Vector." High-contrast red/pink for errors, alerts, and urgent technical notices.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning content. Boundaries must be defined solely through background color shifts. 
- Use `surface-container-low` for large section backgrounds.
- Use `surface-container-high` for nested content areas.
- Physicality is achieved through color transitions, not lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers.
- **Base Layer:** `surface` (`#0a1325`).
- **Secondary Level:** `surface-container-low` (`#131b2e`).
- **Top Level (Interactive):** `surface-container-high` (`#212a3d`).
Nesting an inner container with a higher tier creates a "natural lift" that feels architectural rather than flat.

### The "Glass & Gradient" Rule
To achieve a premium, technical feel, all primary cards must utilize **Glassmorphism**.
- **Surface:** `surface-container-highest` at 60% opacity.
- **Effect:** `backdrop-filter: blur(12px)`.
- **Signature Gradient:** Use a subtle linear gradient (135°) from `primary` to `primary-container` for CTAs to give them "soul" and a liquid-technical appearance.

---

## 3. Typography: Editorial Authority

We use **Inter** not as a system font, but as a technical instrument.

*   **Display (lg/md):** 3.5rem / 2.75rem. Use for module titles and landing hero sections. Apply `-0.02em` letter spacing to create a "dense" premium look.
*   **Headline (lg/md/sm):** 2rem down to 1.5rem. These are your anchors. Use `headline-lg` for section starts with generous top padding (Spacing 16).
*   **Body (lg/md):** 1rem / 0.875rem. The workhorse. Ensure a line-height of 1.6 for maximum readability in long-form technical documentation.
*   **Label (md/sm):** 0.75rem / 0.6875rem. Use `label-md` in All Caps with `+0.05em` tracking for "Metadata" or "Technical Specs" to mimic engineering blueprints.

---

## 4. Elevation & Depth: Tonal Layering

Shadows and lines are secondary to the physics of light within this system.

### The Layering Principle
Depth is achieved by stacking. A `surface-container-lowest` card placed atop a `surface-container-low` section creates a recessed "well" effect, perfect for data entry or code snippets.

### Ambient Shadows
When an element must float (e.g., a dropdown or modal):
- **Shadow Blur:** 40px - 60px.
- **Shadow Opacity:** 4% - 8%.
- **Color:** Use a tinted shadow based on `on-surface` (`#dae2fc`) rather than pure black. This mimics the way light refracts through glass surfaces.

### The "Ghost Border" Fallback
If accessibility requires a container edge, use the **Ghost Border**:
- **Token:** `outline-variant` (`#3e484e`).
- **Opacity:** 15%.
- **Weight:** 1px.
This provides a "suggestion" of a boundary without breaking the liquid flow of the dark theme.

---

## 5. Components: Technical Primitives

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-container`), white text (`on-primary`), `xl` (1.5rem) roundedness.
- **Secondary:** Ghost style. Transparent fill, `ghost-border` (20% opacity `outline`), `primary` text.
- **Interaction:** On hover, increase the `backdrop-blur` and scale the button by 1.02x.

### Cards & Lists
- **The "No-Divider" Mandate:** Forbid the use of divider lines. Separate list items using `spacing-4` vertical gaps or alternating `surface-container` shifts.
- **Card Radius:** Always use `lg` (1rem) for outer containers and `md` (0.75rem) for inner nested elements.

### Technical LMS Specifics
- **Progress Trackers:** Use `primary` for active paths and `secondary` (`#c8e42f`) for milestones. The track itself should be `surface-container-highest` at 30% opacity.
- **Module Chips:** Use `label-md` typography with a `surface-variant` background and `full` rounding for a pill-shaped "Technical Spec" look.
- **Input Fields:** Use `surface-container-lowest` as the fill. On focus, transition the ghost-border to 100% opacity `primary` and add a subtle `primary` outer glow (4px blur, 10% opacity).

---

## 6. Do's and Don'ts

### Do
*   **DO** use topographic grid patterns (thin, 5% opacity lines) as background textures in hero sections to reinforce the technical theme.
*   **DO** use `display-lg` typography with intentional asymmetry—align it to the far left while the content body sits in a narrower, offset column.
*   **DO** embrace "Breathing Room." If you think there is enough whitespace, add 25% more.

### Don't
*   **DON'T** use 100% opaque, high-contrast borders. It shatters the "Precision Navigator" illusion.
*   **DON'T** use standard "Drop Shadows" (0, 2, 4, black). They feel like 2010-era web design.
*   **DON'T** use pure white (`#FFFFFF`) for body text. Use `on-surface-variant` (`#bec8cf`) to reduce eye strain in the dark environment, reserving `on-surface` for headlines.
*   **DON'T** crowd the screen. This is a learning environment; the UI should "recede" to let the content lead.