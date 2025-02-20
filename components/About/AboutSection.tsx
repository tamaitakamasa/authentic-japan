'use client';

import { WPSiteContent } from '@/types';
import Image from 'next/image';
import { motion } from 'motion/react';

interface AboutSectionItemProps {
	number: string;
	title: string;
	subtitle: string | undefined;
	description: string | undefined;
	color?: string;
}

function AboutSectionItem({ number, title, subtitle, description, color }: AboutSectionItemProps) {
	return (
		<motion.div className={`u-${color}`} initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}>
			<hgroup>
				<motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
					{number}. {title}
				</motion.h2>
				<motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
					{subtitle}
				</motion.h3>
			</hgroup>
			<motion.p dangerouslySetInnerHTML={{ __html: description || '' }} initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}/>
		</motion.div>
	);
}

interface AboutSectionProps {
	siteOptions: WPSiteContent;
}

export default function AboutSection({ siteOptions }: AboutSectionProps) {
	return (
		<div className="p-page-about__container">
			<div className="p-page-about__description">
				<div>
					<p dangerouslySetInnerHTML={{ __html: siteOptions.about_section0_description || '' }} />
				</div>
				<AboutSectionItem
					number="01"
					title="Travelers"
					subtitle={siteOptions.about_section1_title}
					description={siteOptions.about_section1_description}
					color='green'
				/>
				<AboutSectionItem
					number="02"
					title="Authentic Japnan Navigator"
					subtitle={siteOptions.about_section2_title}
					description={siteOptions.about_section2_description}
					color='red'
				/>
				<AboutSectionItem
					number="03"
					title="Local Area"
					subtitle={siteOptions.about_section3_title}
					description={siteOptions.about_section3_description}
					color='blue'
				/>
			</div>
			<div className="p-page-about__image">
				<figure>
					<Image src="/about/about_all.svg" alt="" fill unoptimized />
				</figure>
				<figure>
					<Image src="/about/about1.svg" alt="" fill unoptimized />
				</figure>
				<figure>
					<Image src="/about/about2.svg" alt="" fill unoptimized />
				</figure>
				<figure>
					<Image src="/about/about3.svg" alt="" fill unoptimized />
				</figure>
			</div>
		</div>
	);
}
