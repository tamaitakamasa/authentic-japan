import Image from "next/image";
import { Locale } from "@/constants/site";
// import { useTranslations } from '@/lib/i18n';
import {
  getFormattedGuideData,
  getFormattedRegionData,
  getGuidesByRegion,
} from "@/lib/utils";
import { ContentHeader } from "@/components/Layout/ContentHeader";
import { getWPSiteOptions } from "@/lib/fetchData";
import { Button } from "@/components/Button";
import { RegionSlider } from "@/components/Region/RegionSlider";
import NavigatorInfo from "@/components/Navigator/NavigatorInfo";
import { PageHeader } from "@/components/Layout/PageHeader";
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
      ja: "REGIONS",
      en: "REGIONS",
      fr: "REGIONS",
    }[lang],
    // 特定のページ用の説明文をオーバーライド
    description: {
      ja: "地域を愛し、地域同士で尊重し合い、その想いが波紋のように響き合う。その繋がりは、淡路島から日本の各地域にひろがっています。",
      en: "Love for the region, mutual respect between regions, and the resonance of this passion spreading like ripples. This connection extends from Awaji Island to various regions across Japan.",
      fr: "L’amour de la région, le respect mutuel entre les régions et la résonance de cette passion se propagent comme des ondulations. Cette connexion s’étend de l'île d'Awaji à diverses régions du Japon.",
    }[lang],
  };
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const regions = await getFormattedRegionData(lang);
  const siteOptions = await getWPSiteOptions(lang);
  const guides = await getFormattedGuideData(lang);

  return (
    <>
      <ContentHeader
        title="REGIONS"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "REGIONS" },
        ]}
        lang={lang}
      />
      <div className="l-contents__body p-page p-page-region">
        <PageHeader
          description={siteOptions.regions_description}
          mv={siteOptions.regions_mv}
        />
        <div className="p-page-region__index">
          <figure className="p-page-region__map">
            <Image src="/region/map.svg" alt="" fill unoptimized />
          </figure>
          <ul className="p-page-region__list">
            {regions &&
              regions.length > 0 &&
              regions.map((region, index) => (
                <li key={index}>
                  <a href={`#region${region.id}`}>
                    <i className="c-pin"></i>
                    <span>{region.name}</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
        <div className="p-page-region__items u-full-bleed">
          {regions.length > 0 &&
            regions.map((region, index) => {
              const regionGuides = getGuidesByRegion(
                guides,
                region.id
              );

              return (
                <div
                  key={index}
                  id={`region${region.id}`}
                  className="p-page-region__item"
                >
                  <div className="c-region">
                    {region.gallery && (
                      <div className="c-region__gallery">
                        <RegionSlider images={region.gallery} />
                      </div>
                    )}
                    <div className="c-region__inner">
                      <div className="c-region__content">
                        <h2 className="c-region__name">
                          {region.name}
                        </h2>
                        <div className="c-region__description">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: region.description || "",
                            }}
                          />
                        </div>
                      </div>
                      <div className="c-region__locale">
                        <figure className="c-region__map">
													{region.area && (
														<Image
															src={`/region/map_${region.area.value}.svg`}
															alt={region.area.label}
															fill
															unoptimized
														/>
													)}
                          {/* <Image
                            src="/region/map_sample.svg"
                            alt=""
                            fill
                            unoptimized
                          /> */}
                        </figure>
                        {region.access && (
                          <div className="c-region__access">
                            <Button
                              href={region.access}
                              label="ACCESS"
															target="_blank"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {regionGuides.length > 0 && (
                      <div className="c-region__navigators">
                        <h3 className="c-region__navigators-title">
                          NAVIGATORS
                        </h3>
                        <div className="c-region__navigators-list">
                          {regionGuides.map((guide) => (
                            <div
                              key={guide.id}
                              className="c-region__navigator"
                            >
                              <NavigatorInfo
                                guide={guide}
                                lang={lang}
                                link
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
