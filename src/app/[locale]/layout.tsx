import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Toaster } from '@/components/ui/sonner'
import { NextIntlClientProvider } from 'next-intl'
import LocaleProvider from '@/components/locale-provider'
import { notFound } from 'next/navigation'
import { loadTranslations } from '@/lib/translations'
import LocaleMenu from './(protected)/_components/locale-menu'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }]
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: {
    locale: string
  }
}) {
  let messages
  try {
    messages = await loadTranslations(locale)
  } catch (error) {
    notFound()
  }

  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang={locale}>
        {/* <LocaleProvider locale={locale}> */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <body className={cn('min-h-screen bg-background font-sans antialiased relative', inter.variable)}>
            {children}
            <Toaster />
            <LocaleMenu />
          </body>
        </NextIntlClientProvider>
        {/* </LocaleProvider> */}
      </html>
    </SessionProvider>
  )
}
