// import Image from 'next/image';
import ContactForm from '@/components/Contact/ContactForm';
import { ContentHeader } from '@/components/Layout/ContentHeader';
import { Locale } from '@/constants/site';
import { Metadata } from 'next';

type Props = {
  params: { lang: Locale };
};

export async function generateMetadata({
  params: { lang },
}: Props): Promise<Metadata> {
  return {
    // タイトルだけをオーバーライド
    // layout.tsxで設定したテンプレートが適用される
    title: {
      ja: "CONTACT",
      en: "CONTACT",
      fr: "CONTACT",
    }[lang],
    // 特定のページ用の説明文をオーバーライド
    description: {
      ja: "Authentic Japanへのお問合せはこちら",
      en: "For inquiries, please contact Authentic Japan here.	",
      fr: "Pour toute demande, veuillez contacter Authentic Japan ici.",
    }[lang],
  };
}

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
