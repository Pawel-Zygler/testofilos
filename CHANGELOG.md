# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Ukrainian language version (UA) encompassing the complete essay, laws of testing, footnotes, and sticky Table of Contents.
- Language switcher support for Ukrainian (`UA`) with dynamic `lang="uk"` root attribute updating for proper hyphenation, document title, and subtitle localization.
- System sans-serif and monospace fallback fonts to ensure clean typography rendering across Cyrillic characters.
- Additional ProtonMail contact email (`zygler.pawel@protonmail.com`) placed under the Gmail address in all language contact sections.

### Changed
- Updated `README.md` to reflect multilingual support (PL / EN / UA).
- Removed the term "prawa" / "laws" / "закони" across all language versions (Polish, English, Ukrainian), replacing them with "Ustalenia", "Findings", and "Положення" respectively.

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
