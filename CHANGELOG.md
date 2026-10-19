# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Modern UI experiment (`#experiment-one`) with enhanced readability color palettes (Light Paper, Dark Slate, Warm Book Sepia) and floating theme switcher pill.
- Dedicated "Contact" page view with top-row navigation link (`HOME | CONTACT`) in all three languages.
- "HOME" navigation button in top row allowing instant return to the main landing view.
- Part 1 & Part 2 publication tabs (`Filozofia testowania · Część pierwsza` / `Część druga`) placed directly above the article.
- Sticky frozen header wrapper (`.frozen-header-wrapper`) pinning the language switcher, top navigation, title, subtitle, and publication tabs to the top of the viewport when scrolling.
- Visual regression testing baseline with cross-platform snapshots for macOS (`-darwin.png`) and Linux CI (`-linux.png`).
- GitHub Actions CI/CD test results UI dashboard embedded directly into the workflow summary (`$GITHUB_STEP_SUMMARY`).
- Ukrainian language version (UA) encompassing the complete essay, laws of testing, footnotes, and sticky Table of Contents.
- Language switcher support for Ukrainian (`UA`) with dynamic `lang="uk"` root attribute updating for proper hyphenation, document title, and subtitle localization.
- System sans-serif and monospace fallback fonts to ensure clean typography rendering across Cyrillic characters.

### Changed
- Styled page title (`Filozofia Testowania`) and subtitle (`Próba naukowego podejścia do umiejętności testowania oprogramowania.`) to fit on a single line on desktop/tablet viewports.
- Dynamically positioned sticky sidebar (Table of Contents) below the frozen header (`top: calc(var(--frozen-header-h) + 1.5rem)`) with `max-height` and internal scroll, preventing it from clipping or sliding under the header.
- Added `scroll-margin-top` for all sections and anchor targets to ensure target content lands cleanly below the frozen header when navigating via TOC links.
- Stabilized scrollbar layout using `scrollbar-gutter: stable;` on `html` to eliminate layout shift when toggling between tabs.
- Updated copyright notice year in footer to 2026 across all language versions.
- Updated `README.md` to reflect multilingual support (PL / EN / UA).
- Removed the term "prawa" / "laws" / "закони" across all language versions (Polish, English, Ukrainian), replacing them with "Ustalenia", "Findings", and "Положення" respectively.

### Removed
- Removed 'Usage' section from `README.md` in favor of direct GitHub Pages deployment.
- Removed secondary ProtonMail contact address, retaining exclusively `pawel.zygler@gmail.com`.

## [1.1.0] - 2026-08-06

### Added
- Created `CHANGELOG.md` adhering to the Keep a Changelog standard.
- Dynamic `lang` attribute switching on document root for language-aware hyphenation (PL/EN).

### Changed
- Justified body text alignment (`text-align: justify;` with hyphens) across article paragraphs, blockquotes, callout notes, and laws lists to eliminate ragged right edges.
- Updated `README.md` to document the current single UI layout and point to `CHANGELOG.md`.

### Removed
- Removed legacy documentation and links to alternative UI variants (`ui/retro`, `ui/modern`, `ui/classic`) from `README.md` to retain only the current active UI.

## [1.0.0] - 2026-07-23

### Added
- Editorial layout with DM Sans & DM Mono typography.
- Two-column grid with a sticky right sidebar for the Table of Contents.
- Polish and English content toggle.
- Sections for Intro, Why Testers, Software, Bug definition, Consequences, Test definition, Types, Coverage, Selection, Quality, Summary, Laws of Testing, Sources, and Contact.
