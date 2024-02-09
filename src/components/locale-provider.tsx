import { locales } from '@/navigation'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { notFound } from 'next/navigation'
import React from 'react'

const LocaleProvider = ({ locale, children }: { locale: string; children: React.ReactNode }) => {
  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = useMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

export default LocaleProvider
