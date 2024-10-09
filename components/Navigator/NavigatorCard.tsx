'use client';

import { Locale } from '@/constants/site';
import { Guide } from '@/types';
import Image from 'next/image';
// import { useTranslations } from '@/lib/i18n';
import Link from 'next/link';

export function NavigatorCard({ lang, guide }: { lang: Locale; guide: Guide }) {
	// const t = useTranslations(lang);
	return (
		<Link href={`/${lang}/navigator/${guide.id}`} className="c-navigator-card">
			<figure className="c-navigator-card__image">
				<Image src={guide.mv?.sizes['1536x1536'] ?? '/default-image.jpg'} alt="" fill sizes="50vw" style={{ objectFit: 'cover' }} />
			</figure>
			<div className="c-navigator-card__inner">
				<h3 className="c-navigator-card__copy">
					<p>{guide.copy}</p>
				</h3>
				{guide.regions && guide.regions.length > 0 && (
					<div className="c-navigator-card__region">
						<i className="c-pin"></i>
						<span>{guide.regions.join(', ')}</span>
					</div>
				)}
				<div className="c-navigator-card__cols">
					<div className="c-navigator-card__col-left">
						<div className="c-navigator-card__photo">
							<Image src={guide.photo?.link ?? '/default-image.jpg'} alt="" fill sizes="20vw" style={{ objectFit: 'cover' }} />
						</div>
					</div>
					<div className="c-navigator-card__col-right">
						<h2 className="c-navigator-card__name">{guide.name}</h2>
						<h3 className="c-navigator-card__title">{guide.title}</h3>
					</div>
				</div>
				<div className="c-navigator-card__tags">
					{guide.tags.map((tag) => (
						<span key={tag.id} className="c-navigator-card__tag">
							#{tag.name}
						</span>
					))}
				</div>
			</div>
		</Link>
	);
}
