// import { Locale } from '@/constants/site';
import { News } from '@/types';
import NavigatorInfo from '../Navigator/NavigatorInfo';
import Image from 'next/image';

export default function NewsItem({ article }: { article: News }) {
	// console.log('featured_media:', article.featured_media);
	// const guide = article.ac
	return (
		<div className="c-news">
			<div className="c-news__inner">
				<figure className="c-news__thumbnail">
					<Image src={article.featured_media?.media_details.sizes.large.source_url ?? '/default-image.jpg'} alt="" fill sizes="50vw" style={{ objectFit: 'cover' }} />
				</figure>
				<div className="c-news__content">
					<time className="c-news__date">{article.date}</time>
					<h2 className="c-news__title">{article.title}</h2>
					{article.categories && article.categories.length > 0 && (
						<div className="c-news__categories">
							{article.categories.map((category) => (
								<span key={category.id} className="c-news__category">
									{category.name}
								</span>
							))}
						</div>
					)}
					{article.guides && article.guides.length > 0 && (
						<div className="c-news__guides">
							{article.guides.map((guide) => (
								<div key={guide.id} className="c-news__guide">
									<NavigatorInfo guide={guide} />
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
