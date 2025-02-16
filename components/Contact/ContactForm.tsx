'use client';

import { Locale } from '@/constants/site';
import { useTranslations } from '@/lib/i18n';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormData, contactFormSchema } from '@/lib/validations/contact';

export default function ContactForm({ lang }: { lang: Locale }) {
	// const [submitStatus, setSubmitStatus] = useState<{
	//   type: 'success' | 'error' | null;
	//   message: string | null;
	// }>({ type: null, message: null });

	const form = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: '',
			email: '',
			body: ''
		}
	});
	const t = useTranslations(lang);

	async function onSubmit(data: ContactFormData) {
		console.log('data:', data);
		// setSubmitStatus({ type: 'success', message: '送信しました' });
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t({ ja: 'お名前', en: 'Name' })}</FormLabel>
							<FormControl>
								<Input placeholder="山田 太郎" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t({ ja: 'メールアドレス', en: 'Email' })}</FormLabel>
							<FormControl>
								<Input type="email" placeholder="taro@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="body"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t({ ja: 'お問い合わせ内容', en: 'Inquiry details' })}</FormLabel>
							<FormControl>
								<Textarea placeholder="お問い合わせ内容を入力してください" className="min-h-[120px]" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
					{form.formState.isSubmitting ? '送信中...' : '送信'}
				</Button>
			</form>
		</Form>

		// <form action="https://ssgform.com/s/27prG3SjVBW4" method="post" className="c-form">
		// 	<div className="c-form__items">
		// 		<div className="c-form__item c-form-item">
		// 			<div className="c-form-item__label">
		// 				<label htmlFor="user-name">{t({ ja: 'お名前', en: 'Name' })}</label>
		// 			</div>
		// 			<div className="c-form-item__control">
		// 				<input type="text" id="user-name" name={t({ ja: 'お名前', en: 'Name' })} required />
		// 			</div>
		// 		</div>
		// 		<div className="c-form__item c-form-item">
		// 			<div className="c-form-item__label">
		// 				<label htmlFor="user-email">{t({ ja: 'メールアドレス', en: 'Email' })}</label>
		// 			</div>
		// 			<div className="c-form-item__control">
		// 				<input type="email" id="user-email" name={t({ ja: 'メールアドレス', en: 'Email' })} required />
		// 			</div>
		// 		</div>
		// 		<div className="c-form__item c-form-item">
		// 			<div className="c-form-item__label">
		// 				<label htmlFor="contact-contents">{t({ ja: 'お問い合わせ内容', en: 'Inquiry details' })}</label>
		// 			</div>
		// 			<div className="c-form-item__control">
		// 				<textarea id="contact-contents" name={t({ ja: 'お問い合わせ内容', en: 'Inquiry details' })} required></textarea>
		// 			</div>
		// 		</div>
		// 	</div>
		// 	<div className="c-form__submit">
		// 		<button type="submit">{t({ ja: '送信する', en: 'Submit' })}</button>
		// 	</div>
		// </form>
	);
}
