# testofilos

philosophy of testing

**Live:** [filoqa](https://pawel-zygler.github.io/testofilos/ "philosophy of testing") _(opens in a new tab)_

---

## UI Variants

Four redesigned branches — same content, different aesthetic:

| Branch | Style | Preview (GitHub) |
|--------|-------|-----------------|
| [`ui/retro`](https://github.com/Pawel-Zygler/testofilos/tree/ui/retro) | 🟢 CRT terminal / phosphor-green | [view code](https://github.com/Pawel-Zygler/testofilos/blob/ui/retro/index.html) |
| [`ui/modern`](https://github.com/Pawel-Zygler/testofilos/tree/ui/modern) | 🟣 Glassmorphism dark / gradient orbs | [view code](https://github.com/Pawel-Zygler/testofilos/blob/ui/modern/index.html) |
| [`ui/minimalist`](https://github.com/Pawel-Zygler/testofilos/tree/ui/minimalist) | ⬜ Editorial white / zero decoration | [view code](https://github.com/Pawel-Zygler/testofilos/blob/ui/minimalist/index.html) |
| [`ui/classic`](https://github.com/Pawel-Zygler/testofilos/tree/ui/classic) | 📰 Newspaper / academic serif | [view code](https://github.com/Pawel-Zygler/testofilos/blob/ui/classic/index.html) |

> **Preview any branch locally:**
> ```bash
> git checkout ui/retro   # or ui/modern, ui/minimalist, ui/classic
> open index.html
> ```

---

## Changelog

### 2026-07-23

#### `ui/classic` — Newspaper / Academic layout
- Playfair Display serif + Source Serif 4 for body text
- Dark masthead banner with gold rule decorations
- Two-column grid: main article + sticky sidebar
- Sidebar includes: Table of Contents, Laws of Testing, Sources
- Drop cap on opening paragraph
- Pullout quotes (dark background + gold left border) for axioms
- Cream `#fdf8f0` background, crimson `#8b2c2c` accent

#### `ui/minimalist` — Editorial white
- DM Sans + DM Mono — clean sans-serif reading experience
- Single 640px column, zero visual decoration
- Sections separated by thin `1px` rules only
- `note` component (light grey box) for axioms/certainties
- Monospace chapter markers and footnote labels
- Inspired by Substack / long-form editorial design

#### `ui/modern` — Glassmorphism dark
- Outfit + Inter fonts
- Three animated gradient orbs floating in background (purple / cyan / pink)
- Numbered section cards with glassmorphism borders
- Language switcher as a pill toggle with gradient active state
- Scroll indicator animation
- `axiom-card` callout with gradient border and glow

#### `ui/retro` — CRT terminal
- VT323 + Share Tech Mono monospace fonts
- Phosphor-green `#00ff41` on near-black background
- CSS CRT scanlines overlay + vignette effect
- Flicker animation simulating phosphor screen aging
- Blinking block cursor on title
- Terminal-style titlebar, prompt lines, and section `##` markers
- Axioms shown in bordered "printout" boxes

---

### Earlier

#### Initial release — `main`
- Dark navy theme (`#0b0d19`) with animated dot-grid background
- Tailwind CSS utility classes
- Inter font
- Language switcher (PL / EN)
- Footnotes with back-links (`↑`)
