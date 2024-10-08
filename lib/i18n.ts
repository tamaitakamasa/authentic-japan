import { LOCALES, DEFAULT_LOCALE } from '@/constants/site';
import type { Locale } from '@/constants/site';

// 例：{ja: 'お名前', en: 'Name'}
type Multilingual = {
	[key in Locale]: string;
};

export function useTranslations(lang: Locale) {
	return function t(multilingual: Multilingual): string {
		// multilingual[lang] が存在しない場合は multilingual[DEFAULT_LOCALE] を返す
		return multilingual[lang] || multilingual[DEFAULT_LOCALE];
	};
}

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/');
	if (LOCALES.includes(lang as (typeof LOCALES)[number])) {
		return lang as (typeof LOCALES)[number];
	}
	return DEFAULT_LOCALE;
}
