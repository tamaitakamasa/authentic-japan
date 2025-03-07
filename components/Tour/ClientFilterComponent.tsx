"use client";

import { Guide, Region, ActivityFilters } from "@/types";
import { useTranslations } from "@/lib/i18n";
import { Locale } from "@/constants/site";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Maximize2, Minimize2, Search, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import SearchModal from "./SearchModal";

interface FilterComponentProps {
  guides: Guide[];
  regions: Region[];
  currentFilters?: ActivityFilters;
  lang: Locale;
  filteredActivitiesCount: number;
}

interface CurrentLightProps {
  className?: string;
}
function CurrentLight({ className }: CurrentLightProps) {
  return (
    <div
      className={cn(
        "absolute top-0 aspect-square w-2 -translate-y-1/2 rounded-full bg-sky-500 shadow-[0_-2px_10px] shadow-sky-500",
        className,
      )}
    />
  );
}

export default function ClientFilterComponent({
  guides,
  regions,
  currentFilters,
  lang,
  filteredActivitiesCount,
}: FilterComponentProps) {
  const t = useTranslations(lang);
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  console.log(isSmallScreen);

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
      isRemoving: boolean = false,
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
          Array.from(currentGuides).join(","),
        );
      }
      if (currentRegions.size > 0) {
        searchParams.set(
          "regions",
          Array.from(currentRegions).join(","),
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
    [currentFilters, lang, router],
  );

  // 選択されているアイテムの数を取得
  const selectedGuideCount = currentFilters?.guides?.length || 0;
  const selectedRegionCount = currentFilters?.regions?.length || 0;
  const hasSearchTerm = !!currentFilters?.search;

  return (
    <>
      <div className="fixed bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 overflow-hidden rounded-full border border-border/20 bg-muted/30 p-2 shadow-lg backdrop-blur [&>*]:font-[Noto_Sans_JP]">
        <div className={`flex items-center justify-start gap-2`}>
          <Button size="icon" className="cursor-pointer rounded-full">
            <Minimize2 />
          </Button>
          <Button className="cursor-pointer rounded-full">
            <Maximize2 />
            <span className="text-xs">検索する</span>
          </Button>

          <span className="px-2 text-xs">
            ツアー :{" "}
            <span className="text-sm font-bold">
              {filteredActivitiesCount}
            </span>
            件
          </span>
          <div className="h-4 w-[1px] shrink-0 bg-muted-foreground"></div>
          {/* ガイドフィルター */}
          <div className="flex items-center justify-center">
            {selectedGuideCount > 0 && <CurrentLight />}
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer rounded-full"
                      >
                        <UserRound />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent className="p-3">
                    <p className="font-[Noto_Sans_JP]">
                      ナビゲーターで絞り込む
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent
                align="start"
                className="w-56 font-[Noto_Sans_JP]"
              >
                {guides.map((guide) => (
                  <DropdownMenuCheckboxItem
                    key={guide.id}
                    checked={currentFilters?.guides?.includes(
                      String(guide.id),
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
          </div>

          {/* 地域フィルター */}
          <div className="flex items-center justify-center">
            {selectedRegionCount > 0 && <CurrentLight />}
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer rounded-full"
                      >
                        <MapPin />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent className="p-3">
                    <p className="font-[Noto_Sans_JP]">
                      地域で絞り込む
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent
                align="start"
                className="w-56 font-[Noto_Sans_JP]"
              >
                {regions.map((region) => (
                  <DropdownMenuCheckboxItem
                    key={region.id}
                    checked={currentFilters?.regions?.includes(
                      String(region.id),
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

          {/* 検索ボタン */}
          <div className="flex items-center justify-center">
            {hasSearchTerm && <CurrentLight />}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer rounded-full"
                    onClick={() => setIsSearchModalOpen(true)}
                  >
                    <Search />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="p-3">
                  <p className="font-[Noto_Sans_JP]">
                    キーワードで絞り込む
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="h-4 w-[1px] shrink-0 bg-muted-foreground"></div>

          {/* リセットボタン */}
          <Button
            variant="ghost"
            className="cursor-pointer rounded-full"
            onClick={() => {
              // フィルターの状態をリセット
              router.push(`/${lang}/tours`, { scroll: false });
            }}
          >
            <span className="text-xs">
              {t({
                ja: "クリア",
                en: "Clear",
                fr: "Effacer",
              })}
            </span>
          </Button>
        </div>
      </div>

      {/* 検索モーダル */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        currentFilters={currentFilters}
        lang={lang}
      />
    </>
  );
}
