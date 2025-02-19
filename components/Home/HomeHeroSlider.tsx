'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Autoplay, Pagination, Parallax } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Locale } from '@/constants/site';
import { useRef } from 'react';
import Image from 'next/image';
import { WPSiteContent } from '@/types';
// import Link from 'next/link';
import { Button } from '@/components/Button';

export function HomeHeroSlider({ slides }: { lang: Locale; slides: WPSiteContent['home_slider'] }) {

	const swiperRef = useRef<SwiperType | null>(null);

	return (
		<div className="p-home-hero u-full-bleed overflow-hidden relative">
				<Swiper
					modules={[EffectFade, Navigation, Autoplay, Pagination, Parallax]}
					effect="fade"
					fadeEffect={{ crossFade: true }}
					// navigation={true}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false
					}}
					parallax={true}
					speed={1000}
					pagination={{
						type: 'progressbar'
					}}
					onSwiper={(swiper) => (swiperRef.current = swiper)}
					// onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
					className="p-home-hero-slider__slider">
					{slides.map((slide, index) => (
						<SwiperSlide key={index} className="p-home-hero-slider-slide">
							{slide.mv && (
								<figure className="p-home-hero-slider-slide__image">
									<Image src={slide.mv.link} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
								</figure>
							)}
							<div className="p-home-hero-slider-slide__inner">
								<hgroup className="p-home-hero-slider-slide__title">
									{slide.sub_copy && <h3 data-swiper-parallax="-30">{slide.sub_copy}</h3>}
									{slide.main_copy && <h2 data-swiper-parallax="-60" dangerouslySetInnerHTML={{ __html: slide.main_copy || '' }} />}
								</hgroup>
								{slide.url && <Button href={slide.url} label="LEARN MORE" color="light" className="p-home-hero-slider-slide__button" />}
							</div>
						</SwiperSlide>
					))}
				</Swiper>
		</div>
	);
}
