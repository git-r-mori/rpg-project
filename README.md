# RPGキャラ診断

質問に答えると、あなただけの RPG キャラクター（職業・能力値・スキル・名前・二つ名・性格・背景）が生成される Web アプリです。ログインなしで利用でき、生成したキャラクターは共有 URL で公開できます。

> 現在はフェーズ1（プロジェクト作成と Hello World）の段階です。

## 必要な環境

- Node.js 24 以上
- pnpm 10（`corepack enable` で `package.json` の `packageManager` に指定したバージョンが使われます）

## セットアップと起動

```sh
pnpm install
pnpm dev
```

ブラウザで http://localhost:5173 を開くと Hello World が表示されます。

## 主なコマンド

| コマンド      | 内容                                                  |
| ------------- | ----------------------------------------------------- |
| `pnpm dev`    | フロントエンドの開発サーバーを起動                    |
| `pnpm verify` | format:check、lint、typecheck、test、build を順に実行 |
| `pnpm format` | Prettier でコードを整形                               |
| `pnpm test`   | 単体テスト（Vitest）                                  |

## 構成

```
apps/web/          React + Vite + Tailwind CSS（@rpg/web）
packages/domain/   型・Zod スキーマ・診断ロジック（@rpg/domain）
docs/decisions/    設計判断の記録（ADR）
.github/workflows/ CI（プルリクエストと main への push で pnpm verify を実行）
```

backend、infra、e2e は今後のフェーズで追加します。

## 開発ルール

- ファイルは責務ごとに分け、1 ファイルが肥大化しないようにする（目安 200 行以内）。
- 要件に対して必要最低限の実装にとどめ、その時点で不要な実装はしない。将来機能は構造上の制約として考慮するが、コードは書かない。
- 関数やコンポーネントは、再利用しやすくテストしやすい形にする（入出力が明確な小さな関数、時刻・乱数・I/O は引数で受け取る、ロジックはコンポーネントの外に置く）。
- 同じ処理を 2 回以上実装する場合は共通化を検討する。

## ブランチ戦略とコミット規約

GitHub Flow を採用しています。詳しくは [ADR 0003](docs/decisions/0003-branch-strategy-and-commit-convention.md) を参照してください。

- `main` は常にリリース可能な状態に保ち、直接コミットしない（初回コミットのみ例外）。
- 変更ごとに最新の `main` から短命のブランチを作る。名前は `<種別>/<内容>` とする（例: `feat/diagnosis-scoring`、`fix/stat-normalization`）。
- プッシュ前に `pnpm verify` を実行する。
- プルリクエストで CI が通ったら、squash マージで `main` に取り込み、ブランチを削除する。
- コミットメッセージとプルリクエストのタイトルは [Conventional Commits](https://www.conventionalcommits.org/ja/) に従い、英語で書く（例: `feat(domain): add stat normalization`）。

## AI コーディングエージェントで開発する場合

ルートの [AGENTS.md](AGENTS.md) に、構成・コマンド・完了の定義・禁止事項をまとめています。各パッケージの `AGENTS.md` と `.cursor/rules/` も参照してください。

エージェント向けの文書（`AGENTS.md`、`.cursor/rules/`）、JSDoc、コードコメント、テスト名は英語で書きます。README や `docs/` など人間向けの文書と画面の文言は日本語です。詳しくは [ADR 0002](docs/decisions/0002-documentation-language-and-jsdoc.md) を参照してください。
