# Authentic Japan 技術仕様書

## アーキテクチャ概要

### システム構成
```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│                 │     │                  │     │                 │
│   Next.js App   │────▶│   WordPress API  │     │   Bokun API     │
│   (Frontend)    │     │   (CMS Backend)  │     │ (Tour Backend)  │
│                 │     │                  │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                                               │
         └───────────────────────┬───────────────────────┘
                                 ▼
                         ┌─────────────────┐
                         │                 │
                         │   Client Browser │
                         │                 │
                         └─────────────────┘
```

## ルーティング構造

### 動的ルーティング
- `[lang]` - 言語パラメータ（ja/en/fr）
- `[id]` - コンテンツID（ナビゲーター、ニュース）

### ページ一覧
| パス | 説明 | 主要コンポーネント |
|------|------|------------------|
| `/[lang]` | ホームページ | HomeHeroSlider, HomeNavigatorSection, HomeRegionSection, HomeTourSection |
| `/[lang]/navigator` | ナビゲーター一覧 | NavigatorList |
| `/[lang]/navigator/[id]` | ナビゲーター詳細 | NavigatorInfo |
| `/[lang]/tours` | ツアー一覧 | TourList, FilterComponent |
| `/[lang]/region` | 地域一覧 | RegionSlider |
| `/[lang]/news` | ニュース一覧 | NewsItem |
| `/[lang]/news/[id]` | ニュース詳細 | - |
| `/[lang]/about` | 会社概要 | AboutSection |
| `/[lang]/contact` | お問い合わせ | ContactForm |
| `/[lang]/terms` | 利用規約 | - |

## データモデル

### WordPress データ型

#### WPSiteContent
```typescript
{
  home_slider: Array<SlideItem>
  home_navigator_title: string
  home_navigator_items: Array<NavigatorItem>
  home_region_title: string
  home_region_items: Array<RegionItem>
  home_about_mv: MediaItem
  home_about_description: string
  // その他のサイトオプション
}
```

#### WPGuide (ナビゲーター)
```typescript
{
  id: number
  title: { rendered: string }
  content: { rendered: string }
  acf: {
    guide_area: string
    guide_name: string
    guide_profile: string
    guide_image: MediaItem
    // その他のACFフィールド
  }
}
```

#### WPRegion (地域)
```typescript
{
  id: number
  title: { rendered: string }
  content: { rendered: string }
  acf: {
    region_name: string
    region_description: string
    region_image: MediaItem
    // その他のACFフィールド
  }
}
```

### Bokun データ型

#### BokunActivity
```typescript
{
  id: number
  title: string
  description: string
  photos: Array<{
    url: string
    caption: string
  }>
  pricing: {
    defaultPrice: number
    currency: string
  }
  // その他のフィールド
}
```

## API仕様

### WordPress API

#### エンドポイント
- ベースURL: `https://shimatoworks.xsrv.jp/transformativetour/wp-json/wp/v2`
- ACF Options: `/acf/v1/options`

#### 主要エンドポイント
- `/guide` - ナビゲーター情報
- `/region` - 地域情報
- `/posts` - ニュース記事
- `/media` - メディアファイル
- `/tags` - タグ情報
- `/categories` - カテゴリー情報

#### パラメータ
- `lang` - 言語指定（ja/en/fr）
- `acf_format=standard` - ACFデータのフォーマット
- `per_page` - 取得件数
- `status=publish` - 公開ステータス

### Bokun API

#### エンドポイント
- ベースURL: `https://bokun-wrapper.pages.dev`
- 検索: `/activity.json/search`

#### 検索パラメータ
```typescript
{
  facetFilters: Array<{
    excluded: boolean
    name: string
    values: string[]
  }>
  page: number
  pageSize: number
  vendorId?: number
}
```

## スタイリングアーキテクチャ

### SCSS構造
```
styles/
├── foundation/      # リセット、ベーススタイル
├── global/         # 変数、mixin、関数
├── layout/         # レイアウトコンポーネント
├── component/      # 汎用コンポーネント
├── project/        # ページ固有スタイル
└── utility/        # ユーティリティクラス
```

### 命名規則
- **BEM記法**: Block__Element--Modifier
- **プレフィックス**:
  - `l-` : レイアウト
  - `c-` : コンポーネント
  - `p-` : プロジェクト固有
  - `u-` : ユーティリティ

### Tailwind CSS
- v4.0.6使用
- コンポーネントベースでの適用
- shadcn/uiコンポーネントとの統合

## パフォーマンス最適化

### キャッシュ戦略
```typescript
// 開発環境: キャッシュ無効
// 本番環境: メモリキャッシュ有効
async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T>
```

### 画像最適化
- Next.js Image Componentの使用
- 許可ドメイン:
  - shimatoworks.xsrv.jp
  - bokun.s3.amazonaws.com
  - imgcdn.bokun.tools
  - placehold.jp

### コード分割
- 動的インポート
- Suspenseバウンダリ
- ページレベルでの分割

## 国際化（i18n）

### 実装方式
- パスベースのルーティング
- サーバーサイドでの言語判定
- クライアントサイドでの言語切り替え

### 翻訳管理
```typescript
type Multilingual = {
  [key in Locale]?: string;
}

function useTranslations(lang: Locale) {
  return function t(multilingual: Multilingual): string
}
```

### 言語検出
1. URLパスから言語を取得
2. Accept-Languageヘッダーから判定
3. デフォルト言語（日本語）にフォールバック

## セキュリティ

### Content Security Policy
- 外部画像の読み込み制限
- スクリプトの実行制限

### フォームバリデーション
- Zodによるスキーマ定義
- サーバーサイド・クライアントサイド両方でのバリデーション

### API通信
- HTTPSの強制
- エラーハンドリング
- タイムアウト処理

## デプロイメント

### ビルドプロセス
```bash
# 開発環境
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm run start

# リント
npm run lint
```

### 環境変数
- 必要な環境変数は現在なし
- APIエンドポイントはコード内にハードコード

### 静的ファイル生成
- robots.txt
- sitemap.xml