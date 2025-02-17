// constants/metadata.ts
import { Locale } from '@/constants/site';

type MetadataType = {
  title: string;
  description: string;
  keywords: string;
};

export const METADATA: Record<Locale, MetadataType> = {
  en: {
    title: "Authentic Japan - Transformative Travel Experiences",
    description: "Discover authentic Japanese experiences with local navigators. Immerse yourself in cultural journeys across Japan's diverse regions.",
    keywords: "Japan travel, authentic experience, cultural tours, local guides, Japanese culture",
  },
  ja: {
    title: "Authentic Japan - 心に響く本物の旅",
    description: "地域に根ざしたナビゲーターと共に、日本各地の本質的な体験を提供します。文化や伝統に深く触れる旅をご案内します。",
    keywords: "日本旅行, 文化体験, 伝統文化, ローカルガイド, 体験ツアー",
  },
  fr: {
    title: "Authentic Japan - Expériences de Voyage Transformatives",
    description: "Découvrez des expériences japonaises authentiques avec des navigateurs locaux. Immergez-vous dans des voyages culturels à travers les diverses régions du Japon.",
    keywords: "voyage au Japon, expérience authentique, visites culturelles, guides locaux, culture japonaise",
  },
};
