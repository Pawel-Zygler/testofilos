# Test Strategy

Quality strategy and testing architecture for [Filozofia Testowania](https://pawel-zygler.github.io/testofilos/).

## Core Principles

- **Testing as Quality Discovery**: Testing observes system behavior relative to requirements; it provides fast risk information.
- **Shift-Left**: Detect issues early through static typing and pre-commit checks before CI execution.
- **Determinism**: Zero tolerance for flaky tests via Playwright auto-waiting mechanisms.

## Test Distribution

```
       /   E2E (Language, TOC, Footnotes)   \
      /--------------------------------------\
     /   Non-Functional (WCAG a11y, Visual)   \
    /------------------------------------------\
   /        Network & Link Integrity API        \
  /----------------------------------------------\
 /         Static Analysis (tsc, lint-staged)     \
```

## Design for Testability

Contract-based testing using `data-testid` standard:
- **Contract Definition**: Key interactive elements define dedicated test attributes:
  ```html
  <button data-testid="lang-switch-pl">PL</button>
  <button data-testid="lang-switch-en">EN</button>
  ```
- **Dual Support in POM**: `pages/TestofilosPage.ts` supports both `data-testid` selectors and fallback DOM IDs (`#pl-btn`, `#en-btn`), making tests resilient to CSS refactoring and markup changes.

## Environments

- **Production**: `https://pawel-zygler.github.io/testofilos/`
- **CI Runner**: Headless Ubuntu runner executing parallel Chromium instances.

## Quality Standards

- **Architecture**: Page Object Model isolating locators and actions from test assertions.
- **Execution**: Fully parallel execution (`fullyParallel: true`).
- **Debugging**: Automatic trace recording, screenshots, and video captures on test failure.
