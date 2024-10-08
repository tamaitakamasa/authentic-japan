import { LocationGroup } from './location';

export interface WPArticle {
	id: number;
	date: string;
	title: {
		rendered: string;
	};
	content: {
		rendered: string;
	};
	featured_media: number;
	categories: number[];
	tags: number[];
}

export interface WPLink {
	href: string;
}

export interface WPTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

export interface WPImageSizes {
	thumbnail: string;
	'thumbnail-width': number;
	'thumbnail-height': number;
	medium: string;
	'medium-width': number;
	'medium-height': number;
	medium_large: string;
	'medium_large-width': number;
	'medium_large-height': number;
	large: string;
	'large-width': number;
	'large-height': number;
	'1536x1536': string;
	'1536x1536-width': number;
	'1536x1536-height': number;
	'2048x2048': string;
	'2048x2048-width': number;
	'2048x2048-height': number;
}

export interface WPGalleryItem {
	ID: number;
	id: number;
	title: string;
	filename: string;
	filesize: number;
	url: string;
	link: string;
	alt: string;
	author: string;
	description: string;
	caption: string;
	name: string;
	status: string;
	uploaded_to: number;
	date: string;
	modified: string;
	menu_order: number;
	mime_type: string;
	type: string;
	subtype: string;
	icon: string;
	width: number;
	height: number;
	sizes: WPImageSizes;
}

export interface WPGuide extends WPArticle {
	acf: {
		vendor_id: string;
		title: string;
		name: string;
		photo: WPGalleryItem;
		description: string;
		career: string;
		region: number[];
		values: {
			title: string;
			description: string;
		}[];
	};
}

export interface WPRegion extends WPArticle {
	acf: {
		name: string;
		description: string;
		mv: WPGalleryItem;
	};
}

export interface WPTour extends WPArticle {
	acf: {
		bokun_id: string;
		guide: number[];
		// guide: string[];
		// regions?: string[];
	};
}

export interface WPLocationData {
	locationGroups: LocationGroup[];
}

export interface WPSiteContent {
	home_slider: {
		main_copy: string;
		sub_copy: string;
		mv: WPGalleryItem;
		url: string;
	}[];
	home_regions_description?: string;
	home_about_description?: string;
	home_about_mv?: WPGalleryItem;
	home_about_video?: string;
	// locations?: LocationGroup[];
	about_description?: string;
	about_video?: string;
	about_mv?: WPGalleryItem;
	about_section0_description?: string;
	about_section1_title?: string;
	about_section1_description?: string;
	about_section2_title?: string;
	about_section2_description?: string;
	about_section3_title?: string;
	about_section3_description?: string;
	regions: {
		description: string;
		mv: WPGalleryItem;
	};
	navigators_title: string;
	navigators_description: string;
}
