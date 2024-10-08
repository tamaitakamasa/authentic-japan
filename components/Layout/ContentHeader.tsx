import Link from 'next/link';
import { Locale } from '@/constants/site';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ContentHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  lang: Locale;
}

export function ContentHeader({ title, breadcrumbs, lang }: ContentHeaderProps) {
  return (
    <div className="l-contents__header">
      <h1 className="l-contents__title">{title}</h1>
      <ul className="l-contents__breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <li key={index}>
            {crumb.href ? (
              <Link href={`/${lang}${crumb.href}`}>{crumb.label}</Link>
            ) : (
              crumb.label
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
