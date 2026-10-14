# AGENTS.md

Guide for AI coding agents working in this repository. Read this before making any change.

## Product

A login-free web app that generates an RPG character (class, stats, skills, name, epithet, personality, background) from a short questionnaire. Generated characters can be published via a share URL.

- Game values (stats, class, skill effects) are decided by deterministic application logic.
- AI only writes prose: name, epithet, personality, background, and skill flavor text.

## Current phase

Phase 1 (project setup) and phase 2 (diagnosis logic in `packages/domain` and screens in `apps/web`; answers are diagnosed locally in the browser) are complete. CI (`.github/workflows/ci.yml`) runs `pnpm verify` on pull requests and pushes to `main`. Upcoming phases:

1. Phase 3: backend (`backend/*`), AI narrative generation, share API
2. Phase 4: AWS CDK (`infra/`), CD, E2E (`e2e/`), documentation

Create directories that do not exist yet in the phase that needs them, and add them to `pnpm-workspace.yaml`.

## Package map and dependency direction

| Path              | Package       | Responsibility                             |
| ----------------- | ------------- | ------------------------------------------ |
| `packages/domain` | `@rpg/domain` | Types, Zod schemas, diagnosis logic, data  |
| `apps/web`        | `@rpg/web`    | React frontend                             |
| `backend/*`       | (planned)     | Lambda handlers, AI integration, share API |
| `infra`           | (planned)     | AWS CDK v2                                 |
| `e2e`             | (planned)     | Playwright                                 |

Dependencies flow one way only: `web → domain`, `backend → domain`, `infra → backend` (as bundle input).

- `domain` must not depend on React, the AWS SDK, or `node:*`.
- `web` must not import `backend`.
- Never import a feature's internal files directly; go through `features/<name>/index.ts`.

These rules are enforced by ESLint (`no-restricted-imports` in `eslint.config.js`). Do not loosen the rules to work around them.

## Development principles

1. **Split files by responsibility.** One file has one responsibility, and its name reveals that responsibility. Split a file before it grows large: aim for at most 200 lines, and split earlier if it starts mixing concerns (for example, data and logic, or UI and calculation).
2. **Implement only what the current requirement needs.** Do not add options, parameters, layers, or extension points for hypothetical future use. Future features listed in the requirements are design constraints, not tasks; keep the structure open to them without writing code for them.
3. **Design for reuse and testability.** Prefer small pure functions with explicit inputs and outputs. Pass dependencies such as time, randomness, and I/O as arguments instead of reaching for them inside. Keep components presentational where possible and move logic into functions or hooks that can be tested without rendering.
4. **Consider extracting shared code once the same logic appears a second time.** Before writing similar code again, look for an existing implementation and reuse or extract it. Extract only when the duplicates share the same meaning, not just similar shape, and place the shared code at the lowest layer that all callers may depend on (for example, `@rpg/domain` for logic used by both web and backend).

## Language policy

| Audience  | Language | Applies to                                                                                |
| --------- | -------- | ----------------------------------------------------------------------------------------- |
| AI agents | English  | `AGENTS.md` files, `.cursor/rules/*.mdc`, JSDoc, code comments, test names, lint messages |
| Humans    | Japanese | `README.md`, `docs/**` (including ADRs), UI text, `.env.example` comments                 |

Identifiers (variables, functions, files) are always English.

## Documentation comments

Every exported function, component, hook, constant, type, and schema must have an accurate JSDoc comment in English.

- First line: one sentence describing what it does or represents, not how.
- Add `@param` for each parameter and `@returns` for non-void functions. Skip types; TypeScript already provides them.
- Add `@throws` when the function can throw (for example, Zod `parse`).
- Components: describe what is rendered; document props on the props type, one comment per prop.
- Keep comments in sync with behavior. An outdated comment is a bug.
- Do not narrate obvious code or record change history in comments.

## Commands

Run everything from the repository root.

```sh
pnpm install       # install dependencies
pnpm dev           # web dev server (http://localhost:5173)
pnpm verify        # format:check → lint → typecheck → test → build
pnpm format        # format with Prettier
```

Single package: `pnpm --filter @rpg/domain test`, etc.

## Git workflow

