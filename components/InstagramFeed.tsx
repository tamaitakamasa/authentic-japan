'use client';
import React, { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    elfsight?: {
      initialize: () => void;
    };
  }
}

export default function InstaFeed() {
  useEffect(() => {
    window.elfsight?.initialize();
  }, []);

  return (
    <div>
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.elfsight?.initialize();
        }}
      />
      <div className="elfsight-app-9b32843e-3af8-4ccd-8e69-9f6637341c8a" data-elfsight-app-lazy></div>
    </div>
  );
}
