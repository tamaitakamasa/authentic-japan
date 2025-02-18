import { Locale } from '@/constants/site';
import { getFormattedGuideData } from '@/lib/utils';
import { WPSiteContent } from '@/types';
import { HomeNavigatorSlider } from './HomeNavigatorSlider';
import { Button } from '../Button';

interface HomeNavigatorSectionProps {
	lang: Locale;
	siteOptions: WPSiteContent;
}

export default async function HomeNavigatorSection({ lang, siteOptions }: HomeNavigatorSectionProps) {
	const guides = await getFormattedGuideData(lang);
	return (
		<div className="p-home-navigators">
			<h2 className="p-home-navigators__copy">{siteOptions.navigators_title}</h2>
			<p className="p-home-navigators__text" dangerouslySetInnerHTML={{ __html: siteOptions.navigators_description || '' }} />
			<div className="p-home-navigators__slider u-full-bleed">
				<HomeNavigatorSlider lang={lang} guides={guides} />
			</div>
			<div className="p-home-navigators__button">
				<Button href={`/${lang}/navigator`} label="VIEW ALL NAVIGATORS" />
			</div>
		</div>
	);
}
