import Image from "next/image";
import { Locale } from "@/constants/site";
import { notFound } from "next/navigation";
import {
  // getFormattedActivities,
  getFormattedGuideData,
  getFormattedNewsData,
} from "@/lib/utils";
import { ContentHeader } from "@/components/Layout/ContentHeader";
// import { TourItem } from "@/components/Tour/TourItem";
import Link from "next/link";
import NewsItem from "@/components/News/NewsItem";
import { useTranslations } from "@/lib/i18n";
import { Metadata } from "next";
import { Button } from "@/components/Button";

type Props = {
  params: { lang: Locale; id: string };
};

export async function generateMetadata({
  params: { lang, id },
}: Props): Promise<Metadata> {
  const guides = await getFormattedGuideData(lang);
  const guide = guides.find((g) => g.id === parseInt(id));
	// console.log(guides);

  if (!guide) {
    return {
      title: "Navigator Not Found",
    };
  }

  return {
    // ナビゲーターの名前をメタデータのタイトルとして設定
    title: guide.name,
    // 特定のページ用の説明文をオーバーライド
    description: guide.description ?
      // HTMLタグを除去してプレーンテキストとして使用
      guide.description.replace(/<[^>]*>/g, '') :
      {
        ja: "地域の文化や歴史・暮らしに精通するナビゲーターが、訪れる人と地域をつなぎます。",
        en: "A navigator well-versed in the culture, history, and lifestyle of the region connects visitors with the local area.",
        fr: "Un navigateur expert en culture, histoire et mode de vie local relie les visiteurs à la région.",
      }[lang],
  };
}

