'use client';

import { INSTAGRAM_URL, Locale, NAVI_ITEMS, SITE_TITLE } from '@/constants/site';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Image from 'next/image';
import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';
import treeImage from "@/public/header/tree.webp";

// import { getFormattedRegionData } from '@/lib/utils';
// import { usePathname } from 'next/navigation';

export default function Header({ lang }: { lang: Locale }) {
	// const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	// const [isAfterMarker, setIsAfterMarker] = useState(false);
	const headerRef = useRef<HTMLElement>(null);
	// const regions = getFormattedRegionData(lang);
	// console.log('regions:', regions);

	// ヘッダーのクラス制御
	// const getHeaderClasses = useCallback(() => {
	// 	return clsx('l-header', {
	// 		'l-header--light': pathname === `/${lang}` || pathname.startsWith(`/${lang}/tours/`),
	// 	});
	// }, [pathname, lang]);

	const toggleDrawer = () => {
		setIsOpen(!isOpen);
		// console.log('isOpen:', isOpen);
	};
	return (
		<>
			<header ref={headerRef} className={`l-header`}>
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
					<div className="l-header__lang">
						<LanguageSwitcher currentLang={lang} />
					</div>
				</div>
				<div className="l-header__trigger">
					<button className={clsx('c-trigger', { 'is-open': isOpen })} aria-label="menu" aria-expanded={isOpen} aria-controls="navigation-drawer" onClick={toggleDrawer}>
						<div className="c-trigger__inner">
							<span className="c-trigger__line"></span>
							<span className="c-trigger__line"></span>
						</div>
						{/* Menu */}
					</button>
				</div>
			</header>
			<div className={clsx('l-drawer', { 'is-open': isOpen })}>
			<div className='l-drawer__image'>
					<Image src={treeImage} alt='tree' fill className='object-cover' />
				</div>
				<div className="l-drawer__content">
					<nav className="l-drawer__navi">
						<ul>
							{NAVI_ITEMS.map((item, index) => (
								<li key={index}>
									<Link href={`/${lang}${item.href}`} onClick={toggleDrawer}>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className="l-drawer__footer">
						<ul>
							<li>
								<Link href={INSTAGRAM_URL} target="_blank" onClick={toggleDrawer}>
									<span>INSTAGRAM</span>
									<ArrowUpRight />
								</Link>
							</li>
							<li>
								<Link href={`/${lang}/terms`} onClick={toggleDrawer}>
									<span>TERMS OF USE</span>
								</Link>
							</li>
						</ul>
						<div className="l-drawer__lang">
							<LanguageSwitcher currentLang={lang} />
						</div>
					</div>
				</div>

			</div>
		</>
	);
}
