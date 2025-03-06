import { Locale } from "@/constants/site";
import { getFormattedGuideData } from "@/lib/utils";
import { NavigatorItem } from "@/components/Navigator/NavigatorItem";
import { useTranslations } from "@/lib/i18n";

interface NavigatorListProps {
  lang: Locale;
}

export default async function NavigatorList({
  lang,
}: NavigatorListProps) {
  const t = useTranslations(lang);
  const guides = await getFormattedGuideData(lang);
  // console.log('guides:', guides);
  return (
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
        <p>
          {t({
            ja: "ナビゲーターが見つかりません",
            en: "No navigators found",
            fr: "Aucun navigateur trouvé",
          })}
        </p>
      )}
    </div>
  );
}
