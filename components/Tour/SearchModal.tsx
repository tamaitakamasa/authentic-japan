"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Locale } from "@/constants/site";
import { useTranslations } from "@/lib/i18n";
import { ActivityFilters } from "@/types";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { debounce } from "@/lib/debounce";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters?: ActivityFilters;
  lang: Locale;
}

export default function SearchModal({
  isOpen,
  onClose,
  currentFilters,
  lang,
}: SearchModalProps) {
  const t = useTranslations(lang);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    currentFilters?.search || "",
  );
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // ローカルストレージから最近の検索履歴を読み込む
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // 検索履歴を保存する
  const saveSearch = (term: string) => {
    if (!term.trim()) return;

    const updatedSearches = [
      term,
      ...recentSearches.filter((s) => s !== term),
    ].slice(0, 5); // 最大5件まで保存

    setRecentSearches(updatedSearches);
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updatedSearches),
    );
  };

  // 検索を実行する
  const executeSearch = (term: string) => {
    if (!term.trim()) {
      // 空の検索の場合は検索パラメータを削除
      const searchParams = new URLSearchParams();

      if (
        currentFilters?.guides &&
        currentFilters.guides.length > 0
      ) {
        searchParams.set("guides", currentFilters.guides.join(","));
      }

      if (
        currentFilters?.regions &&
        currentFilters.regions.length > 0
      ) {
        searchParams.set("regions", currentFilters.regions.join(","));
      }

      router.push(`/${lang}/tours?${searchParams.toString()}`, {
        scroll: false,
      });
    } else {
      // 検索パラメータを追加
      const searchParams = new URLSearchParams();

      if (
        currentFilters?.guides &&
        currentFilters.guides.length > 0
      ) {
        searchParams.set("guides", currentFilters.guides.join(","));
      }

      if (
        currentFilters?.regions &&
        currentFilters.regions.length > 0
      ) {
        searchParams.set("regions", currentFilters.regions.join(","));
      }

      searchParams.set("search", term);

      router.push(`/${lang}/tours?${searchParams.toString()}`, {
        scroll: false,
      });

      // 検索履歴に追加
      saveSearch(term);
    }

    onClose();
  };

  // 検索ボタンのクリックハンドラ
  const handleSearch = () => {
    executeSearch(searchTerm);
  };

  // Enterキーのハンドラ
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 最近の検索をクリックしたときのハンドラ
  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    executeSearch(term);
  };

  // 検索履歴をクリアする
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-[Noto_Sans_JP]">
            {t({
              ja: "ツアーを検索",
              en: "Search Tours",
              fr: "Rechercher des visites",
            })}
          </DialogTitle>
          <DialogDescription className="font-[Noto_Sans_JP]">
            {t({
              ja: "キーワードを入力してツアーを検索できます",
              en: "Enter keywords to search for tours",
              fr: "Entrez des mots-clés pour rechercher des visites",
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t({
                ja: "キーワードを入力...",
                en: "Enter keywords...",
                fr: "Entrez des mots-clés...",
              })}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-9 font-[Noto_Sans_JP]"
              autoFocus
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-7 w-7"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button
            onClick={handleSearch}
            className="font-[Noto_Sans_JP]"
          >
            {t({
              ja: "検索",
              en: "Search",
              fr: "Rechercher",
            })}
          </Button>
        </div>

        {recentSearches.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h4 className="font-[Noto_Sans_JP] text-sm font-medium text-muted-foreground">
                {t({
                  ja: "最近の検索",
                  en: "Recent Searches",
                  fr: "Recherches récentes",
                })}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearRecentSearches}
                className="h-auto p-0 font-[Noto_Sans_JP] text-xs text-muted-foreground"
              >
                {t({
                  ja: "クリア",
                  en: "Clear",
                  fr: "Effacer",
                })}
              </Button>
            </div>
            <ScrollArea className="mt-2 max-h-[200px]">
              <div className="space-y-1">
                {recentSearches.map((term, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left font-[Noto_Sans_JP]"
                    onClick={() => handleRecentSearchClick(term)}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {term}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
