import { Locale } from '@/constants/site';
import { News } from '@/types';

export default function NewsItem({ lang, article }: { lang: Locale; article: News }) {
	// const guide = article.ac
	return (
		<div className="c-news">
			<div className="c-news__inner">
				<figure className="c-news__thumbnail"></figure>
				<div className="c-news__content">
					<time> {article.date}</time>
					<h2>{article.title}</h2>
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
									{/* <NavigatorInfo lang={lang} guide={guide} /> */}
									{guide.name}
								</div>
							))}
						</div>
					)}
					<p>{lang}</p>
				</div>
			</div>
		</div>
	);
}
