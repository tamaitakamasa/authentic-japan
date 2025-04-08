import { MetadataRoute } from "next";
import { LOCALES, SITE_URL } from "@/constants/site";
import {
  getFormattedGuideData,
  getFormattedNewsData,
  getFormattedRegionData,
} from "@/lib/utils";

// 変更頻度の型を正しく定義
type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // 基本的なページルート
  const routes = [
    "",
    "/about",
    "/navigator",
    "/tours",
    "/region",
    "/news",
    "/contact",
    "/terms",
  ];

  // 静的なサイトマップエントリを作成
  const staticPages = LOCALES.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === ""
        ? "daily"
        : "weekly") as ChangeFrequency,
      priority: route === "" ? 1.0 : 0.8,
    })),
  );

  // 動的なページエントリを追加
  const dynamicPages: MetadataRoute.Sitemap = [];

  // 各言語ごとにガイド詳細ページを追加
  for (const locale of LOCALES) {
    // ガイドデータを取得
    const guides = await getFormattedGuideData(locale);

    // ガイド詳細ページをサイトマップに追加
    const guidePages = guides.map((guide) => ({
      url: `${baseUrl}/${locale}/navigator/${guide.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFrequency,
      priority: 0.7,
    }));

    // ニュース記事を取得
    const newsArticles = await getFormattedNewsData(locale);

    // ニュース詳細ページをサイトマップに追加
    const newsPages = newsArticles.map((article) => ({
      url: `${baseUrl}/${locale}/news/${article.id}`,
      lastModified: new Date(article.date.replace(/\./g, "-")),
      changeFrequency: "monthly" as ChangeFrequency,
      priority: 0.6,
    }));

    // 地域データを取得（リンクは静的だがコンテンツは動的）
    const regions = await getFormattedRegionData(locale);

    // 地域ページをサイトマップに追加
    const regionPages = regions.map((region) => ({
      url: `${baseUrl}/${locale}/region#region${region.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFrequency,
      priority: 0.7,
    }));

    dynamicPages.push(...guidePages, ...newsPages, ...regionPages);
  }

  return [...staticPages, ...dynamicPages];
}
