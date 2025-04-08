// app/sitemap.ts をシンプルにする
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://authentic-japan.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://authentic-japan.com/ja',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://authentic-japan.com/en',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://authentic-japan.com/fr',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    }
  ];
}
