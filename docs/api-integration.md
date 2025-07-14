# Authentic Japan API連携仕様書

## 概要

Authentic Japanは2つの外部APIシステムと連携してコンテンツを管理・配信しています：

1. **WordPress REST API**: コンテンツ管理システム（CMS）
2. **Bokun API**: ツアー・アクティビティ予約システム

## WordPress API連携

### エンドポイント構成

#### ベースURL
```
https://shimatoworks.xsrv.jp/transformativetour/wp-json/wp/v2
```

#### ACF Options API
```
https://shimatoworks.xsrv.jp/transformativetour/wp-json/acf/v1/options
```

### 主要エンドポイント

| エンドポイント | 説明 | パラメータ |
|--------------|------|-----------|
| `/guide` | ナビゲーター情報 | `lang`, `acf_format=standard` |
| `/region` | 地域情報 | `lang`, `acf_format=standard` |
| `/posts` | ニュース記事 | `lang`, `acf_format=standard`, `_embed=1` |
| `/tour` | ツアー情報 | `lang`, `acf_format=standard`, `status=publish` |
| `/media/{id}` | メディアファイル | - |
| `/tags` | タグ情報 | `per_page=100`, `lang` |
| `/categories` | カテゴリー情報 | `per_page=100`, `lang` |

### データ取得関数

#### サイトオプション取得
```typescript
export async function getWPSiteOptions(
  lang: Locale = DEFAULT_LOCALE
): Promise<WPSiteContent>
```
- ホームページスライダー設定
- 各セクションのタイトル・コンテンツ
- サイト全体の設定値

#### ナビゲーター情報取得
```typescript
export async function fetchWPGuides(
  lang: Locale = DEFAULT_LOCALE
): Promise<WPGuide[]>
```

#### 地域情報取得
```typescript
export async function fetchWPRegions(
  lang: Locale = DEFAULT_LOCALE
): Promise<WPRegion[]>
```

#### ニュース記事取得
```typescript
export async function fetchNewsArticles(
  lang: Locale = DEFAULT_LOCALE
): Promise<WPNewsArticle[]>
```

### レスポンス形式

#### WPGuide（ナビゲーター）
```json
{
  "id": 123,
  "title": {
    "rendered": "ナビゲーター名"
  },
  "content": {
    "rendered": "<p>プロフィール内容</p>"
  },
  "acf": {
    "guide_area": "担当地域",
    "guide_name": "名前",
    "guide_profile": "プロフィール詳細",
    "guide_image": {
      "ID": 456,
      "url": "https://example.com/image.jpg"
    }
  }
}
```

#### WPRegion（地域）
```json
{
  "id": 789,
  "title": {
    "rendered": "地域名"
  },
  "acf": {
    "region_name": "地域名",
    "region_description": "地域の説明",
    "region_image": {
      "url": "https://example.com/region.jpg"
    }
  }
}
```

## Bokun API連携

### エンドポイント構成

#### ベースURL
```
https://bokun-wrapper.pages.dev
```

### アクティビティ検索

#### エンドポイント
```
POST /activity.json/search?lang={lang}
```

#### リクエストボディ
```typescript
interface BokunSearchParams {
  facetFilters?: Array<{
    excluded: boolean
    name: string
    values: string[]
  }>
  page: number
  pageSize: number
  vendorId?: number
}
```

#### フィルター例
```json
{
  "facetFilters": [
    {
      "excluded": false,
      "name": "regions",
      "values": ["Tokyo", "Kyoto"]
    },
    {
      "excluded": false,
      "name": "categories",
      "values": ["Cultural Experience"]
    }
  ],
  "page": 1,
  "pageSize": 20
}
```

### レスポンス形式

#### BokunActivity
```json
{
  "id": 12345,
  "title": "Traditional Tea Ceremony Experience",
  "description": "Experience authentic Japanese tea ceremony...",
  "photos": [
    {
      "url": "https://bokun.s3.amazonaws.com/photo1.jpg",
      "caption": "Tea ceremony"
    }
  ],
  "pricing": {
    "defaultPrice": 5000,
    "currency": "JPY"
  },
  "duration": "2 hours",
  "regions": ["Kyoto"],
  "categories": ["Cultural Experience"],
  "tags": [
    {
      "id": 1,
      "name": "Traditional"
    }
  ]
}
```

## キャッシュ戦略

### キャッシュ実装
```typescript
async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T>
```

### キャッシュポリシー
- **開発環境**: キャッシュ無効（常に最新データ取得）
- **本番環境**: メモリキャッシュ有効
- **キャッシュキー**: エンドポイント + 言語 + パラメータ

### パフォーマンスログ
```
cache: options-ja (2ms)
fetch: activities-ja-{...} (145ms)
```

## エラーハンドリング

### カスタムエラークラス
```typescript
class FetchError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = "FetchError"
  }
}
```

### エラー処理フロー
1. HTTPステータスチェック
2. エラーの場合、FetchErrorをスロー
3. 上位層でエラーキャッチ・ハンドリング

## データ変換・整形

### getFormattedNewsData
ニュース記事データを表示用に整形：
- 日付フォーマット
- カテゴリー情報の付加
- アイキャッチ画像の取得

### Activity データ整形
Bokunのアクティビティデータを表示用に変換：
- 価格フォーマット（カンマ区切り）
- 画像URLの最適化
- ガイド情報の結合

## セキュリティ考慮事項

### CORS設定
- APIサーバー側でCORS設定が必要
- 許可オリジン: https://authenticjapan.travel

### 認証
- 現在は公開APIのため認証なし
- 将来的にAPIキー認証の実装を検討

### データサニタイズ
- HTMLコンテンツは`dangerouslySetInnerHTML`使用時に注意
- ユーザー入力値のバリデーション

## API利用上の注意点

### レート制限
- WordPress API: 特に制限なし
- Bokun API: 要確認

### データ同期
- リアルタイム性が必要な情報（在庫、価格）は都度取得
- 静的な情報はキャッシュ活用

### エンドポイント変更
- APIエンドポイントはハードコード
- 環境変数への移行を推奨

## 今後の改善提案

1. **APIクライアントの抽象化**
   - 統一的なAPIクライアントクラスの実装
   - リトライ機能の追加

2. **キャッシュの高度化**
   - Redisなど外部キャッシュの導入
   - TTL（有効期限）の設定

3. **エラーハンドリングの強化**
   - フォールバックデータの用意
   - ユーザーフレンドリーなエラーメッセージ

4. **パフォーマンス最適化**
   - GraphQLの導入検討
   - 必要なフィールドのみ取得