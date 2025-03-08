import { Locale } from "@/constants/site";
import { ContentHeader } from "@/components/Layout/ContentHeader";
import { getWPSiteOptions } from "@/lib/fetchData";
import { PageHeader } from "@/components/Layout/PageHeader";
import NavigatorList from "@/components/Navigator/NavigatorList";
import { Suspense } from "react";
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
      ja: "NAVIGATORS",
      en: "NAVIGATORS",
      fr: "NAVIGATORS",
    }[lang],
    // 特定のページ用の説明文をオーバーライド
    description: {
      ja: "地域の文化や歴史・暮らしに精通するナビゲーターたちが日常と情熱を通じて、訪れる人と地域をつなぎます。",
      en: "Navigators who are well-versed in the culture, history, and lifestyle of their regions connect visitors with the local area through everyday life and passion.	",
      fr: "Les navigateurs, experts en culture, histoire et mode de vie locaux, relient les visiteurs à la région grâce à la vie quotidienne et à leur passion.",
    }[lang],
  };
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const siteOptions = await getWPSiteOptions(lang);

  return (
    <>
      <ContentHeader
        title="NAVIGATORS"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "NAVIGATORS" },
        ]}
        lang={lang}
      />
      <div className="l-contents__body p-page p-page-navigators">
        <PageHeader
          title={siteOptions.navigators_title}
          description={siteOptions.navigators_description}
          mv={siteOptions.navigators_mv}
        />
        <Suspense fallback={<p>Loading...</p>}>
          <NavigatorList lang={lang} />
        </Suspense>
      </div>
    </>
  );
}
