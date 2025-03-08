"use client";

// import useDeviceSize from "@/hooks/useDeviceSize";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

interface HomeVideoImageProps {
  imagePath: string;
}

export default function HomeVideoImage({
  imagePath,
}: HomeVideoImageProps) {
  // const { isDesktop } = useDeviceSize();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // "ターゲットの上部"が画面の上部に来た時点を0とし、"ターゲットの上部"が画面の下部に来た時点を1とする
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0", "30vh"]);

  return (
    <div className="p-home-video__bg" ref={containerRef}>
      <motion.figure className="p-home-video__mv" style={{ y }}>
        <Image
          src={imagePath}
          alt="Authentic Destinations"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </motion.figure>
    </div>
  );
}
