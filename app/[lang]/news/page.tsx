// import Image from 'next/image';
// import { ContentHeader } from '@/components';
// import TestLink from '@/components/TestLink';
import { ContentHeader } from '@/components/Layout/ContentHeader';
import { Locale } from '@/constants/site';
import Link from 'next/link';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {

	return (
		<>
			<ContentHeader
        title="NEWS"
        breadcrumbs={[
          { label: 'HOME', href: '/' },
          { label: 'NEWS' }
        ]}
        lang={lang}
      />
			<Link href={`/${lang}`}>HOME</Link>
			{/* <TestLink /> */}
		</>
	);
}
