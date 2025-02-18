import { Locale } from "@/constants/site";
import { getFormattedActivities, filterActivitiesByQuery } from "@/lib/utils";
import { ActivityFilters } from "@/types/activity";

interface TourListProps {
	lang: Locale;
	filters?: ActivityFilters;
}

export default async function TourList({ lang, filters }: TourListProps) {
	const activities = await getFormattedActivities({
		page: 1,
		pageSize: 10
	}, lang);

	const filteredActivities = filterActivitiesByQuery(activities, filters);
	// console.log('activities:', activities);
	console.log('filteredActivities:', filteredActivities);
	return (
		<div>
			{filteredActivities.map((activity) => (
				<div key={activity.id}>
					<h2>{activity.title}</h2>
					{/* <p>{activity.content}</p> */}
				</div>
			))}
		</div>
	)
}
