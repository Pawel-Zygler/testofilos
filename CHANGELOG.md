# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
