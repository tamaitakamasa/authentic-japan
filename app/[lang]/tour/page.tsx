// 'use client';

// import Image from 'next/image';
import { Locale } from '@/constants/site';
// import { TourItem } from '@/components/Tour/TourItem';
import { getFormattedActivities, getFormattedGuideData, getFormattedRegionData } from '@/lib/utils';
import { ContentHeader } from '@/components/Layout/ContentHeader';
// import { FilterComponent } from '@/components/FilterComponent';
import { ClientFilteredActivities } from '@/components/Tour/ClientFilteredActivities';
import { getWPSiteOptions } from '@/lib/fetchData';
import Image from 'next/image';

export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {

	// const [siteOptions, guides, regions, activities] = await Promise.all([
  //   getWPSiteOptions(lang),
  //   getFormattedGuideData(lang),
  //   getFormattedRegionData(lang),
  //   getFormattedActivities({ page: 1, pageSize: 10 }, lang)
  // ]);

	const siteOptions = await getWPSiteOptions(lang);
	const guides = await getFormattedGuideData(lang);
	const regions = await getFormattedRegionData(lang);
	const activities = await getFormattedActivities({ page: 1, pageSize: 10 }, lang);
	console.log('activities:', activities);

	const allTags = Array.from(new Set(activities.flatMap((activity) => activity.tags || []))).map((tag) => ({
		id: tag.id,
		name: tag.name,
		slug: tag.slug
	}));
	// console.log(activities);

	return (
		<>
			<ContentHeader title="TOURS" breadcrumbs={[{ label: 'HOME', href: '/' }, { label: 'TOURS' }]} lang={lang} />
			<div className="l-contents__body p-page p-page-tours">
				<div className="p-page__header u-full-bleed">
					{/* <div className="p-page__inner c-container">
						<h2 className="p-page__title">{siteOptions.navigators_title}</h2>
						<p className="p-page__description" dangerouslySetInnerHTML={{ __html: siteOptions.navigators_description || '' }} />
					</div> */}
					{siteOptions.tours_mv && (
						<figure className="p-page__mv">
							<Image src={siteOptions.tours_mv.sizes['2048x2048']} alt="" fill style={{ objectFit: 'cover' }} />
						</figure>
					)}
				</div>
				<ClientFilteredActivities lang={lang} initialActivities={activities} guides={guides} regions={regions} tags={allTags} />
			</div>
		</>
	);
}
