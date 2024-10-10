import { Locale } from '@/constants/site';
// import { useTranslations } from '@/lib/i18n';
import { getFormattedGuideData } from '@/lib/utils';
import { NavigatorItem } from '@/components/Navigator/NavigatorItem';
import { ContentHeader } from '@/components/Layout/ContentHeader';
import { getWPSiteOptions } from '@/lib/fetchData';
import Image from 'next/image';

export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {
	// const t = useTranslations(lang);
	const guides = await getFormattedGuideData(lang);
	const siteOptions = await getWPSiteOptions(lang);
	// console.log('guides:', guides);
	return (
		<>
			<ContentHeader title="NAVIGATORS" breadcrumbs={[{ label: 'HOME', href: '/' }, { label: 'NAVIGATORS' }]} lang={lang} />
			<div className="l-contents__body p-page p-page-navigators">
				<div className="p-page__header u-full-bleed">
					<div className="p-page__inner c-container">
						<h2 className="p-page__title">{siteOptions.navigators_title}</h2>
						<p className="p-page__description" dangerouslySetInnerHTML={{ __html: siteOptions.navigators_description || '' }} />
					</div>
					{siteOptions.navigators_mv && (
						<figure className="p-page__mv">
							<Image src={siteOptions.navigators_mv.sizes['2048x2048']} alt="" fill style={{ objectFit: 'cover' }} />
						</figure>
					)}
				</div>
				{/* <div className="p-page-navigators__header">
					<h2 className="p-page-navigators__title c-heading c-heading--2">{siteOptions.navigators_title}</h2>
					<div className="p-page-navigators__description" dangerouslySetInnerHTML={{ __html: siteOptions.navigators_description || '' }} />
				</div> */}
				<div className="p-page-navigators__items u-full-bleed">
					{guides && guides.length > 0 ? (
						guides.map((guide, index) => (
							<div key={index} className="p-page-navigators__item">
								<NavigatorItem lang={lang} guide={guide} />
							</div>
						))
					) : (
						<li>No guides available</li>
					)}
				</div>
			</div>
		</>
	);
}
