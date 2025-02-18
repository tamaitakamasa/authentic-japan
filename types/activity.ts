import type { Guide } from '@/types';
// import type { BokunActivity } from '@/types';

export interface ActivityFilters {
	guides?: string[];
	regions?: string[];
	search?: string;
}

export interface Activity {
	id: number;
	title: string;
	summary?: string;
	excerpt?: string;
	photo?: string;
	categories: string[];
	tags?: {
    id: number;
    name: string;
    slug: string;
  }[];
	price: number;
	formattedPrice: string;
	regions?: string[];
	duration: string;
	durationDays: number;
	durationHours: number;
	guides?: Guide[];
	guideIds?: number[];
}
