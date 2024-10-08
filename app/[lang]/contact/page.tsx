// import Image from 'next/image';
import ContactForm from '@/components/Contact/ContactForm';
import { ContentHeader } from '@/components/Layout/ContentHeader';
import { Locale } from '@/constants/site';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
	return (
		<>
			<ContentHeader title="CONTACT" breadcrumbs={[{ label: 'HOME', href: '/' }, { label: 'CONTACT' }]} lang={lang} />
			<div className="l-contents__body p-page-contact">
				<ContactForm lang={lang} />
			</div>
		</>
	);
}
