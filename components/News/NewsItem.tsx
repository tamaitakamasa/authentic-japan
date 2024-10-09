// import { Locale } from '@/constants/site';
import { News } from '@/types';
import NavigatorInfo from '../Navigator/NavigatorInfo';

export default function NewsItem({ article }: { article: News }) {
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
