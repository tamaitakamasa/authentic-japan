// app/sitemap.ts
import { MetadataRoute } from 'next';
import { DEFAULT_LOCALE, LOCALES, SITE_URL } from '@/constants/site';
import { fetchNewsArticles, fetchWPGuides, fetchWPRegions } from '@/lib/fetchData';

// 変更頻度の型を正しく定義
type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // 静的ルート
  const staticRoutes = [
    '',
    '/about',
    '/navigator',
    '/tours',
    '/region',
    '/news',
    '/contact',
    '/terms'
  ];

  // 静的ページのサイトマップエントリを作成
  const staticSitemapEntries = LOCALES.flatMap(locale =>
    staticRoutes.map(route => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === '' ? 'daily' : 'weekly') as ChangeFrequency,
      priority: route === '' ? 1.0 : 0.8,
    }))
  );

  // 動的ルートのデータを並行して取得
  const [guides, news, regions] = await Promise.all([
    fetchWPGuides(DEFAULT_LOCALE),
    fetchNewsArticles(DEFAULT_LOCALE),
    fetchWPRegions(DEFAULT_LOCALE)
  ]);

  // ナビゲーター詳細ページのサイトマップエントリを作成
  const guidesSitemapEntries = LOCALES.flatMap(locale =>
    guides.map(guide => ({
      url: `${baseUrl}/${locale}/navigator/${guide.id}`,
      lastModified: new Date(),  // 更新日時情報がない場合は現在の日時を使用
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.7,
    }))
  );

  // ニュース記事詳細ページのサイトマップエントリを作成
  const newsSitemapEntries = LOCALES.flatMap(locale =>
    news.map(article => ({
      url: `${baseUrl}/${locale}/news/${article.id}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.6,
    }))
  );

  // 地域詳細ページのアンカーリンクはサイトマップに含める必要はないかもしれませんが、
  // 念のため含めておきます（SEOの観点から価値があるかは評価が必要）
  const regionSitemapEntries = LOCALES.flatMap(locale =>
    regions.map(region => ({
      url: `${baseUrl}/${locale}/region#region${region.id}`,
      lastModified: new Date(),  // 更新日時情報がない場合は現在の日時を使用
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.7,
    }))
  );

  // すべてのサイトマップエントリを統合
  return [
    ...staticSitemapEntries,
    ...guidesSitemapEntries,
    ...newsSitemapEntries,
    ...regionSitemapEntries
  ];
}
