import { Locale } from '@/constants/site';
import { getFormattedActivities } from '@/lib/utils';
import { TourItem } from '../Tour/TourItem';
import { useTranslations } from '@/lib/i18n';

interface HomeTourSectionProps {
	lang: Locale;
}

export default async function HomeTourSection({ lang }: HomeTourSectionProps) {
	const t = useTranslations(lang);
	const [activities] = await Promise.all([
		getFormattedActivities(
			{
				page: 1,
				pageSize: 100
			},
			lang
		)
	]);
	return (
		<>
			<div className="p-home-tours__total">
				<div className="c-total">
					<div className="c-total__label">ALL TOURS</div>
					<span className="c-total__count">{activities.length}</span>
				</div>
			</div>
			<div className="p-home-tours__tours c-tours">
				{activities.length > 0 ? (
					activities.slice(0, 4).map((activity) => <TourItem className="c-tours__tour" key={activity.id} activity={activity} />)
				) : (
					<p>
						{t({
							ja: 'ツアーが見つかりません。',
							en: 'No activities found.',
							fr: 'Aucune activité trouvée.'
						})}
					</p>
				)}
			</div>
		</>
	);
}
