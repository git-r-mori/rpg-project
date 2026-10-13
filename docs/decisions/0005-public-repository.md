# 0005: リポジトリの公開

- ステータス: 採用
- 日付: 2026-10-13

## 背景

CodeRabbit のレビュー機能をすべて使うため、リポジトリを Public にする。公開すると、コード、ドキュメント、コミット履歴、CI の設定が誰でも見られる状態になる。そのため、権利の扱い、個人情報、CI のサプライチェーン対策を公開前に決めておく必要がある。

## 決定

- ライセンスは「All rights reserved」とする。`LICENSE` と README に明記し、`package.json` の `license` は `UNLICENSED` にする。コードは参照用に公開するだけで、利用・複製・改変・再配布は許可しない。
- コミットの作成者メールアドレスは、GitHub の noreply アドレス（`235520555+git-r-mori@users.noreply.github.com`）にする。既存の履歴も書き換えた。過去のプルリクエストが古いコミットを参照し続けるため、リポジトリは作り直した。
- リポジトリ内にローカル環境の絶対パスを書かない。
- GitHub Actions の外部アクションは、commit SHA で固定し、行末のコメントにバージョンを書く。更新は Dependabot（`.github/dependabot.yml`）が週 1 回提案する。
- CodeRabbit の設定は `.coderabbit.yaml` に置く。レビューは日本語とし、`AGENTS.md` と `.cursor/rules/` の規約に加えて、層ごとの重点項目を `path_instructions` で伝える。

## 検討した代替案

- Private のまま CodeRabbit の有料プランを使う: 公開に伴う対策は不要だが、費用がかかる。
- MIT などのオープンソースライセンスにする: 再利用を歓迎できるが、現時点で他者の利用を想定していないため採用しない。必要になったら、この ADR を置き換える。
- Actions をメジャーバージョンのタグ（`@v7` など）で指定する: 更新の手間はないが、タグの付け替えで意図しないコードが実行されるおそれがある。

## 影響

- 秘密情報は、これまでどおり環境変数、GitHub Secrets、AWS 側のサービスで管理する。公開リポジトリではフォークからのプルリクエストに Secrets が渡らないため、`pull_request_target` は使わない。
- GitHub の利用規約により、公開リポジトリは GitHub 上で閲覧とフォークができる。All rights reserved でも、これは防げない。
- Actions の更新は、Dependabot のプルリクエストをレビューしてマージする。
