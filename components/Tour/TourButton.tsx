"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface TourButtonProps {
  tourId: number;
  children?: ReactNode;
  className?: string;
}

export default function TourButton({
  tourId,
  children,
  className,
}: TourButtonProps) {
  return (
    <button
      className={clsx("bokunButton", className)}
      disabled
      id={`bokun_${tourId}`}
      data-src={`https://widgets.bokun.io/online-sales/f34383c7-3179-43f7-a169-d3058ddf6840/experience/${tourId}?partialView=1`}
      data-testid="widget-book-button"
      style={{
        border: "none",
        backgroundColor: "transparent",
        textAlign: "left",
      }}
    >
      {children}
    </button>
  );
}
