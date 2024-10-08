// 'use server'
export const runtime = 'edge';

import { Noto_Sans_JP, Noto_Serif_JP, EB_Garamond, Montserrat } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/style.scss';
import { SITE_TITLE, SITE_DESCRIPTION, Locale } from '@/constants/site';
// import Script from 'next/script';
// import ReactQueryProvider from '@/components/ReactQueryProvider';
import { ScrollBarWidthManager } from '@/components/ScrollBarWidthManager';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';


export const metadata: Metadata = {
	title: SITE_TITLE,
	description: SITE_DESCRIPTION
};

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
	console.log('RootLayout:', lang);
	return (
		<html lang={lang} className={`${notoSansJP.variable} ${notoSerifJP.variable} ${ebGaramond.variable} ${montserrat.variable}`}>
			<body className='l-body'>
				<ScrollBarWidthManager />
				<Header lang={lang} />
				<main className="l-contents">
					<div className="c-container">{children}</div>
				</main>
				<Footer lang={lang} />
				{/* <Script src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=f34383c7-3179-43f7-a169-d3058ddf6840" strategy="lazyOnload" /> */}
			</body>
		</html>
	);
}
