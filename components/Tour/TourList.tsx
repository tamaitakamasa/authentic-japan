import { Locale } from "@/constants/site";
import {
  getFormattedActivities,
  filterActivitiesByQuery,
  getFormattedGuideData,
  getFormattedRegionData,
} from "@/lib/utils";
import { ActivityFilters } from "@/types/activity";
import ClientFilterComponent from "./ClientFilterComponent";
import { TourItem } from "./TourItem";
import { useTranslations } from "@/lib/i18n";

interface TourListProps {
  lang: Locale;
  filters?: ActivityFilters;
}

export default async function TourList({
  lang,
  filters,
}: TourListProps) {
  const t = useTranslations(lang);
  const [activities, guides, regions] = await Promise.all([
    getFormattedActivities(
      {
        page: 1,
        pageSize: 100,
      },
      lang
    ),
    getFormattedGuideData(lang),
    getFormattedRegionData(lang),
  ]);

  const filteredActivities = filterActivitiesByQuery(
    activities,
    filters
  );
	const filteredActivitiesCount = filteredActivities.length;
  return (
    <>
      <div className="absolute -top-44">
        <ClientFilterComponent
          lang={lang}
          guides={guides}
          regions={regions}
          currentFilters={filters}
					filteredActivitiesCount={filteredActivitiesCount}
        />
      </div>
      <div className="c-tours">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <TourItem
              className="c-tours__tour"
              key={activity.id}
              activity={activity}
            />
          ))
        ) : (
          <p>
            {" "}
            {t({
              ja: "ツアーが見つかりません。",
              en: "No activities found.",
              fr: "Aucune activité trouvée.",
            })}
          </p>
        )}
      </div>
    </>
  );
}
