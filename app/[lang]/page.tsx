import { Button } from '@/components/Button';
import { HomeHeroSlider } from '@/components/Home/HomeHeroSlider';
import { VideoPlayer } from '@/components/VideoPlayer';
import { INSTAGRAM_URL, Locale } from '@/constants/site';
import { getWPSiteOptions } from '@/lib/fetchData';
import { getFormattedNewsData } from '@/lib/utils';
import Image from 'next/image';
import NewsItem from '@/components/News/NewsItem';
import InstagramFeed from '@/components/InstagramFeed';
import Link from 'next/link';
import { Suspense } from 'react';
import HomeTourSection from '@/components/Home/HomeTourSection';
import HomeNavigatorSection from '@/components/Home/HomeNavigatorSection';
import HomeRegionSection from '@/components/Home/HomeRegionSection';
import HomeVideo from '@/components/Home/HomeVideo';

export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {
	// const t = useTranslations(lang);
	const siteOptions = await getWPSiteOptions(lang);
	const newsArticles = await getFormattedNewsData(lang);
	// console.log('newsArticles:', newsArticles);

	return (
		<>
			<div className="l-contents__body p-home">
				<HomeHeroSlider lang={lang} slides={siteOptions.home_slider} />
				<Suspense fallback={<p>Loading...</p>}>
					<HomeNavigatorSection lang={lang} siteOptions={siteOptions} />
				</Suspense>

				<Suspense fallback={<p>Loading...</p>}>
					<HomeRegionSection lang={lang} siteOptions={siteOptions} />
				</Suspense>

				<div className="p-home-video">
					<div className="p-home-video__inner u-full-bleed overflow-hidden">
						{/* <div className="p-home-video__bg">
							{siteOptions.home_about_mv && (
								<figure className="p-home-video__mv">
									<Image src={siteOptions.home_about_mv.link} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
								</figure>
							)}
							{siteOptions.home_about_video && <VideoPlayer videoUrl={siteOptions.home_about_video} />}
						</div> */}
						<HomeVideo siteOptions={siteOptions} />
						<div className="p-home-video__content c-container">
							<h2 className="p-home-video__title c-heading">
								Authentic <br />
								Destinations
							</h2>
							<h3 className="p-home-video__description" dangerouslySetInnerHTML={{ __html: siteOptions.home_about_description || '' }} />
							{siteOptions.home_about_video && (
								<div className="p-home-video__button1">
									<Button href={siteOptions.home_about_video} target="_blank" label="CONCEPT MOVIE" color="light" />
								</div>
							)}
						</div>
					</div>
					<div className="p-home-video__footer">
						<div className="p-home-video__button2">
							<Button href={`/${lang}/about`} label="ABOUT US" color="light" />
						</div>
					</div>
				</div>

				<div className="p-home-tours">
					<div className="p-home-tours__title">
						<h2 className="c-heading">TOURS</h2>
					</div>
					<Suspense fallback={<p>Loading...</p>}>
						<HomeTourSection lang={lang} />
					</Suspense>
					<div className="p-home-tours__button">
						<Button href={`/${lang}/tours`} label="VIEW ALL TOURS" />
					</div>
				</div>

				<div className="p-home-news">
					<div className="p-home-news__inner">
						<div className="p-home-news__title">
							<h2 className="c-heading c-heading--2">NEWS</h2>
						</div>
						<div className="p-home-news__items">
							{newsArticles.length > 0 ? (
								newsArticles.slice(0, 3).map((article) => (
									<div key={article.id} className="p-home-news__item">
										<NewsItem article={article} />
									</div>
								))
							) : (
								<p>ニュースが見つかりません。</p>
							)}
						</div>
					</div>
					<div className="p-home-news__button">
						<Button href={`/${lang}/news`} label="VIEW ALL NEWS" />
					</div>
				</div>

				<div className="p-home-instagram">
					<div className="p-home-instagram__title">
						<h2 className="c-heading c-heading--2">INSTAGRAM</h2>
					</div>
					<div className="p-home-instagram__link">
						<Link href={`${INSTAGRAM_URL}`} target="_blank">
							@authentic_japan_official
						</Link>
					</div>
					<div className="p-home-instagram__feed u-full-bleed">
						<InstagramFeed />
					</div>
				</div>
			</div>
		</>
	);
}
