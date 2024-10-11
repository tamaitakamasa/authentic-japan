import Image from 'next/image';
import { Locale } from '@/constants/site';
// import { useTranslations } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { getFormattedActivities, getFormattedGuideData, getFormattedNewsData } from '@/lib/utils';
import { ContentHeader } from '@/components/Layout/ContentHeader';
import { TourItem } from '@/components/Tour/TourItem';
import Link from 'next/link';
// import { fetchNewsArticles } from '@/lib/fetchData';
import NavigatorInfo from '@/components/Navigator/NavigatorInfo';
import NewsItem from '@/components/News/NewsItem';

export default async function Page({ params: { lang, id } }: { params: { lang: Locale; id: string } }) {
	// const t = useTranslations(lang);
	const guides = await getFormattedGuideData(lang);
	const otherGuides = guides.filter((g) => g.id !== parseInt(id));
	const guide = guides.find((g) => g.id === parseInt(id));
	const activities = await getFormattedActivities({ page: 1, pageSize: 10 }, lang);
	const newsArticles = await getFormattedNewsData(lang);
	const filteredActivities = guide ? activities.filter((activity) => activity.guideIds?.includes(guide.id)) : [];
	const relatedNews = guide ? newsArticles.filter((news) => news.guides?.some((g) => g.id === guide.id)) : [];

	// objectFit値を決定
	const mvAspectRatio = guide?.mv ? guide.mv.width / guide.mv.height : undefined;
	const baseAspectRatio = 1 / 1;
  const objectFit = mvAspectRatio !== undefined && mvAspectRatio < baseAspectRatio ? 'contain' : 'cover';

	console.log(newsArticles);

	if (!guide) {
		notFound();
	}

	return (
		<>
			<ContentHeader title="NAVIGATOR" breadcrumbs={[{ label: 'HOME', href: '/' }, { label: 'NAVIGATORS', href: '/navigator' }, { label: 'NAVIGATOR' }]} lang={lang} />

			<div className="l-contents__body p-page-navigator p-single p-single-navigator">
				<div className="p-single__header u-full-bleed">
					<div className="p-single-navigator__profile c-container">
						<figure className="p-single-navigator__mv">{guide.mv && <Image src={guide.mv.link} alt={guide.name} fill sizes="50vw" style={{ objectFit: objectFit }} />}</figure>
						{guide.copy && <h2 className="p-single-navigator__copy">{guide.copy}</h2>}
						<div className="p-single-navigator__info">
							{guide.regions && guide.regions.length > 0 && (
								<div className="p-single-navigator__region">
									<i className="c-pin"></i>
									<span>{guide.regions.join(', ')}</span>
								</div>
							)}
							{guide.name && <h2 className="p-single-navigator__name">{guide.name}</h2>}
							{guide.title && <h3 className="p-single-navigator__title">{guide.title}</h3>}
							{guide.photo && (
								<figure className="p-single-navigator__photo">
									<Image src={guide.photo.link} alt={guide.name} fill sizes="10vw" style={{ objectFit: 'cover' }} />
								</figure>
							)}
							{guide.tags && guide.tags.length > 0 && (
								<div className="p-single-navigator__tags">
									{guide.tags.map((tag) => (
										<span key={tag.id} className="p-single-navigator__tag c-taxonomy">
											#{tag.name}
										</span>
									))}
								</div>
							)}
							<ul className="p-single-navigator__sns">
								<li>
									<a href="#">
										<Image src={'/icon_instagram.svg'} width={15} height={15} alt="" />
									</a>
								</li>
								<li>
									<a href="#">
										<Image src={'/icon_fb.svg'} width={15} height={15} alt="" />
									</a>
								</li>
								<li>
									<a href="#">
										<Image src={'/icon_x.svg'} width={15} height={15} alt="" />
									</a>
								</li>
								<li>
									<a href="#">
										<Image src={'/icon_note.svg'} width={40} height={8.7} alt="" />
									</a>
								</li>
							</ul>
						</div>
						{guide.mv?.width}
					</div>
				</div>

				<div className="p-page-navigator__profile">
					<figure className="p-page-navigator__mv">{guide.mv && <Image src={guide.mv.link} alt={guide.name} fill sizes="50vw" style={{ objectFit: 'cover' }} />}</figure>
					<div className="p-page-navigator__detail">
						<h2 className="p-page-navigator__copy" dangerouslySetInnerHTML={{ __html: guide.copy || '' }} />
						{guide.regions && guide.regions.length > 0 && (
							<div className="p-page-navigator__region">
								<i className="c-pin"></i>
								<span>{guide.regions.join(', ')}</span>
							</div>
						)}
						<NavigatorInfo className="p-page-navigator__info" guide={guide} lang={lang} />
						<div className="p-page-navigator__tags">
							{guide.tags.map((tag) => (
								<span key={tag.id} className="p-page-navigator__tag c-taxonomy">
									#{tag.name}
								</span>
							))}
						</div>
						<ul className="p-page-navigator__sns">
							<li>
								<a href="#">
									<Image src={'/icon_instagram.svg'} width={15} height={15} alt="" />
								</a>
							</li>
							<li>
								<a href="#">
									<Image src={'/icon_fb.svg'} width={15} height={15} alt="" />
								</a>
							</li>
							<li>
								<a href="#">
									<Image src={'/icon_x.svg'} width={15} height={15} alt="" />
								</a>
							</li>
							<li>
								<a href="#">
									<Image src={'/icon_note.svg'} width={40} height={8.7} alt="" />
								</a>
							</li>
						</ul>
					</div>
					<div className="p-page-navigator__description" dangerouslySetInnerHTML={{ __html: guide.description || '' }} />
				</div>

				{filteredActivities.length > 0 && (
					<div className="p-page-navigator-tours">
						<div className="p-page-navigator-tours__title">
							<h2 className="c-heading c-heading--2">TOURS</h2>
						</div>
						<div className="p-page-navigator-tours__tours c-tours">
							{filteredActivities.map((activity) => (
								<TourItem key={activity.id} activity={activity} className="c-tours__tour" />
							))}
						</div>
					</div>
				)}

				{relatedNews.length > 0 && (
					<div className="p-page-navigator-news">
						<div className="p-page-navigator-news__title">
							<h2 className="c-heading c-heading--2">RELATED NEWS</h2>
						</div>
						<div className="p-page-navigator-news__items">
							{relatedNews.map((article) => (
								<div key={article.id} className="p-page-news__item">
									<NewsItem article={article} />
								</div>
							))}
						</div>
					</div>
				)}

				{otherGuides.length > 0 && (
					<div className="p-page-navigator-others">
						<div className="p-page-navigator-others__title">
							<h2 className="c-heading c-heading--2">OTHER NAVIGATORS</h2>
						</div>
						<div className="p-page-navigator-others__items">
							{otherGuides.map((guide) => (
								<div key={guide.id} className="p-page-navigator-others__item">
									<div className="c-navigator-circle u-hover">
										<figure className="c-navigator-circle__thumb">
											<Image src={guide.photo?.link ?? '/no-photo.jpg'} alt={guide.name} fill sizes="10vw" style={{ objectFit: 'cover' }} />
										</figure>

										<h3 className="c-navigator-circle__name">
											<Link href={`/${lang}/navigator/${guide.id}`} className="c-navigator-circle__link">
												{guide.name}
											</Link>
										</h3>
										{guide.regions && guide.regions.length > 0 && (
											<div className="c-navigator-circle__region">
												<i className="c-pin"></i>
												<span>{guide.regions.join(', ')}</span>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
