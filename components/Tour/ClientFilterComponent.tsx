"use client";

import { Guide, Region, ActivityFilters } from "@/types";
import { useTranslations } from "@/lib/i18n";
import { Locale } from "@/constants/site";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Maximize2,
  Minimize2,
  Search,
  UserRound,
} from "lucide-react";
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
import { motion, AnimatePresence } from "motion/react";

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
  // 現在は使用していないが、将来的にモバイル表示の調整に使用する可能性があるため残しておく
  const [, setIsSmallScreen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
      <div className="sticky bottom-8 mx-auto flex w-fit flex-row items-center justify-center gap-1 rounded-full border border-border/20 bg-muted/30 p-2 shadow-lg [&>*]:font-[Noto_Sans_JP]">
        {isExpanded ? (
          <Button
            size="icon"
            className="flex-none cursor-pointer rounded-full"
            onClick={() => setIsExpanded(false)}
          >
            <Minimize2 />
          </Button>
        ) : (
          <Button
            className="flex-none cursor-pointer gap-2 rounded-full"
            onClick={() => setIsExpanded(true)}
          >
            <Maximize2 />
            <span className="text-xs">検索する</span>
          </Button>
        )}

        <div className="block flex-none px-2 text-xs">
          ツアー :
          <span className="text-sm font-bold">
            {filteredActivitiesCount}
          </span>
          件
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex items-center"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="h-4 w-[1px] shrink-0 bg-muted-foreground"></div>

              {/* ガイドフィルター */}
              <motion.div
                className="flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
              >
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
              </motion.div>

              {/* 地域フィルター */}
              <motion.div
                className="flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
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
              </motion.div>

              {/* 検索ボタン */}
              <motion.div
                className="flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.15 }}
              >
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
              </motion.div>

              <div className="h-4 w-[1px] shrink-0 bg-muted-foreground"></div>

              {/* リセットボタン */}
              <Button
                variant="ghost"
                className="cursor-pointer rounded-full"
                onClick={() => {
                  // フィルターの状態をリセット
                  router.push(`/${lang}/tours`, {
                    scroll: false,
                  });
                }}
              >
                {/* {isSmallScreen ? <Search /> : <Search />} */}
                <span className="text-xs">
                  {t({
                    ja: "クリア",
                    en: "Clear",
                    fr: "Effacer",
                  })}
                </span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
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
