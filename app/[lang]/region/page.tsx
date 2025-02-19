import Image from 'next/image';
import { Locale } from '@/constants/site';
// import { useTranslations } from '@/lib/i18n';
import { getFormattedGuideData, getFormattedRegionData, getGuidesByRegion } from '@/lib/utils';
import { ContentHeader } from '@/components/Layout/ContentHeader';
import { getWPSiteOptions } from '@/lib/fetchData';
import { Button } from '@/components/Button';
import { RegionSlider } from '@/components/Region/RegionSlider';
import NavigatorInfo from '@/components/Navigator/NavigatorInfo';
import { PageHeader } from '@/components/Layout/PageHeader';

export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {
	// const t = useTranslations(lang);
	const regions = await getFormattedRegionData(lang);
	const siteOptions = await getWPSiteOptions(lang);
	const guides = await getFormattedGuideData(lang);

	return (
		<>
			<ContentHeader title="REGIONS" breadcrumbs={[{ label: 'HOME', href: '/' }, { label: 'REGIONS' }]} lang={lang} />
			<div className="l-contents__body p-page p-page-region">
				<PageHeader description={siteOptions.regions_description} mv={siteOptions.regions_mv} />
				<div className="p-page-region__index">
					<figure className="p-page-region__map">
						<Image src="/region/map.svg" alt="" fill unoptimized />
					</figure>
					<ul className="p-page-region__list">
						{regions &&
							regions.length > 0 &&
							regions.map((region, index) => (
								<li key={index}>
									<a href={`#region${region.id}`}>
										<i className="c-pin"></i>
										<span>{region.name}</span>
									</a>
								</li>
							))}
					</ul>
				</div>
				<div className="p-page-region__items u-full-bleed">
					{regions.length > 0 &&
						regions.map((region, index) => {
							const regionGuides = getGuidesByRegion(guides, region.id);
							return (
								<div key={index} id={`region${region.id}`} className="p-page-region__item">
									<div className="c-region">
										{region.gallery && (
											<div className="c-region__gallery">
												<RegionSlider images={region.gallery} />
											</div>
										)}
										<div className="c-region__inner">
											<div className="c-region__content">
												<h2 className="c-region__name">{region.name}</h2>
												<div className="c-region__description">
													<p dangerouslySetInnerHTML={{ __html: region.description || '' }} />
												</div>
											</div>
											<div className="c-region__locale">
												<figure className="c-region__map">
													<Image src="/region/map_sample.svg" alt="" fill unoptimized />
												</figure>
												{region.access && (
													<div className="c-region__access">
														<Button href={`/${lang}/tour`} label="ACCESS" />
													</div>
												)}
											</div>
										</div>
										{regionGuides.length > 0 && (
											<div className="c-region__navigators">
												<h3 className="c-region__navigators-title">NAVIGATORS</h3>
												<div className="c-region__navigators-list">
													{regionGuides.map((guide) => (
														<div key={guide.id} className="c-region__navigator">
															<NavigatorInfo guide={guide} lang={lang} link />
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								</div>
							);
						})}
				</div>
				{/* <figure className="p-page-region__mv u-full-bleed">
					<Image src={regionsPage.mv.sizes['1536x1536']} alt="" fill />
				</figure> */}
			</div>
		</>
	);
}
