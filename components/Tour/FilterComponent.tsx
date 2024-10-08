'use client';

import React, { useState, useCallback } from 'react';
import { Guide, Region } from '@/types';
import { useTranslations } from '@/lib/i18n';
import { Locale } from '@/constants/site';

interface FilterOption {
	id: number;
	name: string;
}

interface FilterComponentProps {
	guides: Guide[];
	regions: Region[];
	tags: FilterOption[];
	onFilterChange: (filters: FilterState) => void;
	lang: Locale; // 言語を指定するためのpropを追加
}

interface FilterState {
	guideId: number | null;
	regionId: number | null;
	tagIds: number[];
}

const FilterButtonGroup: React.FC<{
	label: string;
	options: FilterOption[];
	selectedIds: number[];
	onChange: (ids: number[]) => void;
	multiSelect?: boolean;
}> = React.memo(({ label, options, selectedIds, onChange, multiSelect = false }) => (
	<div className="c-filter-group">
		<div className="c-filter-group__label">{label}</div>
		<div className="c-filter-group__buttons">
			{options.map((option) => (
				<button
					key={option.id}
					className={`c-filter-group__button u-hover ${selectedIds.includes(option.id) ? 'is-active' : ''}`}
					onClick={() => {
						if (multiSelect) {
							onChange(selectedIds.includes(option.id) ? selectedIds.filter((id) => id !== option.id) : [...selectedIds, option.id]);
						} else {
							onChange(selectedIds.includes(option.id) ? [] : [option.id]);
						}
					}}>
					{option.name}
				</button>
			))}
		</div>
	</div>
));

FilterButtonGroup.displayName = 'FilterButtonGroup';

export const FilterComponent: React.FC<FilterComponentProps> = React.memo(
  ({ guides, regions, tags, onFilterChange, lang }) => {
    const t = useTranslations(lang);

    const [filters, setFilters] = useState<FilterState>({
      guideId: null,
      regionId: null,
      tagIds: [],
    });

    const handleFilterChange = useCallback(
      (filterType: keyof FilterState, value: number[]) => {
        const newFilters = {
          ...filters,
          [filterType]: filterType === 'tagIds' ? value : value.length > 0 ? value[0] : null,
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
      },
      [filters, onFilterChange]
    );

    return (
      <div className="c-filter">
        <FilterButtonGroup
          label={t({ ja: 'コーディネーターで絞り込む', en: 'Filter by Navigator' })}
          options={guides}
          selectedIds={filters.guideId ? [filters.guideId] : []}
          onChange={(ids) => handleFilterChange('guideId', ids)}
        />
        <FilterButtonGroup
          label={t({ ja: '地域で絞り込む', en: 'Filter by Region' })}
          options={regions}
          selectedIds={filters.regionId ? [filters.regionId] : []}
          onChange={(ids) => handleFilterChange('regionId', ids)}
        />
        <FilterButtonGroup
          label={t({ ja: 'キーワードで絞り込む', en: 'Filter by Keyword' })}
          options={tags}
          selectedIds={filters.tagIds}
          onChange={(ids) => handleFilterChange('tagIds', ids)}
          multiSelect={true}
        />
      </div>
    );
  }
);

FilterComponent.displayName = 'FilterComponent';
