'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Region, WPGalleryItem } from '@/types';

export function RegionSlider({ images }: { images: WPGalleryItem[] }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const swiperRef = useRef<SwiperType | null>(null);

	useEffect(() => {
		const handleResize = () => {
			// リサイズ時の処理があれば、ここに記述
		};

		handleResize(); // 初期化時に一度実行

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleRegionClick = (index: number) => {
		setActiveIndex(index);
		if (swiperRef.current) {
			swiperRef.current.slideTo(index);
		}
	};

	return (
		<div className="c-region-slider">
			<div className="c-region-slider__content">
				<Swiper
					modules={[EffectFade, Navigation, Autoplay, Pagination]}
					effect="fade"
					fadeEffect={{ crossFade: true }}
					// navigation
					autoplay={{
						delay: 5000,
						disableOnInteraction: false
					}}
					speed={1000}
					// pagination={{
					// 	type: 'progressbar'
					// }}
					onSwiper={(swiper) => (swiperRef.current = swiper)}
					onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
					className="c-region-slider__slider">
					{images.map((image, index) => (
						<SwiperSlide key={index} className='c-region-slider__slide'>
							<Image src={image.sizes['1536x1536']} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className="c-region-slider__navi">
				<div className="c-region-slider__navi-items">
					{images.map((image, index) => (
						<button key={index} className={`c-region-slider__navi-item ${index === activeIndex ? 'is-active' : ''}`} onClick={() => handleRegionClick(index)}>
							<Image src={image.sizes['1536x1536']} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
