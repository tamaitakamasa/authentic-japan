import { Noto_Sans_JP, Noto_Serif_JP, EB_Garamond, Montserrat } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/style.scss';
import './global.css';
import { Locale } from '@/constants/site';
import Script from 'next/script';
import { ScrollBarWidthManager } from '@/components/ScrollBarWidthManager';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { METADATA } from '@/constants/metadata';

export const runtime = 'edge';

type Props = {
  params: { lang: Locale }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const metadata = METADATA[params.lang];

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/icon.png', type: 'image/png' }
      ],
      apple: [
        { url: '/apple-icon.png' }
      ],
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      locale: params.lang,
      type: 'website',
      siteName: metadata.title,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
    },
    alternates: {
      canonical: `https://authentic-japan.com/${params.lang}`,
      languages: {
        'en': '/en',
        'ja': '/ja',
        'fr': '/fr',
      },
    },
  };
}

const notoSansJP = Noto_Sans_JP({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-noto-sans-jp'
});

const notoSerifJP = Noto_Serif_JP({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-noto-serif-jp'
});

const ebGaramond = EB_Garamond({
	weight: ['400'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-eb-garamond'
});

const montserrat = Montserrat({
	weight: ['400'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-montserrat'
});

export default async function RootLayout({ children, params: { lang } }: { children: React.ReactNode; params: { lang: Locale } }) {
	return (
		<html lang={lang} className={`${notoSansJP.variable} ${notoSerifJP.variable} ${ebGaramond.variable} ${montserrat.variable}`}>
			<body className='l-body'>
				<GoogleAnalytics gaId="G-1GTCTFWHNM" />
				<ScrollBarWidthManager />
				<Header lang={lang} />
				<main className="l-contents">
					<div className="c-container">{children}</div>
				</main>
				<Footer lang={lang} />
				<Script src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=f34383c7-3179-43f7-a169-d3058ddf6840" strategy="lazyOnload" />
			</body>
		</html>
	);
}
