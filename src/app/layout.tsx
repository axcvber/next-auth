import '@/styles/globals.css'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Toaster } from '@/components/ui/sonner'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang='en'>
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  )
}
