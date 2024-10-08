// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_URL = 'https://transformativetour.pages.dev/';
export const SITE_TITLE = 'AUTHENTIC JAPAN';
export const SITE_DESCRIPTION = 'A Gathering of Passionate Navigators Providing Transformative Travel in Japan';

export const LOCALES = ['en', 'ja', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE = 'ja' as Locale;

export const NAVI_ITEMS = [
	{ label: 'NAVIGATORS', href: `/navigator` },
	{ label: 'TOURS', href: `/tour` },
	{ label: 'REGIONS', href: `/region` },
	{ label: 'NEWS', href: `/news` },
	{ label: 'ABOUT US', href: `/about` },
	{ label: 'CONTACT', href: `/contact` },
];

export const FOOTER_NAVI_ITEMS = [
	{ label: 'NAVIGATORS', href: `/navigator` },
	{ label: 'REGIONS', href: `/region` },
	{ label: 'ABOUT US', href: `/about` },
	{ label: 'TOURS', href: `/tour` },
	{ label: 'NEWS', href: `/news` },
	{ label: 'CONTACT', href: `/contact` }
];
