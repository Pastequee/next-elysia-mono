import '~/style/globals.css'

import type { Metadata } from 'next'

import { Geist, Geist_Mono } from 'next/font/google'

import { Providers } from '~/components/utils/providers'

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})
const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  description: 'Next.js + tRPC + BetterAuth',
  title: 'Applicaction template for Next.js with tRPC backend and BetterAuth',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
