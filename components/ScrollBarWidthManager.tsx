'use client';

import { debounce } from '@/lib/debounce';
import { useEffect } from 'react';

export function ScrollBarWidthManager() {
	useEffect(() => {
		const updateScrollBarWidth = () => {
			const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
			document.documentElement.style.setProperty('--scrollbar-width', `${scrollBarWidth}px`);
			console.log(scrollBarWidth, 'scrollBarWidth');
		};

		updateScrollBarWidth();

		const debouncedUpdateScrollBarWidth = debounce(updateScrollBarWidth, 200);
		window.addEventListener('resize', debouncedUpdateScrollBarWidth);

		return () => {
			window.removeEventListener('resize', debouncedUpdateScrollBarWidth);
		};
	}, []);

	return null;
}
