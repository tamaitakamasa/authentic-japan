import { Guide } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/constants/site';
import clsx from 'clsx';

interface NavigatorInfoProps {
	className?: string;
  guide: Guide;
  link?: boolean;
  lang?: Locale;
}

export default function NavigatorInfo({ guide, link, lang, className }: NavigatorInfoProps) {
  const content = (
		<div className={clsx('c-navigator-info', className)}>
      <div className="c-navigator-info__photo">
        <Image
          src={guide.photo?.link ?? '/default-image.jpg'}
          alt=""
          fill
          sizes="20vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="c-navigator-info__content">
        <h3 className="c-navigator-info__name">{guide.name}</h3>
        <p className="c-navigator-info__title">{guide.title}</p>
      </div>
    </div>
  );

  if (link && lang) {
    return (
      <Link href={`/${lang}/navigator/${guide.id}`} className="c-navigator-info__link">
        {content}
      </Link>
    );
  }

  return content;
}
