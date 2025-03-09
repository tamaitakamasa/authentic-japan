'use client';

// import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, Locale } from '@/constants/site';

export default function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
  const pathname = usePathname();

  return (
    <div className="c-lang-switcher">
      {LOCALES.map((locale) => {
        const isActive = currentLang === locale;
        // Remove the current language prefix and add the new one
        const newPathname = pathname.replace(`/${currentLang}`, `/${locale}`);

        if (isActive) {
          return (
            <a
              key={locale}
							href={newPathname}
              className="c-lang-switcher__item is-active"
              aria-current="true"
            >
              {locale.toUpperCase()}
            </a>
          );
        }

        return (
          <a
            key={locale}
            href={newPathname}
            className="c-lang-switcher__item"
            lang={locale}
          >
            {locale.toUpperCase()}
          </a>
        );
      })}
    </div>
  );
}
