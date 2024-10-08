// import Image from 'next/image';
import { ContentHeader } from '@/components/Layout/ContentHeader';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Locale } from '@/constants/site';
import { getWPSiteOptions } from '@/lib/fetchData';
import Image from 'next/image';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
	const siteOptions = await getWPSiteOptions(lang);

	return (
		<>
			<ContentHeader title="ABOUT US" breadcrumbs={[{ label: 'HOME', href: '/' }, { label: 'ABOUT US' }]} lang={lang} />
			<div className="l-contents__body p-page-about">
				<div className="p-page-about__description" dangerouslySetInnerHTML={{ __html: siteOptions.about_description || '' }} />
				{siteOptions.about_video && (
					<div className="p-page-about__video">
						<VideoPlayer videoUrl={siteOptions.about_video} />
					</div>
				)}

				<div className="p-page-about-section">
					<div className="p-page-about-section__cols">
						<div className="p-page-about-section__col-left">
							<div className="p-page-about-section__description" dangerouslySetInnerHTML={{ __html: siteOptions.about_section0_description || '' }} />
						</div>
						<div className="p-page-about-section__col-right">
							<figure className="p-page-about-section__illust">
								<Image src="/about/about_all.svg" alt="" fill unoptimized />
							</figure>
						</div>
					</div>
				</div>

				<div className="p-page-about-section">
					<div className="p-page-about-section__cols">
						<div className="p-page-about-section__col-left">
							<p className="p-page-about-section__number">01</p>
							<h2 className="p-page-about-section__title">{siteOptions.about_section1_title}</h2>
							<div className="p-page-about-section__description" dangerouslySetInnerHTML={{ __html: siteOptions.about_section1_description || '' }} />
						</div>
						<div className="p-page-about-section__col-right">
							<figure className="p-page-about-section__illust">
								<Image src="/about/about1.svg" alt="" fill unoptimized />
							</figure>
						</div>
					</div>
				</div>

				<div className="p-page-about-section">
					<div className="p-page-about-section__cols">
						<div className="p-page-about-section__col-left">
							<p className="p-page-about-section__number">02</p>
							<h2 className="p-page-about-section__title">{siteOptions.about_section2_title}</h2>
							<div className="p-page-about-section__description" dangerouslySetInnerHTML={{ __html: siteOptions.about_section2_description || '' }} />
						</div>
						<div className="p-page-about-section__col-right">
							<figure className="p-page-about-section__illust">
								<Image src="/about/about2.svg" alt="" fill unoptimized />
							</figure>
						</div>
					</div>
				</div>

				<div className="p-page-about-section">
					<div className="p-page-about-section__cols">
						<div className="p-page-about-section__col-left">
							<p className="p-page-about-section__number">03</p>
							<h2 className="p-page-about-section__title">{siteOptions.about_section3_title}</h2>
							<div className="p-page-about-section__description" dangerouslySetInnerHTML={{ __html: siteOptions.about_section3_description || '' }} />
						</div>
						<div className="p-page-about-section__col-right">
							<figure className="p-page-about-section__illust">
								<Image src="/about/about3.svg" alt="" fill unoptimized />
							</figure>
						</div>
					</div>
				</div>

				<figure className="p-page-about__mv u-full-bleed">{siteOptions.about_mv && <Image src={siteOptions.about_mv.sizes['1536x1536']} alt="" fill />}</figure>
			</div>
		</>
	);
}
