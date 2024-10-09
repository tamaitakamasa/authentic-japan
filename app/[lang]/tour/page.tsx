// 'use client';

// import Image from 'next/image';
import { Locale } from '@/constants/site';
// import { TourItem } from '@/components/Tour/TourItem';
import { getFormattedActivities, getFormattedGuideData, getFormattedRegionData } from '@/lib/utils';
import { ContentHeader } from '@/components/Layout/ContentHeader';
// import { FilterComponent } from '@/components/FilterComponent';
import { ClientFilteredActivities } from '@/components/Tour/ClientFilteredActivities';

export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {
	const guides = await getFormattedGuideData(lang);
	const regions = await getFormattedRegionData(lang);
	const activities = await getFormattedActivities({ page: 1, pageSize: 10 }, lang);
	const allTags = Array.from(new Set(activities.flatMap((activity) => activity.tags || []))).map((tag) => ({
		id: tag.id,
		name: tag.name,
		slug: tag.slug
	}));
	// console.log(activities);

	return (
		<>
			<ContentHeader title="TOURS" breadcrumbs={[{ label: 'HOME', href: '/' }, { label: 'TOURS' }]} lang={lang} />
			<div className="l-contents__body p-page-tours">
				<ClientFilteredActivities lang={lang} initialActivities={activities} guides={guides} regions={regions} tags={allTags} />
			</div>
		</>
	);
}
