import { FOOTER_NAVI_ITEMS, INSTAGRAM_URL, Locale } from '@/constants/site';
import { getFormattedRegionData } from '@/lib/utils';
import Link from 'next/link';
// import React from 'react';

export default async function Footer({ lang }: { lang: Locale }) {
	const regions = await getFormattedRegionData(lang);

	return (
		<div className="l-footer">
			<nav className="l-footer__navi">
				<ul>
					{FOOTER_NAVI_ITEMS.map((item, index) => (
						<li key={index}>
							{item.label === 'REGIONS' ? (
								<>
									<Link href={`/${lang}${item.href}`}><span>{item.label}</span></Link>
									<ul>
										{regions.map((region) => (
											<li key={region.id}>
												<Link href={`/region#region${region.id}`}>{region.name}</Link>
											</li>
										))}
									</ul>
								</>
							) : (
								<Link href={`/${lang}${item.href}`}><span>{item.label}</span></Link>
							)}
						</li>
					))}
				</ul>
			</nav>
			<nav className="l-footer__navi-sub">
				<ul>
					<li>
						<Link href={`${INSTAGRAM_URL}`} target='_blank'>INSTAGRAM</Link>
					</li>
					<li>
						<Link href={`/${lang}/terms`}>TERMS OF USE</Link>
					</li>
				</ul>
			</nav>
			<div className="l-footer__copyright">
				<p>&copy; 2024 Authentic Japan</p>
			</div>
		</div>
	);
}
