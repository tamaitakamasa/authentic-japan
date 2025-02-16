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

export default function ContactForm({ lang }: { lang: Locale }) {
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
    console.log('data:', data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t({
                ja: 'お名前',
                en: 'Name',
                fr: 'Nom'
              })}</FormLabel>
              <FormControl>
                <Input placeholder={t({
                  ja: '山田 太郎',
                  en: 'John Doe',
                  fr: 'Jean Dupont'
                })} {...field} />
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
              <FormLabel>{t({
                ja: 'メールアドレス',
                en: 'Email',
                fr: 'E-mail'
              })}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t({
                  ja: 'taro@example.com',
                  en: 'john@example.com',
                  fr: 'jean@example.com'
                })} {...field} />
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
              <FormLabel>{t({
                ja: 'お問い合わせ内容',
                en: 'Inquiry details',
                fr: 'Détails de la demande'
              })}</FormLabel>
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
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  <span>{t({
                    ja: 'プライバシーポリシー',
                    en: 'Privacy Policy',
                    fr: 'Politique de confidentialité'
                  })}</span>
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-primary hover:underline"
                  >
                    {t({
                      ja: '（プライバシーポリシーを読む）',
                      en: '(Read Privacy Policy)',
                      fr: '(Lire la politique de confidentialité)'
                    })}
                  </a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
          {form.formState.isSubmitting ? t({
            ja: '送信中...',
            en: 'Submitting...',
            fr: 'Envoi en cours...'
          }) : t({
            ja: '送信',
            en: 'Submit',
            fr: 'Envoyer'
          })}
        </Button>
      </form>
    </Form>
  );
}
