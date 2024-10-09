import { Locale } from '@/constants/site';
import { Guide } from '@/types';
import Image from 'next/image';
// import { useTranslations } from '@/lib/i18n';
import Link from 'next/link';

export function NavigatorItem({ lang, guide }: { lang: Locale; guide: Guide }) {
	// const t = useTranslations(lang);
	return (
		<div className="c-navigator">
			<div className="c-navigator__header">
				<Link href={`/${lang}/navigator/${guide.id}`} className="c-navigator__link">
					<h3 className="c-navigator__copy">
						<p>{guide.copy}</p>
					</h3>
					<figure className="c-navigator__image">
						<Image src={guide.mv?.link ?? '/no-photo.jpg'} alt="" fill sizes="50vw" style={{ objectFit: 'cover' }} />
					</figure>
				</Link>
			</div>
			<div className="c-navigator__body">
				{guide.regions && guide.regions.length > 0 && (
					<div className="c-navigator__region">
						<i className="c-pin"></i>
						<span>{guide.regions.join(', ')}</span>
					</div>
				)}
				<h2 className="c-navigator__name">
					<Link href={`/navigator/${guide.id}`}>{guide.name}</Link>
				</h2>
				<h2 className="c-navigator__title">{guide.title}</h2>
				<div className="c-navigator__tags">
					{guide.tags.map((tag) => (
						<span key={tag.id} className="c-navigator__tag">
							#{tag.name}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
