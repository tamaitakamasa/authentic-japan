"use client";

import { WPSiteContent } from "@/types";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AboutSectionItemProps {
  number: string;
  title: string;
  subtitle: string | undefined;
  description: string | undefined;
  color?: string;
}

interface AboutSectionProps {
  siteOptions: WPSiteContent;
}

function AboutSectionItem({
  number,
  title,
  subtitle,
  description,
  color,
}: AboutSectionItemProps) {
  return (
    <div
      data-index={number}
      className={`u-${color} p-page-about__section`}
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <hgroup>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {number}. {title}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.h3>
        </hgroup>
        <motion.p
          dangerouslySetInnerHTML={{ __html: description || "" }}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </div>
  );
}

export default function AboutSection({
  siteOptions,
}: AboutSectionProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  // console.log('activeImageIndex:', activeImageIndex);

	const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start start", "start end"], // "ターゲットの上部"が画面の上部に来た時点を0とし、"ターゲットの上部"が画面の下部に来た時点を1とする
  });

	// const y = useTransform(scrollYProgress, [0, 1], ["0", "30vh"]);
	// const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);
	const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
	// console.log('y:', y);

  // Intersection Observer を使用してアクティブなサービスアイテムを検出
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              entry.target.getAttribute("data-index")
            );
            setActiveImageIndex(index);
            // console.log("Section becoming visible:", {
            //   index,
            //   element: entry.target,
            // });
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const items = document.querySelectorAll(".p-page-about__section");
    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <div className="p-page-about__container">
      <div className="p-page-about__description">
        <div data-index="00" className="p-page-about__section">
          <div>
            <hgroup>
              <h3>
                Authentic Japan Navigator Will Share The Passion
              </h3>
            </hgroup>
            <p
              dangerouslySetInnerHTML={{
                __html: siteOptions.about_section0_description || "",
              }}
            />
          </div>
        </div>
        <AboutSectionItem
          number="01"
          title="Travelers"
          subtitle={siteOptions.about_section1_title}
          description={siteOptions.about_section1_description}
          color="green"
        />
        <AboutSectionItem
          number="02"
          title="Authentic Japnan Navigator"
          subtitle={siteOptions.about_section2_title}
          description={siteOptions.about_section2_description}
          color="red"
        />
        <AboutSectionItem
          number="03"
          title="Local Area"
          subtitle={siteOptions.about_section3_title}
          description={siteOptions.about_section3_description}
          color="blue"
        />
      </div>
      <motion.div
        className="p-page-about__image"
        // initial={{ opacity: 1, x: -100 }}
        // whileInView={{ opacity: 0.4, x: 0 }}
				ref={imageRef}
				style={{ scale }}
      >
        {[...Array(4)].map((_, index) => (
          <figure
            key={index}
            style={{
              opacity: activeImageIndex === index ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <Image
              src={`/about/about${index === 0 ? "_all" : index}.png`}
              alt=""
              fill
              unoptimized
            />
          </figure>
        ))}
      </motion.div>
      {/* <div className="p-page-about__image">
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
			</div> */}
    </div>
  );
}
