"use client";

import { WPGalleryItem } from "@/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import useDeviceSize from "@/hooks/useDeviceSize";

interface PageHeaderProps {
  title?: string;
  description?: string;
  mv?: WPGalleryItem;
}

export function PageHeader({
  title,
  description,
  mv,
}: PageHeaderProps) {
  const [content, setContent] = useState<string | null>(
    null
  );
  const { isDesktop } = useDeviceSize();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // "ターゲットの上部"が画面の上部に来た時点を0とし、"ターゲットの上部"が画面の下部に来た時点を1とする
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0", "30vh"]
  );

  useEffect(() => {
    if (description) {
      setContent(description);
    }
  }, [description]);

  return (
    <div
      className="p-page__header u-full-bleed overflow-y-hidden"
      ref={containerRef}
    >
      <div className="p-page__inner c-container">
        {title && (
          <h2 className="p-page__title">{title}</h2>
        )}
        {content && (
          <p
            className="p-page__description"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
      {mv &&
        mv.sizes &&
        mv.sizes["2048x2048"] &&
        (isDesktop ? (
          <motion.figure
            className="p-page__mv"
            style={{ y }}
          >
            <Image
              src={mv.sizes["2048x2048"]}
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </motion.figure>
        ) : (
          <figure className="p-page__mv">
            <Image
              src={mv.sizes["2048x2048"]}
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </figure>
        ))}
    </div>
  );
}
