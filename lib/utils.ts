import { DEFAULT_LOCALE, Locale } from '@/constants/site';
import { Guide, Activity, Region } from '@/types';
import { BokunSearchParams, fetchAllWPTags, fetchWPGuides, fetchWPRegions, fetchWPTours, postSearchActivities } from './fetchData';

// タグ情報のキャッシュ
let tagCache: Map<number, { name: string; slug: string }> | null = null;

async function getTagCache(lang: Locale): Promise<Map<number, { name: string; slug: string }>> {
	if (!tagCache) {
		const tags = await fetchAllWPTags(lang);
		tagCache = new Map(tags.map((tag) => [tag.id, { name: tag.name, slug: tag.slug }]));
	}
	return tagCache;
}

export async function getFormattedGuideData(lang: Locale = DEFAULT_LOCALE): Promise<Guide[]> {
	const [guides, regions, tagCacheResult] = await Promise.all([fetchWPGuides(lang), fetchWPRegions(lang), getTagCache(lang)]);

	const regionMap = new Map(regions.map((region) => [region.id, region.acf.name]));

	const formattedGuides = await Promise.all(
		guides.map(async (guide) => {
			// console.log('guide:', guide);
			const tags = guide.tags
				? guide.tags.map((tagId) => {
						const tagInfo = tagCacheResult.get(tagId);
						return tagInfo ? { id: tagId, name: tagInfo.name, slug: tagInfo.slug } : { id: tagId, name: '', slug: '' };
				})
				: [];
			// const tags = guide.tags ? await Promise.all(guide.tags.map(fetchWPTag)) : [];

			return {
				id: guide.id,
				title: guide.acf.title,
				name: guide.acf.name,
				mv: guide.acf.mv,
				photo: guide.acf.photo,
				copy: guide.acf.copy,
				description: guide.acf.description,
				regionIds: guide.acf.region ?? [], // nullish coalescing operator を使用
				regions: guide.acf.region?.map((id) => regionMap.get(id) || '').filter((name): name is string => name !== '') ?? [],
				tags: tags.map((tag) => ({
					id: tag.id,
					name: tag.name,
					slug: tag.slug
				})),
				values: guide.acf.values ?? []
			};
		})
	);

	return formattedGuides;
}

export async function getFormattedRegionData(lang: Locale = DEFAULT_LOCALE): Promise<Region[]> {
	const regions = await fetchWPRegions(lang);
	// console.log('regions:', regions);
	return regions.map((region) => ({
		id: region.id,
		name: region.acf.name,
		// photo: region.acf.photo,
		description: region.acf.description,
		mv: region.acf?.mv?.sizes?.large
	}));
}

export async function getFormattedActivities(searchParams: BokunSearchParams, lang: Locale = DEFAULT_LOCALE): Promise<Activity[]> {
	try {
		const [bokunActivities, wpTours, formattedGuides, tagCacheResult] = await Promise.all([postSearchActivities(searchParams, lang), fetchWPTours(lang), getFormattedGuideData(lang), getTagCache(lang)]);

		// console.log('bokunActivities:', bokunActivities);

		const activities = await Promise.all(
			bokunActivities.items.map(async (item) => {
				const wpTour = wpTours.find((tour) => tour.acf.bokun_id === item.id);
				const guideIds = wpTour?.acf.guide || [];
				const guides = guideIds.map((id) => formattedGuides.find((guide) => guide.id === Number(id))).filter((guide): guide is Guide => guide !== undefined);

				// guides から regions を抽出
				const regions = Array.from(new Set(guides.flatMap((guide) => guide.regions))).filter((region): region is string => region !== undefined);

				// キャッシュからタグ情報を取得
				const tags = wpTour?.tags
					? wpTour.tags.map((tagId) => {
							const tagInfo = tagCacheResult.get(tagId);
							return tagInfo ? { id: tagId, name: tagInfo.name, slug: tagInfo.slug } : { id: tagId, name: '', slug: '' };
					  })
					: [];

				const formattedDuration = formatDuration(item.fields.durationWeeks || 0, item.fields.durationDays || 0, item.fields.durationHours || 0);
				const totalDays = (item.fields.durationWeeks || 0) * 7 + (item.fields.durationDays || 0);
				// const fields = item.fields || {};
				// console.log('fields:', fields);

				return {
					id: parseInt(item.id),
					wpId: wpTour?.id,
					title: item.title,
					excerpt: item.excerpt,
					photo: item.keyPhoto?.derived.find((p) => p.name === 'large')?.url || item.keyPhoto?.originalUrl,
					categories: item.activityCategories,
					tags: tags,
					price: item.price,
					formattedPrice: formatNumber(item.price),
					regions: regions,
					duration: formattedDuration,
					durationDays: totalDays,
					durationHours: totalDays > 0 ? 0 : item.fields.durationHours || 0,
					guideIds: guideIds,
					guides: guides
				};
			})
		);
		return activities;
	} catch (error) {
		console.error('Error in getFormattedActivities:', error);
		throw error;
	}
}

function formatDuration(weeks: number, days: number, hours: number): string {
	const totalDays = weeks * 7 + days;

	if (totalDays > 0) {
		return `${totalDays} Day${totalDays > 1 ? 's' : ''}`;
	} else if (hours > 0) {
		return `${hours} Hour${hours !== 1 ? 's' : ''}`;
	} else {
		return 'Less than an hour';
	}
}

export function formatNumber(num: number): string {
	return num.toLocaleString('ja-JP');
}

export function filterActivities(activities: Activity[], filters: { guideId: number | null; regionId: number | null; tagIds: number[] }, guides: Guide[], regions: Region[]): Activity[] {
	return activities.filter((activity) => {
		if (filters.guideId != null && !activity.guides?.some((guide) => guide.id === filters.guideId)) return false;
		if (filters.regionId != null) {
			const regionName = regions.find((r) => r.id === filters.regionId)?.name;
			if (regionName && !activity.regions?.includes(regionName)) return false;
		}
		if (filters.tagIds.length > 0 && !filters.tagIds.every((tagId) => activity.tags?.some((tag) => tag.id === tagId))) return false;
		return true;
	});
}

export function extractVideoID(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}
