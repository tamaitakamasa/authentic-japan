import { z } from 'zod';
import { Locale } from '@/constants/site';

// 共通で使用するバリデーションルール
export const getEmailSchema = (lang: Locale) =>
  z.string().email(
    lang === 'ja'
      ? '有効なメールアドレスを入力してください'
      : lang === 'en'
      ? 'Please enter a valid email address'
      : 'Veuillez entrer une adresse e-mail valide'
  );

export const getNameSchema = (lang: Locale) =>
  z.string().min(
    2,
    lang === 'ja'
      ? '名前は2文字以上で入力してください'
      : lang === 'en'
      ? 'Please enter at least 2 characters for the name'
      : 'Veuillez entrer au moins 2 caractères pour le nom'
  );

// デフォルトの日本語スキーマ（後方互換性のため）
export const emailSchema = getEmailSchema('ja');
export const nameSchema = getNameSchema('ja');
