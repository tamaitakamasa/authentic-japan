import { Locale } from "@/constants/site";
// import { useTranslations } from '@/lib/i18n';
import { getFormattedGuideData } from "@/lib/utils";
import { NavigatorItem } from "@/components/Navigator/NavigatorItem";
import { ContentHeader } from "@/components/Layout/ContentHeader";
import { getWPSiteOptions } from "@/lib/fetchData";
// import Image from 'next/image';
import { PageHeader } from "@/components/Layout/PageHeader";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  // const t = useTranslations(lang);
  const guides = await getFormattedGuideData(lang);
  const siteOptions = await getWPSiteOptions(lang);
  // console.log('guides:', guides);
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
        <div className="p-page-navigators__items u-full-bleed">
          {guides && guides.length > 0 ? (
            guides.map((guide, index) => (
              <div
                key={index}
                className="p-page-navigators__item"
              >
                <NavigatorItem lang={lang} guide={guide} />
              </div>
            ))
          ) : (
            <p>No guides available</p>
          )}
        </div>
      </div>
    </>
  );
}
