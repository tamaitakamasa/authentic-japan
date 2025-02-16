import { z } from 'zod';
import { emailSchema, nameSchema } from './shared';

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  body: z.string()
    .min(10, '本文は10文字以上で入力してください')
    .max(1000, '本文は1000文字以内で入力してください')
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
