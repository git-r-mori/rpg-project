# @rpg/domain

Pure TypeScript package holding diagnosis logic, types, Zod schemas, and game data. Used by both web and backend.

## Responsibilities

- Types and Zod schemas for characters and API contracts
- Diagnosis logic (scoring, normalization, class decision, skill selection)
- Tunable game data (questions, classes, skills)

## Out of scope

- UI, React, browser APIs
- AWS SDK, HTTP, file I/O, `node:*` modules
- Implicit dependence on randomness or the current time (take them as arguments when needed)

## Layout

- `src/index.ts`: public API. Other packages import only from here (`@rpg/domain`).
- `src/features/<name>/`: logic, schemas, and tests per feature. Each feature's `index.ts` is its public API.
- `src/data/`: tunable data without logic (added in phase 2).
- `src/testing/`: shared test fixtures (added in phase 2).

The only feature right now is `features/greeting`, which verifies the monorepo wiring.

## Common changes

- Add a feature: create `src/features/<name>/`, export it from its `index.ts`, and re-export it from `src/index.ts`. Put tests next to the source and add JSDoc to every export.

## Verify

```sh
pnpm --filter @rpg/domain test
pnpm --filter @rpg/domain typecheck
```
