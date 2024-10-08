interface TermFacetEntry {
	key: string;
	count: number;
}

interface TermFacet {
	name: string;
	title: string;
	entries: TermFacetEntry[];
	flags: any[];
	multipleSelection: boolean;
	sortedEntries: TermFacetEntry[];
}

interface TermFacets {
	difficulty: TermFacet;
	country: TermFacet;
	city: TermFacet;
	supplier: TermFacet;
	activityAttributes: TermFacet;
	guidanceLanguages: TermFacet;
	activityType: TermFacet;
	activityCategories: TermFacet;
}

interface LocationCode {
	country: string;
	location: string;
	name: string;
}

interface GooglePlace {
	placeId: string;
	address: string;
}

interface Vendor {
	id: number;
	title: string;
}

export interface DerivedPhoto {
	name: string;
	url: string;
	cleanUrl: string;
}

export interface KeyPhoto {
	id: number;
	originalUrl: string;
	description: string | null;
	alternateText: string | null;
	height: string;
	width: string;
	flags: any[];
	derived: DerivedPhoto[];
	fileName: string;
}

export interface BokunActivity {
	id: string;
	productGroupId: number;
	title: string;
	summary: string;
	excerpt?: string;
	price: number;
	locationCode?: LocationCode;
	googlePlace: GooglePlace;
	vendor: Vendor;
	box: boolean;
	inventoryLocal: boolean;
	usedInAffiliateHub: boolean;
	showInMarketplaceSearch: boolean;
	boxedProductId: number;
	boxedSupplierId: number;
	difficultyLevel: string;
	activityCategories: string[];
	keywords: string[];
	flags: any[];
	reviewRating: number;
	reviewCount: number;
	durationText: string;
	baseLanguage: string;
	languages: string[];
	paymentCurrencies: string[];
	customFields: any[];
	places: string[];
	keyPhoto: KeyPhoto;
	photos: KeyPhoto[];
	videos: any[];
	fields: {
		durationWeeks: number;
		durationDays: number;
		durationHours: number;
	};
}

export interface BokunResponseData {
	tookInMillis: number;
	totalHits: number;
	tagFilters: any[];
	tagFacets: any[];
	termFacets: TermFacets;
	tagFacetHierarchy: any[];
	items: BokunActivity[];
}
