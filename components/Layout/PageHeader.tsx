// 'use client';

import { WPGalleryItem } from '@/types';
import Image from 'next/image';

interface PageHeaderProps {
	title?: string;
	description?: string;
	mv: WPGalleryItem;
}

export function PageHeader({ title, description, mv }: PageHeaderProps) {
	return (
		<div className="p-page__header u-full-bleed">
			<div className="p-page__inner c-container">
				{title && <h2 className="p-page__title">{title}</h2>}
				{description && <p className="p-page__description" dangerouslySetInnerHTML={{ __html: description || '' }} />}
			</div>
			{mv && (
				<figure className="p-page__mv">
					<Image src={mv.sizes['2048x2048']} alt="" fill style={{ objectFit: 'cover' }} />
				</figure>
			)}
		</div>
	);
}
