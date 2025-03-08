// app/[lang]/news/[id]/page.tsx

import { ContentHeader } from "@/components/Layout/ContentHeader";
import NewsItem from "@/components/News/NewsItem";
import { Locale } from "@/constants/site";
import { useTranslations } from "@/lib/i18n";
import { getFormattedNewsData } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
  params: { lang: Locale };
};

export async function generateMetadata({
  params: { lang },
}: Props): Promise<Metadata> {
  return {
    // タイトルだけをオーバーライド
    // layout.tsxで設定したテンプレートが適用される
    title: {
      ja: "NEWS",
      en: "NEWS",
      fr: "NEWS",
    }[lang],
    // 特定のページ用の説明文をオーバーライド
    description: {
      ja: "Authentic Japan のお知らせや、出合いからうまれた物語を発信していきます。",
      en: "We will share updates from Authentic Japan, as well as the stories born from our encounters.",
      fr: "Nous partagerons les nouvelles d'Authentic Japan ainsi que les histoires nées de nos rencontres.",
    }[lang],
  };
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
	const t = useTranslations(lang);
  const newsArticles = await getFormattedNewsData(lang);
  // console.log('newsArticles:', newsArticles);

  return (
    <>
      <ContentHeader
        title="NEWS"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "NEWS" },
        ]}
        lang={lang}
      />
      <div className="l-contents__body p-page p-page--no-header p-page-news">
        <div className="p-page-news__items">
          {newsArticles.length > 0 ? (
            newsArticles.map((article) => (
              <div
                key={article.id}
                className="p-page-news__item"
              >
                <NewsItem lang={lang} article={article} />
              </div>
            ))
          ) : (
            <p>
              {t({
                ja: "ニュースが見つかりません。",
                en: "No news found.",
                fr: "Aucune actualité trouvée.",
              })}
            </p>
          )}
        </div>
      </div>
      {/* <TestLink /> */}
    </>
  );
}
