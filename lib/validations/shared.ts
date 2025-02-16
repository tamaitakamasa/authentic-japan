import { z } from 'zod';

// 共通で使用するバリデーションルール
export const emailSchema = z.string().email('有効なメールアドレスを入力してください');
export const nameSchema = z.string().min(2, '名前は2文字以上で入力してください');
