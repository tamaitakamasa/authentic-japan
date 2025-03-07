"use client";

import { Guide, Region, ActivityFilters } from "@/types";
import { useTranslations } from "@/lib/i18n";
import { Locale } from "@/constants/site";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

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
  lang,
}: FilterComponentProps) {
  const t = useTranslations(lang);
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(
    currentFilters?.search || ""
  );

  // 画面サイズの監視
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () =>
      window.removeEventListener("resize", checkScreenSize);
  }, []);

  // フィルター更新のメイン関数
  const updateFilters = useCallback(
    (
      type: keyof ActivityFilters,
      value: string,
      isRemoving: boolean = false
    ) => {
      const searchParams = new URLSearchParams();

      // 現在のフィルターの状態をコピー
      const currentGuides = new Set(currentFilters?.guides || []);
      const currentRegions = new Set(currentFilters?.regions || []);

      // フィルターの更新
      if (type === "guides") {
        if (isRemoving) {
          currentGuides.delete(value);
        } else {
          if (currentGuides.has(value)) {
            currentGuides.delete(value);
          } else {
            currentGuides.add(value);
          }
        }
      } else if (type === "regions") {
        if (isRemoving) {
          currentRegions.delete(value);
        } else {
          if (currentRegions.has(value)) {
            currentRegions.delete(value);
          } else {
            currentRegions.add(value);
          }
        }
      }

      // URLパラメータの設定
      if (currentGuides.size > 0) {
        searchParams.set(
          "guides",
          Array.from(currentGuides).join(",")
        );
      }
      if (currentRegions.size > 0) {
        searchParams.set(
          "regions",
          Array.from(currentRegions).join(",")
        );
      }
      if (type === "search" && value) {
        searchParams.set("search", value);
      } else if (currentFilters?.search) {
        searchParams.set("search", currentFilters.search);
      }

      // URLを更新
      router.push(`/${lang}/tours?${searchParams.toString()}`, {
        scroll: false,
      });
    },
    [currentFilters, lang, router]
  );

  // 検索フォームのサブミット
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters("search", searchKeyword);
  };

  // フィルターをクリア
  const handleClearFilters = useCallback(() => {
    setSearchKeyword("");
    router.push(`/${lang}/tours`, { scroll: false });
  }, [lang, router]);

  // 選択されているアイテムの数を取得
  const selectedGuideCount = currentFilters?.guides?.length || 0;
  const selectedRegionCount = currentFilters?.regions?.length || 0;

  return (
    <Card className="fixed z-10 bottom-4 md:relative md:bottom-auto font-[Noto_Sans_JP]">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className={`flex ${
              isSmallScreen ? "flex-col" : "flex-row"
            } gap-2 justify-start`}
          >
            <div className="flex gap-2">
              {/* ガイドフィルター */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size={isSmallScreen ? "sm" : "default"}>
                    {t({
                      ja: "ガイド",
                      en: "Guide",
                      fr: "Guide",
                    })}
                    {selectedGuideCount > 0 &&
                      ` (${selectedGuideCount})`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-56 font-[Noto_Sans_JP]"
                >
                  {guides.map((guide) => (
                    <DropdownMenuCheckboxItem
                      key={guide.id}
                      checked={currentFilters?.guides?.includes(
                        String(guide.id)
                      )}
                      onCheckedChange={() =>
                        updateFilters("guides", String(guide.id))
                      }
                    >
                      {guide.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* 地域フィルター */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {t({
                      ja: "地域",
                      en: "Region",
                      fr: "Région",
                    })}
                    {selectedRegionCount > 0 &&
                      ` (${selectedRegionCount})`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-56 font-[Noto_Sans_JP]"
                >
                  {regions.map((region) => (
                    <DropdownMenuCheckboxItem
                      key={region.id}
                      checked={currentFilters?.regions?.includes(
                        String(region.id)
                      )}
                      onCheckedChange={() =>
                        updateFilters("regions", String(region.id))
                      }
                    >
                      {region.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-2 flex-grow">
              {/* 検索フィールド */}
              <div className="relative flex-grow">
                <Input
                  placeholder={t({
                    ja: "キーワードで検索",
                    en: "Search by keyword",
                    fr: "Rechercher par mot-clé",
                  })}
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>

              {/* 検索ボタン */}
              <Button type="submit" variant="default">
                {t({
                  ja: "検索",
                  en: "Search",
                  fr: "Rechercher",
                })}
              </Button>
            </div>

            {/* クリアボタン */}
            {(selectedGuideCount > 0 ||
              selectedRegionCount > 0 ||
              currentFilters?.search) && (
              <Button
                type="button"
                variant="outline"
                onClick={handleClearFilters}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                {t({
                  ja: "クリア",
                  en: "Clear",
                  fr: "Effacer",
                })}
              </Button>
            )}
          </div>

          {/* 選択されたフィルターのバッジ表示 */}
          {(selectedGuideCount > 0 || selectedRegionCount > 0) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {currentFilters?.guides?.map((guideId) => {
                const guide = guides.find(
                  (g) => String(g.id) === guideId
                );
                if (!guide) return null;
                return (
                  <Badge
                    key={guideId}
                    variant="secondary"
                    className="gap-1 py-1 px-3"
                  >
                    {guide.name}
                    <X
                      size={14}
                      className="cursor-pointer ml-1"
                      onClick={() =>
                        updateFilters(
                          "guides",
                          String(guide.id),
                          true
                        )
                      }
                    />
                  </Badge>
                );
              })}
              {currentFilters?.regions?.map((regionId) => {
                const region = regions.find(
                  (r) => String(r.id) === regionId
                );
                if (!region) return null;
                return (
                  <Badge
                    key={regionId}
                    variant="secondary"
                    className="gap-1 py-1 px-3"
                  >
                    {region.name}
                    <X
                      size={14}
                      className="cursor-pointer ml-1"
                      onClick={() =>
                        updateFilters(
                          "regions",
                          String(region.id),
                          true
                        )
                      }
                    />
                  </Badge>
                );
              })}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
