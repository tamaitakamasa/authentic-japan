import Image from 'next/image';
import { Activity } from '@/types';
import TourButton from '@/components/Tour/TourButton';
import clsx from 'clsx';

export function TourItem({ activity, className }: { activity: Activity; className?: string }) {
	// console.log(activity);
	return (
		<div className={clsx('c-tour', className)} data-activity-id={activity.id}>
			<div className="c-tour__regions">
				{activity.regions &&
					activity.regions.map((region, index) => (
						<div key={index} className="c-tour__region">
							<i className="c-pin"></i>
							<span>{region}</span>
						</div>
					))}
			</div>
			<h2 className="c-tour__title">
				<TourButton tourId={activity.id} className="u-hover">
					{activity.title}
				</TourButton>
			</h2>
			<div className="c-tour__header">
				{activity.photo && (
					<div className="c-tour__image">
						<TourButton tourId={activity.id}>
							<Image src={activity.photo} alt={activity.title} fill sizes="50vw" style={{ objectFit: 'cover' }} />
						</TourButton>
					</div>
				)}
				<div className="c-tour__header-inner">
					<p className="c-tour__price">
						{activity.formattedPrice}
						<span>JPY</span>
					</p>
					<p className="c-tour__duration">{activity.duration}</p>
				</div>
			</div>
			<div className="c-tour__body">
				{activity.excerpt && <div className="c-tour__summary">{activity.excerpt}</div>}
				{activity.guides && (
					<div className="c-tour__guides">
						{activity.guides.map((guide, index) => (
							<div key={index} className="c-tour__guide">
								{guide.photo && (
									<figure className="c-tour__guide-image">
										<Image src={guide.photo.link} alt={guide.name} fill sizes="10vw" style={{ objectFit: 'cover' }} />
									</figure>
								)}
								<div className="c-tour__guide-info">
									<span className="c-tour__guide-name">{guide.name}</span>
									<span className="c-tour__guide-title">{guide.title}</span>
								</div>
							</div>
						))}
					</div>
				)}
				{activity.tags && activity.tags.length > 1 && (
					<div className="c-tour__tags">
						{activity.tags.map((tag, index) => (
							<span key={index} className="c-tour__tag">
								{tag.name}
							</span>
						))}
					</div>
				)}
			</div>
			<div className="c-tour__button">
				<TourButton tourId={activity.id} className="c-tour-button u-hover">
					<span className="c-tour-button__label">RESERVATION & VIEW DETAIL</span>
					<div className="c-tour-button__circle">
						<i className="c-tour-button__icon"></i>
					</div>
				</TourButton>
			</div>
		</div>
	);
}
