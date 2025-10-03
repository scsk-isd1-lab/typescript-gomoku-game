# TypeScript 五目並べゲーム

HTML5 CanvasとTypeScriptを使用して実装した、ブラウザベースの五目並べ（Gomoku）ゲームです。

## 機能

- 19x19の盤面で五目並べをプレイ
- 黒と白の交互のターン管理
- 勝敗判定（水平、垂直、斜めの5つ連続）
- レスポンシブデザイン（モバイル対応）
- キーボードによる操作対応（アクセシビリティ）

## 技術スタック

- TypeScript
- HTML5 Canvas
- Vite (開発サーバー・ビルドツール)
- Jest (テストフレームワーク)
- ESLint & Prettier (コード品質ツール)

## 開発環境のセットアップ

### 前提条件

- Node.js (14.x 以上)
- npm または yarn

### インストール方法

```bash
# リポジトリのクローン
git clone https://github.com/scsk-isd1-lab/typescript-gomoku-game.git
cd typescript-gomoku-game

# 依存関係のインストール
npm install
# または
yarn install

# 開発サーバーの起動
npm run dev
# または
yarn dev
```

開発サーバーが起動すると、ブラウザで `http://localhost:3000` にアクセスしてゲームをプレイできます。

## ビルド方法

```bash
# プロジェクトのビルド
npm run build
# または
yarn build

# ビルド結果のプレビュー
npm run preview
# または
yarn preview
```

ビルドされたファイルは `dist` ディレクトリに生成されます。

## テスト実行

```bash
# テストの実行
npm test
# または
yarn test
```

## プロジェクト構成

```
├── public/             # 静的ファイル
├── src/                # ソースコード
│   ├── components/     # UI コンポーネント
│   │   ├── game-board.ts    # ゲームボード
│   │   ├── game-status.ts   # ゲームステータス表示
│   │   └── reset-button.ts  # リセットボタン
│   ├── controllers/    # ゲーム制御
│   │   └── game-controller.ts  # ゲームコントローラー
│   ├── models/         # データモデル
│   │   ├── board.ts    # ボードモデル
│   │   └── game-state.ts  # ゲーム状態
│   ├── utils/          # ユーティリティ
│   │   └── win-detection.ts  # 勝利判定
│   ├── index.ts        # エントリーポイント
│   └── styles.css      # スタイルシート
├── index.html          # HTMLテンプレート
├── tsconfig.json       # TypeScript設定
└── vite.config.ts      # Vite設定
```

## ライセンス

ISC
