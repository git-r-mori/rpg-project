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
- `src/shared/`: helpers used by several features (e.g. `IdSchema`). Not exported from `src/index.ts`.
- `src/data/`: tunable data without logic: questions, classes, skills, and stat labels, plus `DIAGNOSIS_DATA` bundling them for `diagnose`. Exported from `src/index.ts`. `data.test.ts` checks that the data is valid and consistent.
- `src/testing/`: shared test fixtures. `fixtures.ts` holds small questions, classes, and skills so logic tests do not break when the real data is tuned. Not exported from `src/index.ts`.

Features:

- `features/character`: schemas for stats, classes, skills, and diagnosed characters. `STAT_KEYS` is the single source of truth for stat keys.
- `features/questionnaire`: schemas for questions and answers.
- `features/diagnosis`: `diagnose(answers, data)` turns answers into a character. Each step (resolve options, sum effects, compute ranges, normalize stats, choose class, choose skills) is a separate pure function. Game data is passed in, not imported.
  The diagnosis spec (stat range, class and skill selection rules) is in `docs/decisions/0006-diagnosis-spec-and-schema.md`.

## Common changes

- Add a feature: create `src/features/<name>/`, export it from its `index.ts`, and re-export it from `src/index.ts`. Put tests next to the source and add JSDoc to every export.
- Add a stat: append it to `STAT_KEYS`, then fix every type error that follows (including `STAT_LABELS`).
- Edit classes: keep the total weight equal across classes and give each class more skill candidates than `SKILLS_PER_CHARACTER`. Run `data.test.ts` and `reachability.test.ts` (every class must be reachable) to check.
- Refer to classes, skills, and questions by id. Store ids, not names, in diagnosis results.

## Verify

```sh
pnpm --filter @rpg/domain test
pnpm --filter @rpg/domain typecheck
```
