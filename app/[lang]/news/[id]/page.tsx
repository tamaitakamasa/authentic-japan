import Image from "next/image";
import { Locale } from "@/constants/site";
import { notFound } from "next/navigation";
import { ContentHeader } from "@/components/Layout/ContentHeader";
import { getFormattedNewsData } from "@/lib/utils";
import NavigatorInfo from "@/components/Navigator/NavigatorInfo";
import { Metadata } from "next";
// import '@wordpress/block-library/build-style/style.css';
// import "@wordpress/block-library/build-style/theme.css"

type Props = {
  params: { lang: Locale; id: string };
};

export async function generateMetadata({
  params: { lang, id },
}: Props): Promise<Metadata> {
  const newsArticles = await getFormattedNewsData(lang);
  const article = newsArticles.find(
    (article) => article.id === parseInt(id)
  );

  if (!article) {
    return {
      title: "News Not Found",
    };
  }

  return {
    // 記事のタイトルをメタデータのタイトルとして設定
    title: article.title,
    // 特定のページ用の説明文をオーバーライド
    description: {
      ja: "Authentic Japan のお知らせや、出合いからうまれた物語を発信していきます。",
      en: "We will share updates from Authentic Japan, as well as the stories born from our encounters.",
      fr: "Nous partagerons les nouvelles d'Authentic Japan ainsi que les histoires nées de nos rencontres.",
    }[lang],
  };
}

export default async function Page({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const newsArticles = await getFormattedNewsData(lang);
  const article = newsArticles.find(
    (article) => article.id === parseInt(id)
  );

  if (!article) {
    notFound();
  }

  // 1536x1536サイズが存在すればそれを使用、なければオリジナルURLを使用
  const featuredMediaPath = article.featured_media
    ?.media_details?.sizes?.["1536x1536"]
    ? article.featured_media.media_details.sizes[
        "1536x1536"
      ].source_url
    : article.featured_media?.source_url;
  // console.log("featuredMediaPath:", featuredMediaPath);

  return (
    <>
      <ContentHeader
        title="NEWS"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "NEWS", href: "/news" },
          { label: "NEWS DETAIL" },
        ]}
        lang={lang}
      />
      <div className="l-contents__body p-single p-single--no-header p-single-news">
        <div className="p-single-news__header">
          <time
            className="p-single-news__date"
            dateTime={article.date}
          >
            {article.date}
          </time>
          <h2 className="p-single-news__title">
            {article.title}
          </h2>
          {article.categories &&
            article.categories.length > 0 && (
              <div className="p-single-news__categories">
                {article.categories.map((category) => (
                  <span
                    key={category.id}
                    className="p-single-news__category c-taxonomy"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}
          {article.guides && article.guides.length > 0 && (
            <div className="p-single-news__guides">
              {article.guides.map((guide) => (
                <div
                  key={guide.id}
                  className="p-single-news__guide"
                >
                  <NavigatorInfo
                    guide={guide}
                    link
                    lang={lang}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {article.featured_media && featuredMediaPath && (
          <figure className="p-single-news__image">
            <Image
              src={featuredMediaPath}
              alt={article.title}
              fill
              sizes="50vw"
              style={{ objectFit: "cover" }}
            />
          </figure>
        )}
        <div className="p-single-news__content">
          <div
            className="c-article"
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          />
        </div>
      </div>
    </>
  );
}
