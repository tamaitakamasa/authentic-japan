"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
// import 'swiper/css/free-mode';
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Guide } from "@/types";
import { Locale } from "@/constants/site";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { NavigatorCard } from "@/components/Navigator/NavigatorCard";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export function HomeNavigatorSlider({
  lang,
  guides,
}: {
  lang: Locale;
  guides: Guide[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [spaceBetween, setSpaceBetween] = useState(40);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleGuideClick = (index: number) => {
    if (swiperRef.current) {
      const realIndex = index % guides.length;
      swiperRef.current.slideToLoop(realIndex, 300);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSpaceBetween(20); // スマートフォンサイズの場合
      } else {
        setSpaceBetween(40); // それ以外の場合
      }
    };

    handleResize(); // 初期化時に一度実行

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-home-navigators-slider">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={spaceBetween}
        slidesPerView={1}
        initialSlide={1}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        // speed={300}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveIndex(swiper.realIndex);
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="p-home-navigators-slider__slider"
      >
        {guides.map((guide, index) => (
          <SwiperSlide key={`${guide.id}-${index}`}>
            <NavigatorCard lang={lang} guide={guide} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="p-home-navigators-slider__navi c-container">
        <div className="p-home-navigators-slider__navi-total">
          <div className="c-total">
            <div className="c-total__label">NAVIGATORS</div>
            <span className="c-total__count">{guides.length}</span>
          </div>
        </div>
        <ScrollArea>
          <div className="p-home-navigators-slider__navi-items">
            {guides.map((guide, index) => (
              <button
                key={guide.id}
                className={`p-home-navigators-slider__navi-item c-navigator-circle u-hover ${index === activeIndex ? "is-active" : ""}`}
                onClick={() => handleGuideClick(index)}
              >
                <figure className="c-navigator-circle__thumb">
                  <Image
                    src={guide.photo?.link ?? "/no-photo.jpg"}
                    alt={guide.name}
                    fill
                    sizes="20vw"
                    style={{ objectFit: "cover" }}
                  />
                </figure>
                <h3 className="c-navigator-circle__name">
                  {guide.name}
                </h3>
                {guide.regions && guide.regions.length > 0 && (
                  <div className="c-navigator-circle__region">
                    <i className="c-pin"></i>
                    <span>{guide.regions.join(", ")}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
					<ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
