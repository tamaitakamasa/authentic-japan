// import Image from 'next/image';
import { ContentHeader } from "@/components/Layout/ContentHeader";
import { PageHeader } from "@/components/Layout/PageHeader";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Locale } from "@/constants/site";
import { getWPSiteOptions } from "@/lib/fetchData";
import { Metadata } from "next";
import AboutSection from "@/components/About/AboutSection";

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
      ja: "Authentic Japanについて",
      en: "About Authentic Japan",
      fr: "À propos d'Authentic Japan",
    }[lang],
    // 特定のページ用の説明文をオーバーライド
    description: {
      ja: "ページ固有の説明",
      en: "Page specific description",
      fr: "Description spécifique à la page",
    }[lang],
  };
}

export default async function AboutPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const siteOptions = await getWPSiteOptions(lang);

  return (
    <>
      <ContentHeader
        title="ABOUT US"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "ABOUT US" },
        ]}
        lang={lang}
      />
      <div className="l-contents__body p-page p-page-about">
        <PageHeader
          description={siteOptions.about_description}
          mv={siteOptions.about_mv}
        />
        {siteOptions.about_video && (
          <div className="p-page-about__video">
            <VideoPlayer videoUrl={siteOptions.about_video} />
          </div>
        )}
        <AboutSection siteOptions={siteOptions} />
      </div>
    </>
  );
}
