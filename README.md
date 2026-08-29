# Angul-It

A multi-stage CAPTCHA verification app built in Angular, as a hands-on
exercise in Angular fundamentals.

## Overview

Angul-It challenges the user with three verification stages before
granting access:

1. **Image Grid** — select all images matching a randomly chosen animal
   species (cat, dog, or bird) from a 3×3 grid.
2. **Text Repeat** — retype an 8-character, case-sensitive random string
   (letters, digits, and special characters).
3. **Arithmetic** — solve a randomly generated arithmetic problem
   (addition, subtraction, or multiplication).

Progress persists across page refreshes. On completion, a results page
shows total attempts and time spent, with an option to restart.

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- Angular CLI

### Install

```bash
npm install
```

### Run locally

```bash
ng serve
```

Navigate to `http://localhost:4200/`.

### Run tests

```bash
ng test
```

Tests run via Vitest (the Angular CLI's default test runner as of this
project's Angular version).

### Build

```bash
ng build
```

Output is written to `dist/`.

## Architecture notes

- **State management**: a single `CaptchaStateService` (signals-based)
  holds all stage state — status, type, content, attempt count, and
  session timing. See `01-decisions/0001-*.md` for the reasoning behind
  choosing services + signals over NgRx or plain localStorage.
- **Challenge components** are self-contained: each generates its own
  content (or reuses restored content via an `existingContent` input),
  validates its own answer, and emits a `{ passed, content }` result.
  `CaptchaComponent` owns orchestration — routing, error display,
  storing content on a pass, and advancing stages — but has no
  knowledge of any challenge's internal validation logic.
- **Persistence**: progress (stages, current index, attempts, session
  timestamps) is written to `localStorage` on every change via a single
  `effect()`, and restored on `CaptchaStateService` construction.
- **Routing guards**: `/result` is only reachable once all stages are
  passed; the home route redirects back into an in-progress session
  rather than allowing a restart-by-accident.

## Known limitations

- **No multi-tab sync**: state is held in-memory per browser tab, with
  `localStorage` as the persistence layer. Two tabs of the same session
  can diverge, and the last tab to write wins. This app is designed for
  single-tab use.

## Tech stack

- Angular 21.1, standalone components
- Vitest for testing
- CSS custom properties for theming (no CSS framework)
- GitHub Actions CI (`ng test` + `ng build` on push)