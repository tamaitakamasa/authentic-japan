import { Metadata } from 'next';
import Image from 'next/image';
import { ContentHeader } from '@/components/Layout/ContentHeader';
import { PageHeader } from '@/components/Layout/PageHeader';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Locale } from '@/constants/site';
import { getWPSiteOptions } from '@/lib/fetchData';

type Props = {
  params: { lang: Locale }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params

  const metadata = {
    ja: {
      title: 'Authentic Japan について | オーセンティック・ジャパン',
      description: '淡路島の魅力を発信するプラットフォーム、Authentic Japanについてご紹介します。地元ガイドと共に、本物の淡路島体験を提供しています。',
    },
    en: {
      title: 'About Authentic Japan | Authentic Japan',
      description: 'Discover Authentic Japan, your gateway to genuine Awaji Island experiences. We connect you with local guides for authentic adventures.',
    },
    fr: {
      title: 'À propos d\'Authentic Japan | Authentic Japan',
      description: 'Découvrez Authentic Japan, votre passerelle vers des expériences authentiques sur l\'île d\'Awaji. Nous vous connectons avec des guides locaux pour des aventures uniques.',
    },
  } as const;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    alternates: {
      canonical: `https://authentic-japan.com/${lang}/about`,
      languages: {
        ja: 'https://authentic-japan.com/ja/about',
        en: 'https://authentic-japan.com/en/about',
        fr: 'https://authentic-japan.com/fr/about',
      },
    },
  }
}

export default async function AboutPage({ params: { lang } }: { params: { lang: Locale } }) {
	const siteOptions = await getWPSiteOptions(lang);

	return (
		<>
			<ContentHeader title="ABOUT US" breadcrumbs={[{ label: 'HOME', href: '/' }, { label: 'ABOUT US' }]} lang={lang} />
			<div className="l-contents__body p-page p-page-about">
				<PageHeader description={siteOptions.about_description} mv={siteOptions.about_mv} />
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
							<p className="p-page-about-section__number u-green">01</p>
							<h2 className="p-page-about-section__title u-green">{siteOptions.about_section1_title}</h2>
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
							<p className="p-page-about-section__number u-red">02</p>
							<h2 className="p-page-about-section__title u-red">{siteOptions.about_section2_title}</h2>
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
							<p className="p-page-about-section__number u-blue">03</p>
							<h2 className="p-page-about-section__title u-blue">{siteOptions.about_section3_title}</h2>
							<div className="p-page-about-section__description" dangerouslySetInnerHTML={{ __html: siteOptions.about_section3_description || '' }} />
						</div>
						<div className="p-page-about-section__col-right">
							<figure className="p-page-about-section__illust">
								<Image src="/about/about3.svg" alt="" fill unoptimized />
							</figure>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
