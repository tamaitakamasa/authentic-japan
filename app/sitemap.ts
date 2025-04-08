// app/sitemap.ts をシンプルにする
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://authentic-japan.travel/ja',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://authentic-japan.travel/en',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://authentic-japan.travel/fr',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    }
  ];
}
