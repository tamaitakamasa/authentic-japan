"use client";

import { Guide, Region, ActivityFilters } from '@/types';
import { useTranslations } from '@/lib/i18n';
import { Locale } from '@/constants/site';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";

interface FilterComponentProps {
  guides: Guide[];
  regions: Region[];
  currentFilters?: ActivityFilters;
  lang: Locale;
}

export default function ClientFilterComponent({
  guides,
  regions,
  currentFilters,
  lang
}: FilterComponentProps) {
  const t = useTranslations(lang);
  const router = useRouter();

  // 選択状態をチェックする関数
  const isGuideSelected = useCallback((guideId: number) => {
    return currentFilters?.guides?.includes(String(guideId)) ?? false;
  }, [currentFilters?.guides]);

  const isRegionSelected = useCallback((regionId: number) => {
    return currentFilters?.regions?.includes(String(regionId)) ?? false;
  }, [currentFilters?.regions]);

  const handleFilterChange = useCallback((type: keyof ActivityFilters, value: string) => {
    const searchParams = new URLSearchParams();

    // 現在の選択状態に応じてフィルターを更新
    if (type === 'guides') {
      const currentGuides = new Set(currentFilters?.guides || []);
      if (currentGuides.has(value)) {
        currentGuides.delete(value);
      } else {
        currentGuides.add(value);
      }
      if (currentGuides.size > 0) {
        searchParams.set('guides', Array.from(currentGuides).join(','));
      }
    } else if (type === 'regions') {
      const currentRegions = new Set(currentFilters?.regions || []);
      if (currentRegions.has(value)) {
        currentRegions.delete(value);
      } else {
        currentRegions.add(value);
      }
      if (currentRegions.size > 0) {
        searchParams.set('regions', Array.from(currentRegions).join(','));
      }
    }

    // 検索パラメータが存在する場合は維持
    if (currentFilters?.search) {
      searchParams.set('search', currentFilters.search);
    }

    // URLを更新
    router.push(`/${lang}/tours?${searchParams.toString()}`, {
      scroll: false
    });
  }, [currentFilters, lang, router]);

  // フィルターをクリアする関数
  const handleClearFilters = useCallback(() => {
    router.push(`/${lang}/tours`, { scroll: false });
  }, [lang, router]);

  // アクティブなフィルターの数を計算
  const activeFilterCount =
    (currentFilters?.guides?.length || 0) +
    (currentFilters?.regions?.length || 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <span>
            {t({
              ja: 'フィルター',
              en: 'Filters',
              fr: 'Filtres'
            })}
          </span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* ガイドフィルター */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">
              {t({
                ja: 'ガイド',
                en: 'Guide',
                fr: 'Guide'
              })}
            </h3>
            <ScrollArea className="h-[180px] rounded-md border p-4">
              <div className="space-y-2">
                {guides.map((guide) => (
                  <Button
                    key={guide.id}
                    variant={isGuideSelected(guide.id) ? "default" : "outline"}
                    className={`w-full justify-start ${
                      isGuideSelected(guide.id) ? "bg-primary text-primary-foreground" : ""
                    }`}
                    onClick={() => handleFilterChange('guides', String(guide.id))}
                  >
                    {guide.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* 地域フィルター */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">
              {t({
                ja: '地域',
                en: 'Region',
                fr: 'Région'
              })}
            </h3>
            <ScrollArea className="h-[180px] rounded-md border p-4">
              <div className="space-y-2">
                {regions.map((region) => (
                  <Button
                    key={region.id}
                    variant={isRegionSelected(region.id) ? "default" : "outline"}
                    className={`w-full justify-start ${
                      isRegionSelected(region.id) ? "bg-primary text-primary-foreground" : ""
                    }`}
                    onClick={() => handleFilterChange('regions', String(region.id))}
                  >
                    {region.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleClearFilters}
          disabled={activeFilterCount === 0}
        >
          <X className="mr-2 h-4 w-4" />
          {t({
            ja: 'フィルターをクリア',
            en: 'Clear Filters',
            fr: 'Effacer les filtres'
          })}
        </Button>
      </CardFooter>
    </Card>
  );
}
