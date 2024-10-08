import type { WPGalleryItem } from '@/types';

export interface Guide {
	id: number;
	wpPostId?: number;
	title: string;
	name: string;
	photo?: string;
	description?: string;
	career?: string;
	regionIds?: number[];
	regions?: string[];
	tags: {
    id: number;
    name: string;
    slug: string;
  }[];
	values: {
		title: string;
		description: string;
	}[];
}
