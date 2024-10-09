import type { Guide, WPMediaItem } from '@/types';

// export interface News extends WPNewsArticle {
// 	featured_media_item?: WPMediaItem;
// 	news_categories: {
//     id: number;
//     name: string;
//     slug: string;
//   }[];
// }

export interface News {
	id: number;
	date: string;
	title: string;
	content: string;
	featured_media?: WPMediaItem;
	categories: {
    id: number;
    name: string;
    slug: string;
  }[];
	guides?: Guide[];
}
