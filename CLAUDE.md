# CLAUDE.md

Guidance for Claude Code when working in this repository. This is the canonical
project-memory file (Claude Code loads it automatically each session — there is
no separate `memory.md`; put durable project knowledge here).

## What this is

**OW2 Support Stats** — a static single-page app for browsing and **comparing
Overwatch 2 support heroes** across the stats that matter for support play:
DPS, healing per second (HPS), ultimate charge cost, ability cooldowns,
survivability, and a full ability-by-ability breakdown. No backend; all hero
data is a curated TypeScript dataset.

## Tech stack

React 18 · TypeScript (strict) · Vite 5 · Tailwind CSS v3 · React Router 6 ·
Recharts 2 · Vitest + React Testing Library. Path alias `@/*` → `src/*`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install deps (run automatically by the SessionStart hook on web) |
| `npm run dev` | Vite dev server (http://localhost:5173) |
| `npm run build` | `tsc -b` typecheck + production build to `dist/` |
| `npm run preview` | Serve the production build (default port 4173) |
| `npm test` | Run the full Vitest suite |
| `npm run lint` | ESLint (zero warnings allowed — `--max-warnings 0`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run portraits` | Regenerate the SVG hero portraits in `public/portraits/` |

**Before committing**, run `npm run typecheck && npm run lint && npm test`.
All three must be clean (the repo treats lint warnings as failures).

## Architecture

```
src/
  types/hero.ts        Data model: SupportHero + sub-interfaces. Everything depends on this.
  types/validate.ts    isValidSupportHero() runtime guard (used by data tests).
  data/heroes/         One file per hero + index.ts barrel (heroes[], heroById). Source of truth.
  utils/stats.ts       computeDps, min/avgCooldown, heroMetrics, METRIC_LABELS/UNITS.
  utils/normalize.ts   Radar normalization (0–100 across the full roster).
  utils/colors.ts      Chart series colors + per-hero accent.
  context/             compare-context.ts (context + constants) and CompareContext.tsx (provider).
  hooks/useCompare.ts  Accessor for the comparison selection.
  components/          Presentational components (+ charts/, compare/).
  pages/               HeroListPage, HeroDetailPage, ComparePage, NotFoundPage.
```

Routes: `/` (list), `/hero/:id` (detail), `/compare` (comparison), `*` (404).

### Comparison selection state
Selection lives in the **URL** (`/compare?ids=ana,mercy`) via `useSearchParams`,
managed by `CompareProvider`. It's shareable and survives reloads. Cap is
`MAX_COMPARE = 4`, minimum to render a comparison is `MIN_COMPARE = 2`.

> Gotcha: mutations in `CompareProvider` derive the next selection from the
> latest URL params inside the `setSearchParams` updater (not a render closure).
> URL navigation does **not** batch-accumulate within a single synchronous
> `act()`/render — each real user click is its own render. Tests that fire
> several toggles must wrap each in its own `act()`.

### Charts
- **Radar** (`RadarComparison`) uses **normalized 0–100** values. Ranges are
  computed once over the **entire roster** (`buildMetricRanges`) so a hero's
  score is stable no matter who else is selected. "Lower is better" metrics
  (`ultCost`, `avgCooldown`) are inverted so higher always = stronger.
- **Bar chart** (`StatBarChart`) shows **raw** values, sorted best→worst.
- Recharts' `ResponsiveContainer` renders at 0×0 in jsdom — component tests
  mock it with a fixed size (see `ComparePage.test.tsx`).

## Data model & invariants

Each hero is a `SupportHero`. A hero's kit is a flat `abilities[]` array where
every numeric field is optional, so burst / beam / aura / heal-over-time
supports share one shape. Headline numbers are mirrored in `weapon`, `healing`,
and `ultimate` summary blocks.

**Per-second values:** the Overwatch wiki lists per-second figures, so the
dataset carries them: `weapon.dps`, `weapon.hps` (healing/sec), and ability-level
`dps`/`hps` for sustained sources (weapons, beams, auras, channels). Burst
abilities keep per-cast `damage`/`healing` only — per-second is not meaningful
for an instantaneous cast. The ability table has distinct Dmg / DPS / Heal / HPS
columns; do not conflate per-hit and per-second.

**Strategies:** each hero has a `strategies[]` array of curated combo/optimization
tips (`{ title, detail, category }`, category = `healing | damage | utility`),
shown in the "Combos & Strategies" panel on the profile (`StrategyList`). These
are sourced from community guides — when editing, prefer concrete, current
combos and keep each tip to one actionable idea.

Data-integrity tests (`src/data/heroes/heroes.test.ts`) enforce — keep these green:
- Exactly **12** heroes; ids unique, lowercase, slug-style.
- Every hero passes `isValidSupportHero` (incl. exactly one `kind:'ultimate'`
  ability whose name matches `ultimate.name`).
- `survivability.total === health + armor + shield`.
- `weapon.dps === computeDps(damage, fireRate)` (= `round2(damage*fireRate)`).
- A weapon-kind ability's `dps`/`hps`, if present, match the `weapon` block.
- All per-second values are non-negative.
- Every hero has ≥2 strategies, each with a non-empty title/detail and a valid category.

**`dataConfidence`:** ability values that are patch-volatile or estimated are
flagged `'approximate'` (shown as an `approx` badge). Support balance shifts
every patch and many exact heal rates can't be verified automatically (see
constraints below), so prefer marking a value `approximate` over asserting a
number you can't source. The app is "accurate as of the early-2026 patch".

### Adding or editing a hero
1. Add/edit `src/data/heroes/<id>.ts` (copy an existing file for the shape).
2. Register it in `src/data/heroes/index.ts` (`heroes` array, alphabetical).
3. Add a portrait id to `scripts/generate-portraits.mjs` and run `npm run portraits`.
4. Run the data tests — they'll catch missing/ inconsistent fields.

## Environment & external constraints

- **Fandom wiki blocks automated fetching** (`overwatch.fandom.com` returns 403
  to WebFetch). Use `WebSearch` for roster/ability facts, or ask the user to
  paste values. Don't assume you can scrape the wiki directly.
- **Browser/screenshot tooling:** the network allowlist blocks Playwright's
  Chromium download host (`cdn.playwright.dev`). To drive a headless browser,
  download a matching **Chrome for Testing** build from `storage.googleapis.com`
  (which *is* reachable) into `/tmp`, then launch `playwright-core.chromium`
  with `executablePath` + `--no-sandbox`. The needed system libs are already
  present. Keep that download and any screenshot script in `/tmp` — don't commit
  them or add `playwright` to `package.json`.
- **Portraits** in `public/portraits/*.svg` are generated placeholders, not
  official art. `HeroPortrait` falls back to an initials tile if an image is
  missing, so the UI never breaks.
- Bundle is ~600 kB (Recharts is heavy); the Vite size warning is expected and
  non-blocking.

## Git / branch conventions

- Develop on `claude/overwatch-support-stats-app-NUyal`, commit with descriptive
  messages, push with `git push -u origin <branch>`.
- `main` is the canonical app branch (the user chose "main = the app"; there is
  no PR-based flow here). Keep `main` fast-forwarded to the feature branch after
  pushing, unless told otherwise.
- A stop-hook checks for uncommitted changes — commit and push before ending.

## SessionStart hook

`.claude/hooks/session-start.sh` (registered in `.claude/settings.json`) runs
`npm install` on web sessions only (`$CLAUDE_CODE_REMOTE`), so deps are ready
for tests/lint/build. It takes effect for new sessions once merged into the
default branch.
