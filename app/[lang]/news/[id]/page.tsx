// import Image from 'next/image';
import { Locale } from '@/constants/site';
// import { useTranslations } from '@/lib/i18n';
import { notFound } from 'next/navigation';
// import { getFormattedActivities, getFormattedGuideData } from '@/lib/utils';
import { ContentHeader } from '@/components/Layout/ContentHeader';
// import { TourItem } from '@/components/Tour/TourItem';
// import Link from 'next/link';
// import { fetchNewsArticles } from '@/lib/fetchData';
import { getFormattedNewsData } from '@/lib/utils';
import Image from 'next/image';

export default async function Page({ params: { lang, id } }: { params: { lang: Locale; id: string } }) {
	// const t = useTranslations(lang);
	// const guides = await getFormattedGuideData(lang);
	// const otherGuides = guides.filter((g) => g.id !== parseInt(id));
	// const guide = guides.find((g) => g.id === parseInt(id));
	const newsArticles = await getFormattedNewsData(lang);
	const article = newsArticles.find((article) => article.id === parseInt(id));
	console.log(newsArticles);

	if (!article) {
		notFound();
	}

	return (
		<>
			<ContentHeader title="NEWS" breadcrumbs={[{ label: 'HOME', href: '/' }, { label: 'NEWS', href: '/news' }, { label: 'NEWS' }]} lang={lang} />

			<div className="l-contents__body p-single-news">
				<div className="p-single-news__header">
					<time className="p-single-news__date" dateTime={article.date}>
						{article.date}
					</time>
					<h2 className="p-single-news__title">{article.title}</h2>
					{article.categories && article.categories.length > 0 && (
						<div className="p-single-news__categories">
							{article.categories.map((category) => (
								<span key={category.id} className="p-single-news__category">
									{category.name}
								</span>
							))}
						</div>
					)}
					{article.guides && article.guides.length > 0 && (
						<div className="p-single-news__guides">
							{article.guides.map((guide) => (
								<span key={guide.id} className="p-single-news__guide">
									{guide.name}
								</span>
							))}
						</div>
					)}
				</div>
				{article.featured_media && <figure className="p-single-news__image">{article.featured_media && <Image src={article.featured_media.media_details.sizes['1536x1536'].source_url} alt={article.title} fill sizes="50vw" style={{ objectFit: 'cover' }} />}</figure>}
				<div className="p-single-news__content">
					<div className='c-article' dangerouslySetInnerHTML={{ __html: article.content }} />
				</div>
			</div>
		</>
	);
}
