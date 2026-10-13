# 0001: pnpm モノレポと層構成

- ステータス: 採用
- 日付: 2026-10-13

## 背景

フロントエンド、診断ロジック、バックエンド（Lambda）、インフラ（CDK）を 1 リポジトリで管理する。実装と保守は主に AI コーディングエージェントが行うため、構成が明確で、境界違反を機械的に検出できることを重視する。

## 決定

- リポジトリ全体を pnpm ワークスペースのモノレポとして構成する。
- パッケージは `@rpg/` スコープ。現時点は `@rpg/domain`（`packages/domain`）と `@rpg/web`（`apps/web`）。backend・infra・e2e は必要になったフェーズで追加する。
- 依存は一方向（web/backend → domain）。domain は React・AWS SDK・`node:*` に依存しない。ESLint の `no-restricted-imports` で強制する。
- 機能単位で `features/<機能名>/` にまとめ、`index.ts` を公開 API とする。テストはソースの隣に置く。
- `@rpg/domain` はビルドせず、`exports` で TypeScript ソースを直接公開する。Vite（web）と今後の esbuild（Lambda）がそのままバンドルする。
- 検証は `pnpm verify`（format:check → lint → typecheck → test → build）に集約する。
- エージェント向けに、ルートと各パッケージの `AGENTS.md`、`.cursor/rules/*.mdc` を置く。

## バージョン選定

- TypeScript は `~6.0`。7.0 が公開済みだが、typescript-eslint 8.x の対応範囲が `<6.1` のため。
- React 19.3、React Router 8.4、Vite 8.3、Tailwind CSS 4.3（`@tailwindcss/vite`）、Zod 4.6、Vitest 5.0、ESLint 10（flat config）。
- Node.js は 24 系（`engines` と `.nvmrc` で指定）。

## 影響

- domain を変更すると web の型チェックとビルドに即座に反映される（ビルド手順が不要）。
- domain のソースは web・backend のビルド設定（TypeScript を扱えること）に依存する。
