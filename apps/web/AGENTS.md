# @rpg/web

Frontend built with React, Vite, Tailwind CSS v4, and React Router.

## Responsibilities

- Rendering screens and handling user interaction
- Screen state (`useState` / `useReducer` only; do not add a state management library)
- Calling the API (phase 3 onward)

## Out of scope

- Diagnosis logic and game rules (they belong in `@rpg/domain`)
- Importing `backend/*`, calling AI APIs directly, holding secrets

## Layout

- `src/app/`: router, layout, and the app root
- `src/pages/`: one component per route. Keep them thin; put logic in features.
- `src/features/<name>/`: components, hooks, and reducers per feature
  - `features/diagnosis`: the questionnaire and result screens. `diagnosisReducer` holds the answers, `diagnosisProgress` decides whether to show a question or the result, and `toCharacterView` resolves ids for display, and `emptyOptionSlotCount` pads questions with fewer options so every question card has the same height. These are pure and have tests; the components only render them.
- `src/ui/`: feature-agnostic UI (frames, buttons, etc.)
- `src/index.css`: Tailwind import and design tokens (`@theme`)

User-facing text is Japanese. Code, JSDoc, and comments are English.

## Common changes

- Add a page: create a component in `src/pages/` and register the route in `src/app/router.tsx`.
- Add a color or font: define it in `@theme` in `src/index.css` and use it as a Tailwind utility.

## Verify

Unit tests use Vitest for reducers and pure functions. There is no component rendering test setup; check screens in the browser.

```sh
pnpm dev                          # http://localhost:5173
pnpm --filter @rpg/web test
pnpm --filter @rpg/web typecheck
pnpm --filter @rpg/web build
```
