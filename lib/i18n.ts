import { LOCALES, DEFAULT_LOCALE } from '@/constants/site';
import type { Locale } from '@/constants/site';

// 例：{ja: 'お名前', en: 'Name', fr: 'Nom'}
type Multilingual = {
  [key in Locale]?: string;
};

// export function useTranslations(lang: Locale) {
// 	return function t(multilingual: Multilingual): string {
// 		// multilingual[lang] が存在しない場合は multilingual[DEFAULT_LOCALE] を返す
// 		return multilingual[lang] || multilingual[DEFAULT_LOCALE];
// 	};
// }

export function useTranslations(lang: Locale) {
  return function t(multilingual: Multilingual): string {
    // 指定された言語の翻訳がある場合はそれを返す
    if (multilingual[lang]) {
      return multilingual[lang]!;
    }

    // 指定された言語の翻訳がない場合、デフォルト言語の翻訳を返す
    if (multilingual[DEFAULT_LOCALE]) {
      return multilingual[DEFAULT_LOCALE]!;
    }

    // デフォルト言語の翻訳もない場合、最初に見つかった翻訳を返す
    for (const locale of LOCALES) {
      if (multilingual[locale]) {
        return multilingual[locale]!;
      }
    }

    // どの翻訳も見つからない場合、エラーメッセージを返す
    return 'Translation not found';
  };
}

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/');
	if (LOCALES.includes(lang as (typeof LOCALES)[number])) {
		return lang as (typeof LOCALES)[number];
	}
	return DEFAULT_LOCALE;
}
