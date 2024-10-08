// import { Suspense } from 'react';
import { TourItem } from '@/components/Tour/TourItem';
import { Button } from '@/components/Button';
import { HomeHeroSlider } from '@/components/Home/HomeHeroSlider';
import { HomeNavigatorSlider } from '@/components/Home/HomeNavigatorSlider';
import { HomeRegionSlider } from '@/components/Home/HomeRegionSlider';
// import VideoPlayer from '@/components/VideoPlayer';
import { Locale } from '@/constants/site';
import { getWPSiteOptions } from '@/lib/fetchData';
// import { useTranslations } from '@/lib/i18n';
import { getFormattedActivities, getFormattedGuideData, getFormattedRegionData } from '@/lib/utils';
// import { getFormattedActivities, getFormattedGuideData } from '@/lib/utils';
import Image from 'next/image';
// import Link from 'next/link';

export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {
	// const t = useTranslations(lang);
	const siteOptions = await getWPSiteOptions(lang);
	const guides = await getFormattedGuideData(lang);
	const regions = await getFormattedRegionData(lang);
	const activities = await getFormattedActivities({ page: 1, pageSize: 10 }, lang);
	console.log('activities:', activities);

	return (
		<>
			<div className="l-contents__body p-home">
				<div className="p-home-hero u-full-bleed">
					<HomeHeroSlider lang={lang} slides={siteOptions.home_slider} />
				</div>

				<div className="p-home-navigators">
					<h2 className="p-home-navigators__copy">{siteOptions.navigators_title}</h2>
					<p className="p-home-navigators__text" dangerouslySetInnerHTML={{ __html: siteOptions.navigators_description || '' }} />
					<div className="p-home-navigators__slider u-full-bleed">
						<HomeNavigatorSlider lang={lang} guides={guides} />
					</div>
					<div className="p-home-navigators__button">
						<Button href="/navigator" label="VIEW ALL NAVIGATORS" />
					</div>
				</div>

				<div className="p-home-regions">
					<div className="p-home-regions__header">
						<div className="p-home-regions__title">
							<h2 className="c-heading">REGIONS</h2>
						</div>
						<h3 className="p-home-regions__description" dangerouslySetInnerHTML={{ __html: siteOptions.home_regions_description || '' }} />
					</div>
					<div className="p-home-regions__slider">
						<HomeRegionSlider lang={lang} regions={regions} />
					</div>
					<div className="p-home-regions__button">
						<Button href="/region" label="VIEW ALL REGIONS" color="light" />
					</div>
				</div>

				<div className="p-home-video">
					<div className="p-home-video__inner u-full-bleed">
						<div className="p-home-video__bg">
							{siteOptions.home_about_mv && (
								<figure className="p-home-video__mv">
									<Image src={siteOptions.home_about_mv.link} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
								</figure>
							)}
							{/* {siteOptions.home_about_video && <VideoPlayer videoUrl={siteOptions.home_about_video} />} */}
						</div>
						<div className="p-home-video__content c-container">
							<h2 className="p-home-video__title c-heading">
								Authentic <br />
								Destinations
							</h2>
							<h3 className="p-home-video__description" dangerouslySetInnerHTML={{ __html: siteOptions.home_about_description || '' }} />
							<div className="p-home-video__button1">
								<Button href={siteOptions.home_about_video || '#'} label="CONCEPT MOVIE" color="light" />
							</div>
						</div>
					</div>
					<div className="p-home-video__footer">
						<div className="p-home-video__button2">
							<Button href="/about" label="ABOUT US" color="light" />
						</div>
					</div>
				</div>

				<div className="p-home-tours">
					<div className="p-home-tours__title">
						<h2 className="c-heading">TOURS</h2>
					</div>
					<div className="p-home-tours__total">
						<div className="c-total">
							<div className="c-total__label">ALL TOURS</div>
							<span className="c-total__count">{activities.length}</span>
						</div>
					</div>
					<div className="p-home-tours__tours c-tours">
						{activities.length > 0 ? activities.slice(0, 4).map((activity) => <TourItem key={activity.id} activity={activity} className="c-tours__tour" />) : <p>アクティビティが見つかりません。</p>}
						</div>
					<div className="p-home-tours__button">
						<Button href="/tour" label="VIEW ALL TOURS" />
					</div>
				</div>
			</div>
		</>
	);
}
