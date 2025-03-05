"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LOCALES,
  Locale,
  DEFAULT_LOCALE,
} from "@/constants/site";
import { ContentHeader } from "@/components/Layout/ContentHeader";

export default function NotFound() {
  // パスから言語を取得
  const pathname = usePathname();
  const langFromPath = pathname?.split("/")[1] as Locale;
  const lang = LOCALES.includes(langFromPath)
    ? langFromPath
    : DEFAULT_LOCALE;

  // 言語ごとのメッセージ
  const messages = {
    ja: {
      title: "ページが見つかりません",
      description:
        "お探しのページは存在しないか、移動した可能性があります。",
      linkText: "ホームに戻る",
    },
    en: {
      title: "Page Not Found",
      description:
        "The page you are looking for does not exist or may have been moved.",
      linkText: "Return to Home",
    },
    fr: {
      title: "Page Non Trouvée",
      description:
        "La page que vous recherchez n'existe pas ou a peut-être été déplacée.",
      linkText: "Retourner à l'Accueil",
    },
  };

  const { title, description, linkText } = messages[lang];

  return (
    <>
      <ContentHeader
        title="404 Not Found"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "404 Not Found " },
        ]}
        lang={lang}
      />
      <div className="l-contents__body p-page p-page-error">
        <div className="p-page-error__inner">
          <h2 className="p-page-error__title">
            {title}
          </h2>
          <p className="p-page-error__description">
            {description}
          </p>
          <div className="p-page-error__button">
            <Link href={`/${lang}`} className="c-button">
              <span className="c-button__label">
                {linkText}
              </span>
              <div className="c-button__circle">
                <i className="c-button__icon"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