The project uses GitHub Flow.

- `main` is always releasable. Do not commit directly to `main`; the only exception is the initial commit.
- Create a short-lived branch from the latest `main` for each change, named `<type>/<short-kebab-description>`, e.g. `feat/diagnosis-scoring` or `fix/stat-normalization`. Use the same types as commit messages.
- Keep one branch to one purpose. Split unrelated changes into separate branches.
- Run `pnpm verify` before every push.
- Merge into `main` through a pull request after CI passes (if CI exists), using squash merge. Delete the branch after merging. A human performs the merge.
- For implementation tasks, agents commit, push, and open pull requests on their own by following `.cursor/rules/implementation-flow.mdc`.

### Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) in English: `<type>(<optional scope>): <summary>`.

- Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `build`, `perf`, `style`.
- Scopes: package or area names such as `domain`, `web`, `backend`, `infra`, `e2e`.
- Summary: imperative mood, lowercase, no trailing period, at most 72 characters, e.g. `feat(domain): add stat normalization`.
- Explain why in the body when the reason is not obvious. Mark breaking changes with `!` or a `BREAKING CHANGE:` footer.
- Pull request titles follow the same format, because squash merge uses the title as the commit message on `main`.

### Pull requests

1. Push with `git push -u origin <branch>`.
2. Write the body in Japanese, since humans review it, with these sections:
   - `## 概要`: what the change does and why.
   - `## 変更点`: main changes as a bullet list.
   - `## テスト`: what you ran and the result, e.g. `pnpm verify` passed.
3. Write the body to a temporary file outside the repository and pass it with `--body-file`, because multi-line `--body` strings break easily in PowerShell:
   `gh pr create --draft --base main --title "<conventional commit title>" --body-file <path>`

## Definition of done

- `pnpm verify` passes.
- New or changed logic has tests next to the source (`*.test.ts`).
- New or changed exports have accurate JSDoc.
- Changes involving a design decision that meets the criteria in "Architecture decision records" add an ADR under `docs/decisions/` (written in Japanese).
- Never report a test or command as passing unless you actually ran it.

## Architecture decision records

Write an ADR only for a decision that meets at least one of these criteria:

1. It is costly to reverse (stored data format, share URL id scheme, infrastructure, license or visibility).
2. Alternatives were compared and rejected, and someone may propose them again.
3. It deliberately departs from common practice or imposes a constraint (a pinned version, AI never decides game values).

Rule of thumb: write one if your future self or an agent would likely ask "why is it like this, and may I change it?"

Do not write ADRs for:

- Anything evident from the code or configuration.
- Procedures and convention details. `AGENTS.md` and `.cursor/rules/` are the source of truth.
- Spec details and game balance values. `docs/specs/`, the data, and JSDoc are the source of truth.
- Minor library choices, refactoring, or balance tuning.

An ADR records why: background, decision, rejected alternatives, and consequences. Link to the source of truth for how instead of copying it. Never delete or merge ADRs; supersede them with a new ADR. Edits that keep the decision unchanged, such as replacing duplicated details with a link, may be made in place. See ADR 0007.

## Do not

- Put secrets such as API keys in source code, logs, or the frontend.
- Let AI freely decide stats, classes, or skill effects.
- Implement features out of scope for the initial release (conversational diagnosis, image generation, login, collection, battles, etc.).
- Add unused abstractions or large dependencies such as state management libraries or game engines.
- Reference GitHub Actions by tag. Pin them to a full commit SHA with the version in a trailing comment (e.g. `@<sha> # v7.0.1`).
- Write local absolute paths or personal information in the repository. The repository is public.
- Bump dependency versions without checking compatibility. For example, typescript-eslint supports TypeScript `<6.1` only, so TypeScript is pinned to `~6.0`. Check `engines` too: the local Node.js is 24.13.

## References

- `docs/decisions/`: design decisions (ADRs, in Japanese). To reverse a past decision, supersede it with a new ADR.
- `docs/specs/`: current specifications (in Japanese), updated as the behavior changes. e.g. `diagnosis.md` for the diagnosis rules.
- Each package's `AGENTS.md`: package-specific responsibilities and change procedures.
- `.cursor/rules/`: coding conventions per file type.
