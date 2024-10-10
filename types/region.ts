import { WPGalleryItem } from "./wordpress";

export interface Region {
	id: number;
	name: string;
	description: string;
	mv: string;
	gallery: WPGalleryItem[];
	access: string;
}
