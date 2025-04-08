// app/sitemap.ts
import { MetadataRoute } from 'next';
import { LOCALES, SITE_URL } from '@/constants/site';

// 変更頻度の型を正しく定義
type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default function sitemapStatic(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const routes = [
    '',
    '/about',
    '/navigator',
    '/tours',
    '/region',
    '/news',
    '/contact',
    '/terms'
  ];

  return LOCALES.flatMap(locale =>
    routes.map(route => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === '' ? 'daily' : 'weekly') as ChangeFrequency,
      priority: route === '' ? 1.0 : 0.8,
    }))
  );
}
