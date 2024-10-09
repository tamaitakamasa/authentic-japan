import type { WPArticle, WPMediaItem } from '@/types';

export interface News extends WPArticle {
	featured_media_item?: WPMediaItem;
	news_categories: {
    id: number;
    name: string;
    slug: string;
  }[];
}
