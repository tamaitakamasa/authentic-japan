'use client';

import { WPGalleryItem } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface PageHeaderProps {
  title?: string;
  description?: string;
  mv?: WPGalleryItem;
}

export function PageHeader({ title, description, mv }: PageHeaderProps) {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    if (description) {
      setContent(description);
    }
  }, [description]);

  return (
    <div className="p-page__header u-full-bleed">
      <div className="p-page__inner c-container">
        {title && <h2 className="p-page__title">{title}</h2>}
        {content && (
          <p
            className="p-page__description"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
      {mv && mv.sizes && mv.sizes['2048x2048'] && (
        <figure className="p-page__mv">
          <Image
            src={mv.sizes['2048x2048']}
            alt=""
            fill
            style={{ objectFit: 'cover' }}
          />
        </figure>
      )}
    </div>
  );
}
