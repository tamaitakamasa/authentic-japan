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

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

export interface WPImageSize {
  file: string;
  width: number;
  height: number;
  filesize: number;
  mime_type: string;
  source_url: string;
}

export interface WPMediaSizes {
  medium: WPImageSize;
  large: WPImageSize;
  thumbnail: WPImageSize;
  medium_large: WPImageSize;
  "1536x1536": WPImageSize;
  "2048x2048": WPImageSize;
  full: Omit<WPImageSize, "filesize">; // full サイズには filesize プロパティがないようです
  [key: string]: WPImageSize | Omit<WPImageSize, "filesize">; // カスタムサイズに対応
}

export interface WPMediaItem {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: {
    _acf_changed: boolean;
  };
  class_list: string[];
  acf: unknown[]; // You might want to define a more specific type if ACF fields are used
  description: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    filesize: number;
    sizes: WPMediaSizes;
    image_meta: {
      aperture: string;
      credit: string;
      camera: string;
      caption: string;
      created_timestamp: string;
      copyright: string;
      focal_length: string;
      iso: string;
      shutter_speed: string;
      title: string;
      orientation: string;
      keywords: string[];
    };
    original_image: string;
  };
  post: number;
  source_url: string;
  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
    about: Array<{ href: string }>;
    author: Array<{ embeddable: boolean; href: string }>;
  };
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

// export interface WPArticleWithDetails extends WPArticle {
// 	featured_media_item?: WPMediaItem;
// 	category_details: WPCategory[];
// }

export interface WPNewsArticle extends WPArticle {
	acf: {
		guide?: number[];
	};
}

export interface WPGuide extends WPArticle {
	acf: {
		// vendor_id: string;
		title: string;
		name: string;
		mv: WPGalleryItem;
		photo: WPGalleryItem;
		copy: string;
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
		gallery: WPGalleryItem[];
		access: string;
	};
}

export interface WPTour extends WPArticle {
	acf: {
		bokun_id: string;
		guide: number[];
	};
}

// export interface WPLocationData {
// 	locationGroups: LocationGroup[];
// }

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
	regions_description?: string;
	regions_mv?: WPGalleryItem;
	// regions: {
	// 	description: string;
	// 	mv: WPGalleryItem;
	// };
	navigators_title: string;
	navigators_description: string;
	navigators_mv?: WPGalleryItem;
	tours_mv?: WPGalleryItem;
}
