import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { LOCALES, DEFAULT_LOCALE } from '@/constants/site'

// ユーザーの優先言語を取得する関数
function getLocale(request: NextRequest): string {
  // Negotiatorに渡すためにヘッダーをプレーンなオブジェクトに変換
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const locales = LOCALES
  // Accept-Languageヘッダーから言語リストを取得
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  // intl-localematcherを使用して最適な言語を選択
  return matchLocale(languages, locales, DEFAULT_LOCALE)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // パスに言語コードが含まれているかチェック
  const pathnameIsMissingLocale = LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    // ユーザーの優先言語を取得
    const locale = getLocale(request)

    // デフォルト言語でパスが存在するかチェック
    const response = NextResponse.next()
    if (response.status === 404) {
      // ページが存在しない場合、検出された言語のホームページにリダイレクト
      return NextResponse.redirect(new URL(`/${locale}`, request.url))
    }

    // 存在する場合、検出された言語をパスに追加してリダイレクト
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }
}

// ミドルウェアを適用するパスを指定
export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
	matcher: [
    // 静的ファイルや特定のパスを除外
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*$).*)'
  ],
}
