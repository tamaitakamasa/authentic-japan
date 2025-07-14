# Authentic Japan プロジェクト概要

## プロジェクト概要

Authentic Japanは、日本各地の魅力を「旅」を通じて伝え、人と人を繋ぐプラットフォームです。地域を愛するナビゲーターたちが、その地を訪れる人々に独自の旅体験を提供します。

### ウェブサイトURL
- 本番環境: https://authenticjapan.travel

### 対応言語
- 日本語 (ja) - デフォルト
- 英語 (en)
- フランス語 (fr)

## 技術スタック

### フロントエンド
- **フレームワーク**: Next.js 14.2.14 (App Router)
- **言語**: TypeScript 5
- **スタイリング**: 
  - Tailwind CSS 4.0.6
  - Sass 1.79.4
  - CSS Modules
- **UIライブラリ**:
  - Radix UI (Dialog, Dropdown Menu, Checkbox, Scroll Area等)
  - Lucide React (アイコン)
  - Swiper 11.1.14 (スライダー)
  - React Player 2.16.0 (動画プレーヤー)

### フォーム処理
- React Hook Form 7.54.2
- Zod 3.24.2 (バリデーション)

### アニメーション
- Motion 12.4.3

### ビルドツール
- Bun (パッケージマネージャー)
- PostCSS

### 開発ツール
- ESLint
- Prettier (Tailwind CSS Plugin付き)

## 主要機能

### 1. 多言語対応
- 3言語対応（日本語、英語、フランス語）
- 動的ルーティングによる言語切り替え
- middlewareによる言語判定とリダイレクト

### 2. コンテンツ管理
- WordPress APIとの連携によるコンテンツ管理
- Bokun APIとの連携によるツアー情報の取得

### 3. 主要ページ
- **ホーム**: ヒーロースライダー、ナビゲーター紹介、地域紹介、ツアー情報、ニュース、Instagram連携
- **ナビゲーター一覧・詳細**: ガイドの紹介
- **ツアー一覧**: フィルタリング機能付きツアー検索
- **地域紹介**: 日本各地域の紹介
- **ニュース一覧・詳細**: お知らせ情報
- **会社概要**: About Us
- **お問い合わせ**: コンタクトフォーム

### 4. SEO対策
- サイトマップ生成
- robots.txt
- 構造化データ
- メタデータ管理

## プロジェクト構造

```
authentic-japan/
├── app/                    # Next.js App Router
│   ├── [lang]/            # 言語別ルーティング
│   │   ├── page.tsx       # ホームページ
│   │   ├── navigator/     # ナビゲーター関連
│   │   ├── tours/         # ツアー関連
│   │   ├── region/        # 地域関連
│   │   ├── news/          # ニュース関連
│   │   ├── about/         # 会社概要
│   │   ├── contact/       # お問い合わせ
│   │   └── layout.tsx     # 共通レイアウト
│   ├── robots.ts          # robots.txt生成
│   └── sitemap.ts         # サイトマップ生成
├── components/            # Reactコンポーネント
│   ├── ui/               # 汎用UIコンポーネント
│   ├── Home/             # ホームページ用コンポーネント
│   ├── Layout/           # レイアウトコンポーネント
│   ├── Navigator/        # ナビゲーター関連
│   ├── Tour/             # ツアー関連
│   ├── Region/           # 地域関連
│   ├── News/             # ニュース関連
│   ├── Contact/          # お問い合わせ関連
│   └── About/            # 会社概要関連
├── constants/             # 定数定義
├── lib/                   # ユーティリティ関数
├── types/                 # TypeScript型定義
├── styles/                # SCSSスタイル
├── public/                # 静的ファイル
└── hooks/                 # カスタムフック
```

## 外部連携

### WordPress API
- **エンドポイント**: https://shimatoworks.xsrv.jp/transformativetour/wp-json/wp/v2
- **用途**: 
  - サイトオプション（ホームスライダー、各種設定）
  - ナビゲーター情報
  - 地域情報
  - ニュース記事
  - メディアファイル

### Bokun API
- **エンドポイント**: https://bokun-wrapper.pages.dev
- **用途**: ツアー・アクティビティ情報の取得

### Instagram
- **アカウント**: @authentic_japan_official
- **用途**: ホームページでのフィード表示

## データフロー

1. **コンテンツ取得**:
   - WordPress APIからコンテンツデータを取得
   - Bokun APIからツアー情報を取得
   - キャッシュ機構により、パフォーマンスを最適化

2. **多言語対応**:
   - URLパスベースの言語切り替え（/ja/, /en/, /fr/）
   - middlewareによる自動言語判定とリダイレクト

3. **レンダリング**:
   - Server Side Rendering (SSR)
   - 動的インポートとSuspenseによる最適化

## セキュリティ・パフォーマンス

- 画像の最適化（Next.js Image Component）
- 許可されたドメインのみからの画像読み込み
- React Strict Mode有効
- 開発環境と本番環境でのキャッシュ戦略の切り替え