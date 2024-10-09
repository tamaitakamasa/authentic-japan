// import { Locale } from '@/constants/site';
import { Guide } from '@/types';
import Image from 'next/image';
// interface GuideInfoProps {
// 	className?: string;
//   name: string;
//   title: string;
// 	photo: string;
// }

export default function NavigatorInfo({ guide }: { guide: Guide }) {
	return (
		<div className="c-navigator-info">
			<div className="c-navigator-info__photo">
				<Image src={guide.photo?.link ?? '/default-image.jpg'} alt="" fill sizes="20vw" style={{ objectFit: 'cover' }} />
			</div>
			<div className="c-navigator-info__content">
				<p className="c-navigator-info__name">{guide.name}</p>
				<p className="c-navigator-info__title">{guide.title}</p>
			</div>
		</div>
	);
}
