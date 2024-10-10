import Image from 'next/image';
import { Locale } from '@/constants/site';
// import { useTranslations } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { getFormattedActivities, getFormattedGuideData } from '@/lib/utils';
import { ContentHeader } from '@/components/Layout/ContentHeader';
import { TourItem } from '@/components/Tour/TourItem';
import Link from 'next/link';
import { fetchNewsArticles } from '@/lib/fetchData';

// export async function generateStaticParams({ params: { lang } }: { params: { lang: Locale } }) {
// 	const guides = await extractGuideData(lang);
// 	return guides.map((guide) => ({
// 		id: guide.id.toString()
// 	}));
// }

export default async function Page({ params: { lang, id } }: { params: { lang: Locale; id: string } }) {
	// const t = useTranslations(lang);
	const guides = await getFormattedGuideData(lang);
	const otherGuides = guides.filter((g) => g.id !== parseInt(id));
	const guide = guides.find((g) => g.id === parseInt(id));
	const activities = await getFormattedActivities({ page: 1, pageSize: 10 }, lang);
	const newsArticles = await fetchNewsArticles(lang);
	const filteredActivities = guide ? activities.filter((activity) => activity.guideIds?.includes(guide.id)) : [];
	console.log(newsArticles);

	if (!guide) {
		notFound();
	}

	return (
		<>
			<ContentHeader title="NAVIGATOR" breadcrumbs={[{ label: 'HOME', href: '/' }, { label: 'NAVIGATORS', href: '/navigator' }, { label: 'NAVIGATOR' }]} lang={lang} />

			<div className="l-contents__body p-page-navigator">
				<div className="p-page-navigator__profile">
					<figure className="p-page-navigator__mv">{guide.mv && <Image src={guide.mv.link} alt={guide.name} fill sizes="50vw" style={{ objectFit: 'cover' }} />}</figure>
					<div className="p-page-navigator__detail">
						{guide.regions && guide.regions.length > 0 && (
							<div className="p-page-navigator__region">
								<i className="c-pin"></i>
								<span>{guide.regions.join(', ')}</span>
							</div>
						)}
						<div className="p-page-navigator__name">{guide.name}</div>
						<div className="p-page-navigator__title">{guide.title}</div>
						<div className="p-page-navigator__tags">
							{guide.tags.map((tag) => (
								<span key={tag.id} className="p-page-navigator__tag">
									#{tag.name}
								</span>
							))}
						</div>
						<h2 className="p-page-navigator__copy" dangerouslySetInnerHTML={{ __html: guide.copy || '' }} />
						<div className="p-page-navigator__description" dangerouslySetInnerHTML={{ __html: guide.description || '' }} />
						{/* {guide.values && guide.values.length > 0 && (
							<>
								<h2 className="p-page-navigator__values-title">{t({ ja: '私の提供する旅で大切にしたいこと', en: 'What I value in the journey I offer' })}</h2>
								<div className="p-page-navigator__values">
									{guide.values.map((value, index) => (
										<div key={index} className="p-page-navigator__value">
											<h3>{value.title}</h3>
											<p dangerouslySetInnerHTML={{ __html: value.description || '' }} />
										</div>
									))}
								</div>
							</>
						)} */}
					</div>
				</div>

				{filteredActivities.length > 0 && (
				<div className="p-page-navigator-tours">
					<div className="p-page-navigator-tours__title">
						<h2 className="c-heading c-heading--2">TOURS</h2>
					</div>
					<div className="p-page-navigator-tours__tours c-tours">
						{filteredActivities.map((activity) => <TourItem key={activity.id} activity={activity} className="c-tours__tour" />)}
						</div>
				</div>
				)}

				<div className="p-page-navigator-others">
					<div className="p-page-navigator-others__title">
						<h2 className="c-heading c-heading--2">OTHER NAVIGATORS</h2>
					</div>
					<div className="p-page-navigator-others__items">
						{otherGuides.length > 0 ? (
							otherGuides.map((guide) => (
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
							))
						) : (
							<p>ガイドが見つかりません。</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
