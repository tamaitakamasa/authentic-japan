'use client';

import { Locale } from '@/constants/site';
import { useTranslations } from '@/lib/i18n';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormData, getContactFormSchema } from '@/lib/validations/contact';
import { useState } from 'react';

const SSGFORM_URL = 'https://ssgform.com/s/Dwe48gfBEyBU';

export default function ContactForm({ lang }: { lang: Locale }) {
	const [submitStatus, setSubmitStatus] = useState<{
		type: 'success' | 'error' | null;
		message: string | null;
	}>({ type: null, message: null });

	const form = useForm<ContactFormData>({
		resolver: zodResolver(getContactFormSchema(lang)),
		defaultValues: {
			name: '',
			email: '',
			body: '',
			privacyPolicy: false
		}
	});
	const t = useTranslations(lang);

	async function onSubmit(data: ContactFormData) {
		try {
			const formData = new FormData();
			formData.append(t({ ja: 'お名前', en: 'Name', fr: 'Nom' }), data.name);
			formData.append(t({ ja: 'メールアドレス', en: 'Email', fr: 'E-mail' }), data.email);
			formData.append(t({ ja: 'お問い合わせ内容', en: 'Inquiry details', fr: 'Détails de la demande' }), data.body);

			const response = await fetch(SSGFORM_URL, {
				method: 'POST',
				headers: {
					'X-Requested-With': 'XMLHttpRequest' // このヘッダーを追加
				},
				body: formData
			});

			if (response.ok) {
				setSubmitStatus({
					type: 'success',
					message: t({
						ja: '送信が完了しました。お問い合わせありがとうございます。',
						en: 'Message sent successfully. Thank you for your inquiry.',
						fr: 'Message envoyé avec succès. Merci pour votre demande.'
					})
				});
				form.reset();
			} else {
				throw new Error('送信に失敗しました');
			}
		} catch {
			setSubmitStatus({
				type: 'error',
				message: t({
					ja: '送信に失敗しました。時間をおいて再度お試しください。',
					en: 'Failed to send message. Please try again later.',
					fr: "Échec de l'envoi du message. Veuillez réessayer plus tard."
				})
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{submitStatus.type && <div className={`p-4 rounded-md ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>{submitStatus.message}</div>}

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								{t({
									ja: 'お名前',
									en: 'Name',
									fr: 'Nom'
								})}
							</FormLabel>
							<FormControl>
								<Input
									placeholder={t({
										ja: '山田 太郎',
										en: 'John Doe',
										fr: 'Jean Dupont'
									})}
									{...field}
								/>
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
							<FormLabel>
								{t({
									ja: 'メールアドレス',
									en: 'Email',
									fr: 'E-mail'
								})}
							</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder={t({
										ja: 'taro@example.com',
										en: 'john@example.com',
										fr: 'jean@example.com'
									})}
									{...field}
								/>
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
							<FormLabel>
								{t({
									ja: 'お問い合わせ内容',
									en: 'Inquiry details',
									fr: 'Détails de la demande'
								})}
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder={t({
										ja: 'お問い合わせ内容を入力してください',
										en: 'Please enter your inquiry details',
										fr: 'Veuillez saisir les détails de votre demande'
									})}
									className="min-h-[120px]"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="privacyPolicy"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>
									<span>
										{t({
											ja: '利用規約に同意する',
											en: 'Terms of Service',
											fr: "Conditions d'utilisation"
										})}
									</span>
									<a href="/terms" target="_blank" rel="noopener noreferrer" className="ml-1 text-primary underline hover:no-underline">
										{t({
											ja: '（利用規約を読む）',
											en: '(Read Terms of Service)',
											fr: "(Lire les conditions d'utilisation)"
										})}
									</a>
								</FormLabel>
								<FormMessage className='mt-4' />
							</div>
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
					{form.formState.isSubmitting
						? t({
								ja: '送信中...',
								en: 'Submitting...',
								fr: 'Envoi en cours...'
						  })
						: t({
								ja: '送信',
								en: 'Submit',
								fr: 'Envoyer'
						  })}
				</Button>
			</form>
		</Form>
	);
}
