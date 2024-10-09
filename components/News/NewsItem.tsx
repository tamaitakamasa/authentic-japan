import { Locale } from '@/constants/site';
import { News } from '@/types';
import React from 'react'

export default function NewsItem({ lang, article }: { lang: Locale; article: News }) {
	return (
		<div>
			<p>{lang}</p>
			<p>{article.title.rendered}</p>
		</div>
	)
}
