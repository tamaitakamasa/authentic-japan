'use client';

import { WPSiteContent } from '@/types';
import Image from 'next/image';
import { VideoPlayer } from '../VideoPlayer';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface HomeVideoProps {
	siteOptions: WPSiteContent;
}

export default function HomeVideo({ siteOptions }: HomeVideoProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end start'] // "ターゲットの上部"が画面の上部に来た時点を0とし、"ターゲットの上部"が画面の下部に来た時点を1とする
	});
	console.log('containerRef:', containerRef);
	// const y = useTransform(scrollYProgress, [0, 1], ['0', `${containerRef.current?.clientHeight}px`]);
	const y = useTransform(scrollYProgress, [0, 1], ['0', '50vh']);
	return (
		<div className="p-home-video__bg relative" ref={containerRef}>
			<motion.div style={{ y }}>
				{siteOptions.home_about_mv && (
					<figure className="p-home-video__mv">
						<Image src={siteOptions.home_about_mv.link} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
					</figure>
				)}
				{siteOptions.home_about_video && <VideoPlayer videoUrl={siteOptions.home_about_video} />}
			</motion.div>
		</div>
	);
}
