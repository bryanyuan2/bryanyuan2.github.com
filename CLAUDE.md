# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal Curriculum Vitae website (bryanyuan2.github.io), deployed as a static site on GitHub Pages. It is a **data-driven React SPA**: React components render page sections, and all CV content lives in JSON files that the components fetch at runtime — so most content edits are JSON edits, not code edits.

## Commands

```bash
npm install              # install dependencies
npm run start:dev        # jsonlint + build CSS + dev TS bundle + live-server (port 3000) + watch
npm run start:prod       # jsonlint + build CSS + minified prod bundle + serve (port 3000)
npm test                 # run Jest tests
npm run test-cov         # Jest with coverage
npm run eslint           # lint src/ and test/ .tsx files
npm run eslint-fix       # lint + autofix
npm run jsonlint:data    # validate asserts/data/*.json
npm run build:css        # compile app.scss -> asserts/css/min/app.min.css (compressed)
npm run build:dev:ts     # browserify src/app/app.tsx -> src/build/bundle.js (dev)
npm run build:prod:ts    # dev build + uglify (production)
```

Run a single test file:
```bash
npx jest --config jest.config.ts test/app/section/experience.test.tsx
```

Docker (serves on port 8080; see README for all methods):
```bash
npm run docker:start     # automated setup via start-docker.sh
```

## Architecture

**Build pipeline (no webpack):** `src/app/app.tsx` is the entry point. Browserify + babelify bundle the `.tsx` tree into `src/build/bundle.js`, which `index.html` loads via a plain `<script>` tag. `src/build/bundle.js` is a committed build artifact. There is no dev server that transpiles on the fly — the `watch:dev` nodemon task rebuilds the bundle and CSS on change while `live-server` serves static files.

**Data-driven sections:** `app.tsx` composes the page from section components (`src/app/section/*.tsx`), passing each a `url` prop pointing at a JSON file in `asserts/data/`. Each section is a self-contained container that fetches its own JSON with `fetch()` in a `useEffect`, stores it in `useState`, and maps the data to markup. To change CV content, edit the JSON in `asserts/data/`; to change layout/structure, edit the section component.

**Shared components:** `src/app/component/*.tsx` are reusable pieces used across sections (`section-header`, `presslist`, `awardslist`, `infobar`). `SectionHeader` renders a section's anchor id and title.

**Styling:** SCSS sources in `asserts/css/src/` compile to a single `asserts/css/min/app.min.css`. `index.html` also pulls Bootstrap 3.3.7 and lightbox2 from CDNs — the layout relies on Bootstrap's grid classes (`col-md-*`, `row`, `container`).

**Testing:** Jest with `ts-jest` in a `jsdom` environment, using `@testing-library/react`. Tests live in `test/app/**/*.test.tsx` and mirror the `src/app/` structure. Because sections fetch their data by URL, tests pass a **mock JSON path** (from `test/app/mock/data/mock*.json`) as the `url` prop rather than mocking `fetch`. When adding a section or changing its JSON shape, update both the real data file and the corresponding mock.

## Conventions

- Components are function components typed with `React.FC<Props>`; each section defines a `Props` interface for its JSON shape with mostly optional fields (JSON data may be partial), and guards rendering accordingly.
- Section containers render a wrapper `<div id="region-<name>">` and a `<SectionHeader>` — follow this pattern for new sections.
- ESLint uses Prettier (`plugin:prettier/recommended`); run `eslint-fix` before committing. Config lives in `.eslintrc.js` / `.prettierrc.json`.
- The asset directory is spelled `asserts/` (not `assets/`) throughout the codebase.

## CI & Branching

GitHub Actions run Jest (`.github/workflows/github-actions-jest.yml`) and a coverage report on every pull request targeting `master` or `dev`. Development happens on `dev` and is merged into `master` via PR.