export default async function Page({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const t = useTranslations(lang);
  const guides = await getFormattedGuideData(lang);
  const otherGuides = guides.filter((g) => g.id !== parseInt(id));
  const guide = guides.find((g) => g.id === parseInt(id));
  // const activities = await getFormattedActivities(
  //   { page: 1, pageSize: 10 },
  //   lang
  // );
  const newsArticles = await getFormattedNewsData(lang);
  // const filteredActivities = guide
  //   ? activities.filter((activity) =>
  //       activity.guideIds?.includes(guide.id)
  //     )
  //   : [];
  const relatedNews = guide
    ? newsArticles.filter((news) =>
        news.guides?.some((g) => g.id === guide.id)
      )
    : [];

  // objectFit値を決定
  const mvAspectRatio = guide?.mv
    ? guide.mv.width / guide.mv.height
    : undefined;
  const baseAspectRatio = 1 / 1;
  const objectFit =
    mvAspectRatio !== undefined && mvAspectRatio < baseAspectRatio
      ? "contain"
      : "cover";

  if (!guide) {
    notFound();
  }

  return (
    <>
      <ContentHeader
        title="NAVIGATOR"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "NAVIGATORS", href: "/navigator" },
          { label: "NAVIGATOR" },
        ]}
        lang={lang}
      />

      <div className="l-contents__body p-page-navigator p-single p-single-navigator">
        <div className="p-single__header p-single-navigator__header u-full-bleed">
          <div className="p-single-navigator__profile c-container">
						<div className="p-single-navigator__inner">
            <figure className="p-single-navigator__mv">
              {guide.mv && (
                <Image
                  src={guide.mv.link}
                  alt={guide.name}
                  fill
                  sizes="50vw"
                  style={{ objectFit: objectFit }}
                />
              )}
            </figure>
            {guide.copy && (
              <h2 className="p-single-navigator__copy">
                {guide.copy}
              </h2>
            )}
						</div>
            <div className="p-single-navigator__info">
              {guide.regions && guide.regions.length > 0 && (
                <div className="p-single-navigator__region">
                  <i className="c-pin"></i>
                  <span>{guide.regions.join(", ")}</span>
                </div>
              )}
              {guide.name && (
                <h2 className="p-single-navigator__name">
                  {guide.name}
                </h2>
              )}
              {guide.title && (
                <h3 className="p-single-navigator__title">
                  {guide.title}
                </h3>
              )}
              {guide.photo && (
                <figure className="p-single-navigator__photo">
                  <Image
                    src={guide.photo.link}
                    alt={guide.name}
                    fill
                    sizes="10vw"
                    style={{ objectFit: "cover" }}
                  />
                </figure>
              )}
              {guide.tags && guide.tags.length > 0 && (
                <div className="p-single-navigator__tags">
                  {guide.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="p-single-navigator__tag c-taxonomy"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}
              <ul className="p-single-navigator__sns">
                {guide.sns?.instagram && (
                  <li>
                    <a
                      href={guide.sns.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={"/icon_instagram.svg"}
                        width={15}
                        height={15}
                        alt=""
                        style={{ aspectRatio: 1 / 1 }}
                      />
                    </a>
                  </li>
                )}
                {guide.sns?.facebook && (
                  <li>
                    <a
                      href={guide.sns.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={"/icon_fb.svg"}
                        width={15}
                        height={15}
                        alt=""
                        style={{ aspectRatio: 1 / 1 }}
                      />
                    </a>
                  </li>
                )}
                {guide.sns?.website && (
                  <li>
                    <a
                      href={guide.sns.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={"/icon_x.svg"}
                        width={15}
                        height={15}
                        alt=""
                        style={{ aspectRatio: 1 / 1 }}
                      />
                    </a>
                  </li>
                )}
                {guide.sns?.note && (
                  <li>
                    <a
                      href={guide.sns.note}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={"/icon_note.svg"}
                        width={40}
                        height={8.7}
                        alt=""
                        style={{ aspectRatio: 400 / 87 }}
                      />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-single-navigator__description">
          <p
            dangerouslySetInnerHTML={{
              __html: guide.description || "",
            }}
          />
          {guide.values && guide.values.length > 0 && (
            <>
              <h2 className="p-single-navigator__values-title">
                {t({
                  ja: "私の提供する旅で大切にしたいこと",
                  en: "What I value in the journey I offer",
									fr: "Ce que je valorise dans le voyage que je propose",
                })}
              </h2>
              <ul className="p-single-navigator__values">
                {guide.values.map((value, index) => (
                  <li
                    key={index}
                    className="p-single-navigator__value"
                  >
                    <h3>{value.title}</h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: value.description,
                      }}
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

				<div className="p-single-navigator__inquiry">
					<Button href={`https://forms.gle/xEYS3P3eFDMJGqPh9`} target="_blank" label={t({
						ja: "ナビゲーターへのお問い合わせ",
						en: "Inquiry to the navigator",
						fr: "Inquiry to the navigator",
					})} />
				</div>

        {/* {filteredActivities.length > 0 && (
          <div className="p-page-navigator-tours">
            <div className="p-page-navigator-tours__title">
              <h2 className="c-heading c-heading--2">TOURS</h2>
            </div>
            <div className="p-page-navigator-tours__tours c-tours">
              {filteredActivities.map((activity) => (
                <TourItem
                  key={activity.id}
                  activity={activity}
                  className="c-tours__tour"
                />
              ))}
            </div>
          </div>
        )} */}

        {relatedNews.length > 0 && (
          <div className="p-page-navigator-news">
            <div className="p-page-navigator-news__title">
              <h2 className="c-heading c-heading--2">RELATED NEWS</h2>
            </div>
            <div className="p-page-navigator-news__items">
              {relatedNews.map((article) => (
                <div key={article.id} className="p-page-news__item">
                  <NewsItem lang={lang} article={article} />
                </div>
              ))}
            </div>
          </div>
        )}

        {otherGuides.length > 0 && (
          <div className="p-page-navigator-others">
            <div className="p-page-navigator-others__title">
              <h2 className="c-heading c-heading--2">
                OTHER NAVIGATORS
              </h2>
            </div>
            <div className="p-page-navigator-others__items">
              {otherGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="p-page-navigator-others__item"
                >
                  <div className="c-navigator-circle u-hover">
                    <figure className="c-navigator-circle__thumb">
                      <Image
                        src={guide.photo?.link ?? "/no-photo.jpg"}
                        alt={guide.name}
                        fill
                        sizes="10vw"
                        style={{ objectFit: "cover" }}
                      />
                    </figure>

                    <h3 className="c-navigator-circle__name">
                      <Link
                        href={`/${lang}/navigator/${guide.id}`}
                        className="c-navigator-circle__link"
                      >
                        {guide.name}
                      </Link>
                    </h3>
                    {guide.regions && guide.regions.length > 0 && (
                      <div className="c-navigator-circle__region">
                        <i className="c-pin"></i>
                        <span>{guide.regions.join(", ")}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
