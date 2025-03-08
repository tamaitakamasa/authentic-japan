// constants/metadata.ts
import { Locale } from "@/constants/site";

type MetadataType = {
  title: string;
  separator: string;
  description: string;
  keywords: string;
};

export const METADATA: Record<Locale, MetadataType> = {
  ja: {
    title:
      "Authentic Japan - 地域ごとの魅力を“旅”を通じて伝え、人と人を繋ぐプラットフォームです",
    separator: " | ",
    description:
      "「Authentic Japan」は、その地域を愛するナビゲーターたちがその地に訪れる人に独自の旅を提供し、人と人を繋げるプラットフォームです。",
    keywords:
      "日本旅行, 文化体験, 伝統文化, ローカルガイド, 体験ツアー",
  },
  en: {
    title: "Authentic Japan - A platform that connects people through travel, conveying the charm of each region",
    separator: " | ",
    description:
      "Authentic Japan is a platform where navigators who love their local regions offer unique travel experiences to visitors, connecting people with one another.",
    keywords:
      "Japan travel, authentic experience, cultural tours, local guides, Japanese culture",
  },
  fr: {
    title: "Authentic Japan - Une plateforme qui relie les gens à travers le voyage, en transmettant le charme de chaque région",
    separator: " | ",
    description:
      "Authentic Japan est une plateforme où des navigateurs passionnés par leur région proposent des voyages uniques aux visiteurs, connectant ainsi les gens entre eux.",
    keywords:
      "voyage au Japon, expérience authentique, visites culturelles, guides locaux, culture japonaise",
  },
};
