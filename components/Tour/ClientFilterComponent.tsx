'use client';

import { Guide, Region, ActivityFilters } from '@/types';
import { useTranslations } from '@/lib/i18n';
import { Locale } from '@/constants/site';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

// interface FilterOption {
//   id: number;
//   name: string;
// }

interface FilterComponentProps {
  guides: Guide[];
  regions: Region[];
  // tags: FilterOption[];
  currentFilters?: ActivityFilters;
  lang: Locale;
}

export default function ClientFilterComponent({
  guides,
  regions,
  // tags,
  currentFilters,
  lang
}: FilterComponentProps) {
  const t = useTranslations(lang);
  const router = useRouter();

  const handleFilterChange = useCallback((type: keyof ActivityFilters, value: string) => {
    const searchParams = new URLSearchParams();

    // 現在のフィルターを全て設定
    if (currentFilters?.guides?.length) {
      searchParams.set('guides', currentFilters.guides.join(','));
    }
    if (currentFilters?.regions?.length) {
      searchParams.set('regions', currentFilters.regions.join(','));
    }
    if (currentFilters?.search) {
      searchParams.set('search', currentFilters.search);
    }

    // 新しい値を設定
    if (value) {
      searchParams.set(type, value);
    } else {
      searchParams.delete(type);
    }

    // URLを更新
    router.push(`/${lang}/tours?${searchParams.toString()}`);
  }, [currentFilters, lang, router]);

  return (
    <div className="c-filter">
      <div className="c-filter__section">
        <h3 className="c-filter__title">
          {t({
            ja: 'ガイド',
            en: 'Guide',
            fr: 'Guide'
          })}
        </h3>
        <div className="c-filter__items">
          {guides.map((guide) => (
            <button
              key={guide.id}
              className={`c-filter__item ${
                currentFilters?.guides?.includes(String(guide.id))
                  ? 'is-active'
                  : ''
              }`}
              onClick={() => handleFilterChange('guides', String(guide.id))}
            >
              {guide.name}
            </button>
          ))}
        </div>
      </div>

      <div className="c-filter__section">
        <h3 className="c-filter__title">
          {t({
            ja: '地域',
            en: 'Region',
            fr: 'Région'
          })}
        </h3>
        <div className="c-filter__items">
          {regions.map((region) => (
            <button
              key={region.id}
              className={`c-filter__item ${
                currentFilters?.regions?.includes(String(region.id))
                  ? 'is-active'
                  : ''
              }`}
              onClick={() => handleFilterChange('regions', String(region.id))}
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>

      {/* <div className="c-filter__section">
        <h3 className="c-filter__title">
          {t({
            ja: 'タグ',
            en: 'Tags',
            fr: 'Tags'
          })}
        </h3>
        <div className="c-filter__items">
          {tags.map((tag) => (
            <button
              key={tag.id}
              className={`c-filter__item ${
                currentFilters?.tags?.includes(String(tag.id))
                  ? 'is-active'
                  : ''
              }`}
              onClick={() => handleFilterChange('tags', String(tag.id))}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
}
