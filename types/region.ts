import { WPGalleryItem } from "./wordpress";

export interface Region {
	id: number;
	name: string;
	description: string;
	mv: string;
	area: {
		value: string;
		label: string;
	};
	gallery: WPGalleryItem[];
	access: string;
}
