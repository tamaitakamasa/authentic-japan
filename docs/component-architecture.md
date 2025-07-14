# Authentic Japan コンポーネントアーキテクチャ

## コンポーネント設計思想

### 設計原則
1. **責任の分離**: UIコンポーネント、ビジネスロジック、データ取得を明確に分離
2. **再利用性**: 汎用的なUIコンポーネントと特定用途のコンポーネントを区別
3. **型安全性**: TypeScriptによる厳密な型定義
4. **パフォーマンス**: 必要に応じたClient Componentの使用とServer Componentの活用

### コンポーネント分類

#### 1. UIコンポーネント (`components/ui/`)
- shadcn/uiベースの汎用コンポーネント
- Radix UIプリミティブを使用
- カスタマイズ可能なスタイリング（CVA使用）

#### 2. レイアウトコンポーネント (`components/Layout/`)
- サイト全体の構造を定義
- ヘッダー、フッター、ページヘッダーなど

#### 3. 機能別コンポーネント
- **Home**: ホームページ専用
- **Navigator**: ナビゲーター関連
- **Tour**: ツアー関連
- **Region**: 地域関連
- **News**: ニュース関連
- **Contact**: お問い合わせ関連
- **About**: 会社概要関連

## 主要コンポーネント詳細

### レイアウトコンポーネント

#### Header (`components/Layout/Header.tsx`)
```typescript
interface HeaderProps {
  lang: Locale
}
```
- **機能**:
  - 多言語対応ナビゲーション
  - レスポンシブドロワーメニュー
  - 言語切り替え機能
- **状態管理**: useStateによるドロワー開閉状態
- **Client Component**: インタラクティブ機能のため

#### Footer (`components/Layout/Footer.tsx`)
- サイトマップ
- ソーシャルメディアリンク
- コピーライト情報

#### PageHeader (`components/Layout/PageHeader.tsx`)
- ページタイトル表示
- パンくずリスト（実装予定）

### ホームページコンポーネント

#### HomeHeroSlider
- Swiper.jsを使用したフルスクリーンスライダー
- 自動再生、ループ機能
- レスポンシブ対応

#### HomeNavigatorSection
- ナビゲーター紹介セクション
- 動的データ読み込み
- Suspenseによる段階的レンダリング

#### HomeRegionSection
- 地域紹介セクション
- インタラクティブな地図表示
- スライダーとの連動

#### HomeTourSection
- おすすめツアーの表示
- フィルタリング機能との連携

### ツアー関連コンポーネント

#### TourItem (`components/Tour/TourItem.tsx`)
```typescript
interface TourItemProps {
  activity: Activity
  className?: string
}
```
- **表示内容**:
  - ツアー画像
  - 価格・時間情報
  - ガイド情報
  - タグ
- **デザイン**: カード型レイアウト

#### TourList
- ツアー一覧表示
- グリッドレイアウト
- ページネーション対応

#### FilterComponent
- 地域フィルター
- カテゴリーフィルター
- 価格帯フィルター
- リアルタイムフィルタリング

### UIコンポーネント

#### Button (`components/ui/button.tsx`)
```typescript
const buttonVariants = cva(
  // ベーススタイル
  "inline-flex items-center justify-center...",
  {
    variants: {
      variant: {
        default: "...",
        destructive: "...",
        outline: "...",
        secondary: "...",
        ghost: "...",
        link: "..."
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    }
  }
)
```

#### その他のUIコンポーネント
- **Card**: コンテンツカード
- **Dialog**: モーダルダイアログ
- **Form**: フォーム要素群
- **Input/Textarea**: 入力フィールド
- **ScrollArea**: スクロール可能エリア
- **Separator**: 区切り線
- **Tooltip**: ツールチップ

## コンポーネント間の連携

### データフロー
```
Server Component (Page)
    ↓ (props)
Client Component (Interactive)
    ↓ (events)
State Management (useState/useReducer)
    ↓ (updates)
UI Update
```

### 状態管理パターン
1. **ローカル状態**: useState/useReducerによる管理
2. **フォーム状態**: React Hook Form
3. **サーバー状態**: Server Componentでのデータ取得

## スタイリング戦略

### 1. SCSS Modules
- BEM記法による命名
- コンポーネント固有のスタイル
- グローバルスタイルとの分離

### 2. Tailwind CSS
- ユーティリティファースト
- レスポンシブデザイン
- カスタムクラスとの併用

### 3. CSS-in-JS (CVA)
- 動的なスタイル変更
- バリアント管理
- 型安全なクラス名生成

## パフォーマンス最適化

### 1. Code Splitting
- 動的インポート
- ルートベースの分割

### 2. Image Optimization
- Next.js Imageコンポーネント
- 適切なサイズ指定
- Lazy Loading

### 3. Suspense Boundaries
```typescript
<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>
```

## アクセシビリティ

### ARIA対応
- 適切なARIA属性
- キーボードナビゲーション
- スクリーンリーダー対応

### セマンティックHTML
- 適切なHTML要素の使用
- 見出しレベルの階層構造
- ランドマークロール

## テスト戦略

### 単体テスト
- コンポーネントの機能テスト
- Props/状態のテスト

### 統合テスト
- ユーザーインタラクション
- データフローのテスト

### E2Eテスト
- 主要なユーザーフロー
- クロスブラウザテスト