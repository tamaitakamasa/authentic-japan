// app/[lang]/news/[id]/page.tsx

import { ContentHeader } from "@/components/Layout/ContentHeader";
import NewsItem from "@/components/News/NewsItem";
import { Locale } from "@/constants/site";
import { useTranslations } from "@/lib/i18n";
import { getFormattedNewsData } from "@/lib/utils";

export default async function Home({
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
