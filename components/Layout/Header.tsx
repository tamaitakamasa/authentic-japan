import { Locale, NAVI_ITEMS, SITE_TITLE } from '@/constants/site';
import Link from 'next/link';
import React from 'react';
// import LanguageSwitcher from '@/components/LanguageSwitcher';
import Image from 'next/image';

export default function Header({ lang }: { lang: Locale }) {
	return (
		<header className={`l-header`}>
			<h1 className="l-header__title">
				<Link href={`/${lang}`}>
					<Image src="/logo.svg" alt={SITE_TITLE} unoptimized fill />
				</Link>
			</h1>
			<div className="l-header__inner">
				<div className="l-header__navi">
					<ul>
						{NAVI_ITEMS.map((item, index) => (
							<li key={index}>
								<Link href={`/${lang}${item.href}`}>{item.label}</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="l-header__langSwitcher">
					{/* <LanguageSwitcher currentLang={lang} /> */}
				</div>
			</div>
		</header>
	);
}
