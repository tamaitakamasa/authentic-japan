'use client';

import React, { useState, useCallback } from 'react';
import { Activity, Guide, Region } from '@/types';
import { TourItem } from '@/components/Tour/TourItem';
import { FilterComponent } from '@/components/Tour/FilterComponent';
import { filterActivities } from '@/lib/utils';
import { Locale } from '@/constants/site';

interface ClientFilteredActivitiesProps {
	lang: Locale;
	initialActivities: Activity[];
	guides: Guide[];
	regions: Region[];
	tags: { id: number; name: string; slug: string }[];
}

export function ClientFilteredActivities({ initialActivities, guides, regions, tags, lang }: ClientFilteredActivitiesProps) {
	const [filteredActivities, setFilteredActivities] = useState(initialActivities);
	const handleFilterChange = useCallback(
		(newFilters: { guideId: number | null; regionId: number | null; tagIds: number[] }) => {
			const filtered = filterActivities(initialActivities, newFilters, guides, regions);
			setFilteredActivities(filtered);
		},
		[initialActivities, guides, regions]
	);

	return (
		<>
			<div className="p-page-tours__filter">
				<FilterComponent guides={guides} regions={regions} tags={tags} onFilterChange={handleFilterChange} lang={lang} />
			</div>
			<div className="p-page-tours__tours c-tours">{filteredActivities.length > 0 ? filteredActivities.map((activity) => <TourItem key={activity.id} activity={activity} className="c-tours__tour" />) : <p>ツアーが見つかりません。</p>}</div>
		</>
	);
}
