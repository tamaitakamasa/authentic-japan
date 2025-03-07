import { Locale } from "@/constants/site";
import { ContentHeader } from "@/components/Layout/ContentHeader";
import { getWPSiteOptions } from "@/lib/fetchData";
import { Suspense } from "react";
import TourList from "@/components/Tour/TourList";
import { ActivityFilters } from "@/types/activity";
import { PageHeader } from "@/components/Layout/PageHeader";

function parseQueryParam(
  value: string | string[] | undefined
): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.split(",").filter(Boolean);
}

function parseSearchParam(
  value: string | string[] | undefined
): string | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function Page({
  params: { lang },
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filters: ActivityFilters = {
    guides: parseQueryParam(searchParams.guides),
    regions: parseQueryParam(searchParams.regions),
    search: parseSearchParam(searchParams.search),
  };
  // console.log('filters:', filters);

  const siteOptions = await getWPSiteOptions(lang);

  return (
    <>
      <ContentHeader
        title="TOURS"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "TOURS" },
        ]}
        lang={lang}
      />
      <div className="l-contents__body p-page p-page-tours">
        <PageHeader mv={siteOptions.tours_mv} />
        <div className="p-page-tours__content relative">
          <Suspense fallback={<p>Loading...</p>}>
            <TourList lang={lang} filters={filters} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
