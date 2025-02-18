import { Locale } from '@/constants/site';
import { getFormattedRegionData } from '@/lib/utils';
import { WPSiteContent } from '@/types';
import { HomeRegionSlider } from './HomeRegionSlider';
import { Button } from '../Button';

interface HomeRegionSectionProps {
	lang: Locale;
	siteOptions: WPSiteContent;
}

export default async function HomeRegionSection({ lang, siteOptions }: HomeRegionSectionProps) {
	const regions = await getFormattedRegionData(lang);
	return (
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
				<Button href={`/${lang}/region`} label="VIEW ALL REGIONS" color="light" />
			</div>
		</div>
	);
}
