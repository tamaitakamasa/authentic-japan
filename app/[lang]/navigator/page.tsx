import { Locale } from "@/constants/site";
import { ContentHeader } from "@/components/Layout/ContentHeader";
import { getWPSiteOptions } from "@/lib/fetchData";
import { PageHeader } from "@/components/Layout/PageHeader";
import NavigatorList from "@/components/Navigator/NavigatorList";
import { Suspense } from "react";

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
