import { Locale } from '@/constants/site';
import { getFormattedActivities, filterActivitiesByQuery, getFormattedGuideData, getFormattedRegionData } from '@/lib/utils';
import { ActivityFilters } from '@/types/activity';
import ClientFilterComponent from './ClientFilterComponent';

interface TourListProps {
	lang: Locale;
	filters?: ActivityFilters;
}

export default async function TourList({ lang, filters }: TourListProps) {
	// const activities = await getFormattedActivities({
	// 	page: 1,
	// 	pageSize: 10
	// }, lang);
	const [activities, guides, regions] = await Promise.all([
		getFormattedActivities(
			{
				page: 1,
				pageSize: 10
			},
			lang
		),
		getFormattedGuideData(lang),
		getFormattedRegionData(lang)
	]);

	const filteredActivities = filterActivitiesByQuery(activities, filters);
	// console.log('activities:', activities);
	console.log('filteredActivities:', filteredActivities);
	return (
		<>
			<div>
				<ClientFilterComponent lang={lang} guides={guides} regions={regions} currentFilters={filters} />
			</div>
			<div>
				{filteredActivities.map((activity) => (
					<div key={activity.id}>
						<h2>{activity.title}</h2>
						{/* <p>{activity.content}</p> */}
					</div>
				))}
			</div>
		</>
	);
}
