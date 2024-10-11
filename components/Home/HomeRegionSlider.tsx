'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Locale } from '@/constants/site';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Region } from '@/types';
import { Button } from '@/components/Button';

export function HomeRegionSlider({ regions }: { lang: Locale; regions: Region[] }) {
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
		<div className="p-home-regions-slider">
			<div className="p-home-regions-slider__navi">
				<div className="p-home-regions-slider__navi-total">
					<div className="c-total">
						<div className="c-total__label">REGIONS</div>
						<span className="c-total__count">{regions.length}</span>
					</div>
				</div>
				<div className="p-home-regions-slider__navi-items">
					{regions.map((region, index) => (
						<button key={region.id} className={`p-home-regions-slider__navi-item ${index === activeIndex ? 'is-active' : ''}`} onClick={() => handleRegionClick(index)}>
							<i></i>
							<span>{region.name}</span>
						</button>
					))}
				</div>
			</div>
			<div className="p-home-regions-slider__content">
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
					pagination={{
						type: 'progressbar'
					}}
					onSwiper={(swiper) => (swiperRef.current = swiper)}
					onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
					className="p-home-regions-slider__slider">
					{regions.map((region, index) => (
						<SwiperSlide key={index}>
							<div className="p-home-regions-slider-slide">
								<div className="p-home-regions-slider-slide__top">
									<figure className="p-home-regions-slider-slide__mv">
										<Image src={region.mv} alt={region.name} fill sizes="50vw" style={{ objectFit: 'cover' }} />
									</figure>
									<figure className="p-home-regions-slider-slide__map">
										<Image src={`/map.png`} alt={region.name} width={280} height={228} />
									</figure>
									<div className="p-home-regions-slider-slide__label">
										<div>
											<i className="c-pin"></i>
											<span>{region.name}</span>
										</div>
									</div>
								</div>
								<div className="p-home-regions-slider-slide__bottom">
									<div className="p-home-regions-slider-slide__button">
									<Button href={`/region#region${region.id}`} label="VIEW DETAIL" color="light" />
									</div>
									<p className="p-home-regions-slider-slide__description">{region.description}</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}
