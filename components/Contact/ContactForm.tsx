'use client';

import { Locale } from '@/constants/site';
import { useTranslations } from '@/lib/i18n';

export default function ContactForm({ lang }: { lang: Locale }) {
	const t = useTranslations(lang);
	return (
		<form action="https://ssgform.com/s/27prG3SjVBW4" method="post" className="c-form">
			<div className="c-form__items">
				<div className="c-form__item c-form-item">
					<div className="c-form-item__label">
						<label htmlFor="user-name">{t({ ja: 'お名前', en: 'Name' })}</label>
					</div>
					<div className="c-form-item__control">
						<input type="text" id="user-name" name={t({ ja: 'お名前', en: 'Name' })} required />
					</div>
				</div>
				<div className="c-form__item c-form-item">
					<div className="c-form-item__label">
						<label htmlFor="user-email">{t({ ja: 'メールアドレス', en: 'Email' })}</label>
					</div>
					<div className="c-form-item__control">
						<input type="email" id="user-email" name={t({ ja: 'メールアドレス', en: 'Email' })} required />
					</div>
				</div>
				<div className="c-form__item c-form-item">
					<div className="c-form-item__label">
						<label htmlFor="contact-contents">{t({ ja: 'お問い合わせ内容', en: 'Inquiry details' })}</label>
					</div>
					<div className="c-form-item__control">
						<textarea id="contact-contents" name={t({ ja: 'お問い合わせ内容', en: 'Inquiry details' })} required></textarea>
					</div>
				</div>
			</div>
			<div className="c-form__submit">
				<button type="submit">{t({ ja: '送信する', en: 'Submit' })}</button>
			</div>
		</form>
	);
}
