import { BokunResponseData, WPSiteContent, WPRegion, WPGuide, WPTour, WPTag } from '@/types';
import { Locale, DEFAULT_LOCALE } from '@/constants/site';

const BOKUN_API_BASE_URL = 'https://bokun-wrapper.pages.dev';
// const BOKUN_API_BASE_URL = 'https://neighborsflavorstours-bokun-wrapper.pages.dev';
const WP_API_BASE_URL = 'https://shimatoworks.xsrv.jp/transformativetour/wp-json/wp/v2';

interface BokunSearchParams {
	facetFilters?: Array<{
		excluded: boolean;
		name: string;
		values: string[];
	}>;
	page: number;
	pageSize: number;
	vendorId?: number;
}

// カスタムエラークラス
class FetchError extends Error {
	constructor(public status: number, message: string) {
		super(message);
		this.name = 'FetchError';
	}
}

// 再利用可能なfetch関数
async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
	const response = await fetch(url, options);
	if (!response.ok) {
		throw new FetchError(response.status, `HTTP error! status: ${response.status}`);
	}
	return await response.json();
}

// キャッシュオブジェクト
const cache: Record<string, unknown> = {};

// キャッシュ付きfetch関数
async function cachedFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
	const start = Date.now();
	let source: 'cache' | 'fetch';

	if (process.env.NODE_ENV === 'development') {
		// 開発環境ではキャッシュを使用しない
		const data = await fetcher();
		source = 'fetch';
		const end = Date.now();
		const duration = end - start;
		console.log(`${source}: ${key} (${duration}ms)`);
		return data;
	}

	if (cache[key]) {
		source = 'cache';
		const data = cache[key] as T;
		const end = Date.now();
		const duration = end - start;
		console.log(`${source}: ${key} (${duration}ms)`);
		return data;
	}

	const data = await fetcher();
	cache[key] = data;
	source = 'fetch';
	const end = Date.now();
	const duration = end - start;
	console.log(`${source}: ${key} (${duration}ms)`);
	return data;
}

export async function postSearchActivities(params: BokunSearchParams, lang: Locale = DEFAULT_LOCALE): Promise<BokunResponseData> {
	const url = `${BOKUN_API_BASE_URL}/activity.json/search?lang=${encodeURIComponent(lang)}`;
	return cachedFetch(`activities-${lang}-${JSON.stringify(params)}`, () =>
		fetchWithErrorHandling<BokunResponseData>(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(params)
		})
	);
}

export async function getWPSiteOptions(lang: Locale = DEFAULT_LOCALE): Promise<WPSiteContent> {
	const BASE_URL = 'https://shimatoworks.xsrv.jp/transformativetour/wp-json';
	const url = `${BASE_URL}/acf/v1/options?lang=${encodeURIComponent(lang)}&acf_format=standard`;
	// const url = `${WP_API_BASE_URL}/guide?lang=${encodeURIComponent(lang)}&acf_format=standard`;
	return cachedFetch(`options-${lang}`, () => fetchWithErrorHandling<WPSiteContent>(url));
}

export async function fetchWPTag(id: number): Promise<WPTag> {
	const url = `${WP_API_BASE_URL}/tags/${id}`;
	return cachedFetch(`tag-${id}`, () => fetchWithErrorHandling<WPTag>(url));
}

export async function fetchAllWPTags(lang: Locale = DEFAULT_LOCALE): Promise<WPTag[]> {
	const url = `${WP_API_BASE_URL}/tags?per_page=100&lang=${encodeURIComponent(lang)}`;
	return cachedFetch(`all-tags-${lang}`, () => fetchWithErrorHandling<WPTag[]>(url));
}

export async function fetchWPGuides(lang: Locale = DEFAULT_LOCALE): Promise<WPGuide[]> {
	const url = `${WP_API_BASE_URL}/guide?lang=${encodeURIComponent(lang)}&acf_format=standard`;
	return cachedFetch(`guides-${lang}`, () => fetchWithErrorHandling<WPGuide[]>(url));
}

export async function fetchWPRegions(lang: Locale = DEFAULT_LOCALE): Promise<WPRegion[]> {
	const url = `${WP_API_BASE_URL}/region?lang=${encodeURIComponent(lang)}&acf_format=standard`;
	return cachedFetch(`regions-${lang}`, () => fetchWithErrorHandling<WPRegion[]>(url));
}

export async function fetchWPTours(lang: Locale = DEFAULT_LOCALE): Promise<WPTour[]> {
	const url = `${WP_API_BASE_URL}/tour?lang=${encodeURIComponent(lang)}&acf_format=standard`;
	return cachedFetch(`tours-${lang}`, () => fetchWithErrorHandling<WPTour[]>(url));
}

// export async function fetchMergedActivities(searchParams: BokunSearchParams, lang: Locale = DEFAULT_LOCALE): Promise<Activity[]> {
//   try {
//     const [activitiesResponse, guides] = await Promise.all([
//       postSearchActivities(searchParams, lang),
//       getWPLocationData(lang)
//     ]);
// 		// console.log(activitiesResponse);

//     return activitiesResponse.items.map(item => ({
//       id: parseInt(item.id),
//       title: item.title,
//       photo: item.keyPhoto?.derived.find(p => p.name === 'large')?.url || item.keyPhoto?.originalUrl,
//       categories: item.activityCategories,
//       price: item.price,
//       location: item.locationCode?.name,
//     }));
//   } catch (error) {
//     // エラー処理
//     throw error;
//   }
// }

export type { BokunSearchParams };
