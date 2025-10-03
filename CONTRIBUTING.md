# 開発貢献ガイド

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/scsk-isd1-lab/typescript-gomoku-game.git
cd typescript-gomoku-game

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## コーディング規約

このプロジェクトでは、以下のコーディング規約を採用しています：

- ESLintとPrettierの設定に従ったコードフォーマット
- TypeScriptの型を適切に使用
- コンポーネント単位のモジュール化
- JSDocスタイルのコメント

## プルリクエストの手順

1. 新しいブランチを作成（`feature/xx`、`fix/xx`などの命名規則）
2. 変更を実装
3. テストを追加・実行（`npm test`）
4. 静的解析を実行（`npm run lint`）
5. プルリクエストを作成

## テスト

新機能や修正を実装する際は、適切なテストを追加してください。

```bash
# テストの実行
npm test

# 特定のテストファイルのみ実行
npm test -- src/__tests__/models/board.test.ts
```

## ビルド

```bash
# プロジェクトのビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```
