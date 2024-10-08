import Image from 'next/image';
import { Locale } from '@/constants/site';
// import { useTranslations } from '@/lib/i18n';
import { getFormattedRegionData } from '@/lib/utils';
// import { ContentHeader } from '@/components/ContentHeader';
import { getWPSiteOptions } from '@/lib/fetchData';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
	// const t = useTranslations(lang);
	const regions = await getFormattedRegionData(lang);
	const siteOptions = await getWPSiteOptions(lang);
	const regionsPage = siteOptions.regions;
	// console.log('regions:', regions);
	return (
		<>
			{/* <ContentHeader title="REGIONS" breadcrumbs={[{ label: 'HOME', href: '/' }, { label: 'REGIONS' }]} lang={lang} /> */}
			<div className="l-contents__body p-page-region">
				<div className="p-page-region__index">
					<figure className="p-page-region__map">
						<Image src="/region/map.svg" alt="" fill unoptimized />
					</figure>
					<ul className="p-page-region__list">
						{regions && regions.length > 0 ? (
							regions.map((region, index) => (
								<li key={index}>
									<a href={`#region${region.id}`}>
										<i className="c-pin"></i>
										<span>{region.name}</span>
									</a>
								</li>
							))
						) : (
							<div>No regions available</div>
						)}
					</ul>
				</div>
				<div className="p-page-region__items u-full-bleed">
					{regions && regions.length > 0 ? (
						regions.map((region, index) => (
							<div key={index} id={`region${region.id}`} className="p-page-region__item">
								<div className="c-region">
									<div className="c-region__inner">
										<div className="c-region__content">
											<h2 className="c-region__name">
												<i className="c-pin"></i>
												<span>{region.name}</span>
												</h2>
											<div className="c-region__description">
												<p>{region.description}</p>
											</div>
										</div>
										<div className="c-region__images">
											{region.mv && (
												<figure className="c-region__image">
													<Image src={region.mv} alt="" fill sizes="50vw" style={{ objectFit: 'cover' }} />
												</figure>
											)}
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div>No regions available</div>
					)}
				</div>
				<figure className="p-page-region__mv u-full-bleed">
					<Image src={regionsPage.mv.sizes['1536x1536']} alt="" fill />
				</figure>
			</div>
		</>
	);
}
