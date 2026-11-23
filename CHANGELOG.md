# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Back-to-top button (`↑`) that appears after one screen of scrolling, localized in PL / EN / UA.
- Collapsible table of contents on mobile (`<details>`), closed by default so the article starts on the first screen; always open in the desktop sidebar.
- Cloudflare Pages hosting at `https://testofilos.pages.dev/` with a preview deployment for every pull request; production and previews are smoke-tested after each deploy.
- Build step (`npm run build`, `scripts/build.mjs`) that publishes only public files to `_site/` and generates the `_headers` file.
- Local static server (`scripts/serve.mjs`) that applies `_headers` like Cloudflare Pages, so the test suite runs against the built site with production headers.
- `@deploy` test suite (`tests/deployment.spec.ts`): security headers, no repository files published, custom 404 page, self-hosted fonts without third-party requests or CSP violations, page metadata.
- Custom 404 page in PL / EN / UA.
- Favicon, meta description, canonical URL, Open Graph and Twitter card metadata with a social preview image.
- Logo (`true ≠ false`, `public/logo.svg`) to the left of the page title and subtitle; on screens up to 680 px it is smaller and sits next to the title.
- Redirect from the old GitHub Pages address to the new site.
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

### Fixed
- Text contrast: `--text-dim` changed from `#999` (2.7:1) to `#707070` (4.7:1) and note labels use `--text-secondary`, so axe reports no `color-contrast` violations (37 before).
- Page subtitle is no longer justified.

### Changed
- Less scrolling: tighter vertical rhythm (paragraph line-height 1.85 → 1.7, smaller gaps between sections, headings, notes and the findings list). The article is about 13% shorter on desktop and the whole page about half as many screens on a phone.
- On screens up to 860 px the header is no longer sticky (it covered 41% of a 390 px screen and 63% of a 320 px screen); text is left-aligned there to avoid word gaps.
- Part tabs show only "Część pierwsza / Część druga" below 600 px so they fit in one row.
- Desktop sticky header is 12 px lower.
- Moved hosting from GitHub Pages to Cloudflare Pages; the project name is `testofilos` everywhere (Cloudflare project, package name, URLs in docs).
- DM Sans and DM Mono fonts are now self-hosted (`public/fonts/`) instead of loaded from Google Fonts.
- CI uses Node.js 24 (Node 20 is end-of-life) and current major versions of the GitHub Actions; Playwright runs against the built `_site/` instead of the repository root.
- CI permissions reduced to `contents: read` by default; GitHub Pages permissions and concurrency apply only to the redirect job.
- Styled page title (`Filozofia Testowania`) and subtitle (`Próba naukowego podejścia do umiejętności testowania oprogramowania.`) to fit on a single line on desktop/tablet viewports.
- Dynamically positioned sticky sidebar (Table of Contents) below the frozen header (`top: calc(var(--frozen-header-h) + 1.5rem)`) with `max-height` and internal scroll, preventing it from clipping or sliding under the header.
- Added `scroll-margin-top` for all sections and anchor targets to ensure target content lands cleanly below the frozen header when navigating via TOC links.
- Stabilized scrollbar layout using `scrollbar-gutter: stable;` on `html` to eliminate layout shift when toggling between tabs.
- Updated copyright notice year in footer to 2026 across all language versions.
- Updated `README.md` to reflect multilingual support (PL / EN / UA).
- Removed the term "prawa" / "laws" / "закони" across all language versions (Polish, English, Ukrainian), replacing them with "Ustalenia", "Findings", and "Положення" respectively.
- The favicon shows the `≠` sign from the logo instead of the `FT` monogram, and the social preview image (`og-image.png`) shows the header with the logo.

### Removed
- Removed 'Usage' section from `README.md` in favor of direct GitHub Pages deployment.
- Removed secondary ProtonMail contact address, retaining exclusively `pawel.zygler@gmail.com`.

### Security
- Deployments no longer publish the whole repository (`package.json`, tests, `.agents/`, docs); only `index.html` and `public/` are deployed.
- Added Content-Security-Policy (with a hash of the inline script), `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy` and HSTS headers.
- Visitors' IP addresses are no longer sent to Google when the page loads (fonts are self-hosted).

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
