import { Locale } from '@/constants/site';
import { ContentHeader } from '@/components/Layout/ContentHeader';
import { getWPSiteOptions } from '@/lib/fetchData';
import Image from 'next/image';
import { Suspense } from 'react';
import TourList from '@/components/Tour/TourList';
import { ActivityFilters } from '@/types/activity';

export default async function Page({
	params: { lang },
	searchParams,
}: {
	params: { lang: Locale };
	searchParams: ActivityFilters;
}) {

	const siteOptions = await getWPSiteOptions(lang);
	console.log('searchParams:', searchParams);


	return (
		<>
			<ContentHeader title="TOURS" breadcrumbs={[{ label: 'HOME', href: '/' }, { label: 'TOURS' }]} lang={lang} />
			<div className="l-contents__body p-page p-page-tours">
				<div className="p-page__header u-full-bleed">
					{siteOptions.tours_mv && (
						<figure className="p-page__mv">
							<Image src={siteOptions.tours_mv.sizes['2048x2048']} alt="" fill style={{ objectFit: 'cover' }} />
						</figure>
					)}
				</div>
				<div className="p-page-tours__tours c-tours">
					<Suspense fallback={<p>Loading...</p>}>
						<TourList
							lang={lang}
							filters={{
								guides: searchParams.guides,
								regions: searchParams.regions,
								search: searchParams.search
							}}
						/>
					</Suspense>
				</div>
			</div>
		</>
	);
}
