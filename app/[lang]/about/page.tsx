import Image from 'next/image';
import { ContentHeader } from "@/components/Layout/ContentHeader";
import { PageHeader } from "@/components/Layout/PageHeader";
// import { VideoPlayer } from "@/components/VideoPlayer";
import { Locale, SITE_TITLE } from "@/constants/site";
import { getWPSiteOptions } from "@/lib/fetchData";
import { Metadata } from "next";
import AboutSection from "@/components/About/AboutSection";
import logo from '@/public/logo.svg';

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
      ja: "ABOUT US",
      en: "ABOUT US",
      fr: "ABOUT US",
    }[lang],
    // 特定のページ用の説明文をオーバーライド
    description: {
      ja: "地域を愛し、地域同士で尊重し合い、その想いが波紋のように響き合う。私たちは、日本の精神である“調和”を大切にしながら世界と日本を繋ぐ架け橋になることを願っています。",
      en: "By cherishing the harmony that is the essence of Japan, we aim to be a bridge connecting Japan and the world. We believe in respecting each region, and that this respect will ripple out, bringing people closer together.",
      fr: "En chérissant l'harmonie, qui est l'essence du Japon, nous aspirons à être un pont entre le Japon et le monde. Nous croyons au respect de chaque région et à la manière dont ce respect se propage, rapprochant les gens.",
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
        <div className="p-page-about__concept">
          <div className="p-page-about__concept-logo">
            <figure>
						<Image src={logo} alt={SITE_TITLE} unoptimized />
						</figure>
          </div>
          <div className="p-page-about__concept-text px-4">
            <div
              dangerouslySetInnerHTML={{
                __html: siteOptions.about_concept || "",
              }}
            />
            <h2>OUR STORY</h2>
            <div
              className="mt-8"
              dangerouslySetInnerHTML={{
                __html: siteOptions.about_story || "",
              }}
            />
            <h2>OUR MISSION</h2>
            <div
              className="mt-8"
              dangerouslySetInnerHTML={{
                __html: siteOptions.about_mission || "",
              }}
            />
          </div>
        </div>
        <AboutSection siteOptions={siteOptions} />
      </div>
    </>
  );
}
