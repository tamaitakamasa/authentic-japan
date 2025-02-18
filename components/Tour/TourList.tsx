import { Locale } from '@/constants/site';
import { getFormattedActivities, filterActivitiesByQuery, getFormattedGuideData, getFormattedRegionData } from '@/lib/utils';
import { ActivityFilters } from '@/types/activity';
import ClientFilterComponent from './ClientFilterComponent';
import { TourItem } from './TourItem';

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
				pageSize: 100
			},
			lang
		),
		getFormattedGuideData(lang),
		getFormattedRegionData(lang)
	]);

	const filteredActivities = filterActivitiesByQuery(activities, filters);
	// console.log('activities:', activities);
	// console.log('filteredActivities:', filteredActivities);
	return (
		<>
			<div>
				<ClientFilterComponent lang={lang} guides={guides} regions={regions} currentFilters={filters} />
			</div>
			<div className='c-tours'>
				{filteredActivities.length > 0 ? (
					filteredActivities.map((activity) => <TourItem className='c-tours__tour' key={activity.id} activity={activity} />)
				) : (
					<p>No activities found.</p>
				)}
			</div>
		</>
	);
}
