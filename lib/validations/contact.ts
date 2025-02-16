import { z } from 'zod';
import { getEmailSchema, getNameSchema } from './shared';
import { Locale } from '@/constants/site';

export const getContactFormSchema = (lang: Locale) =>
	z.object({
		name: getNameSchema(lang),
		email: getEmailSchema(lang),
		body: z
			.string()
			.min(10, lang === 'ja' ? '本文は10文字以上で入力してください' : lang === 'en' ? 'Please enter at least 10 characters' : 'Veuillez entrer au moins 10 caractères')
			.max(1000, lang === 'ja' ? '本文は1000文字以内で入力してください' : lang === 'en' ? 'Please enter no more than 1000 characters' : 'Veuillez entrer moins de 1000 caractères'),
		privacyPolicy: z.boolean().refine((val) => val === true, {
			message: lang === 'ja' ? '利用規約に同意する必要があります' : lang === 'en' ? 'You must agree to the Terms of Service' : "Vous devez accepter les conditions d'utilisation"
		})
	});

export const contactFormSchema = getContactFormSchema('ja');

export type ContactFormData = z.infer<typeof contactFormSchema>;
