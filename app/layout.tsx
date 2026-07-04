import type { Metadata } from 'next'
import { Lilita_One, Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const lilitaOne = Lilita_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lilita',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

export const metadata: Metadata = {
  title: 'POMBO Token - Your Trusted Carrier Pigeon',
  description: 'The trusted carrier pigeon on TON blockchain.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${lilitaOne.variable} ${sora.variable}`}>
      <body className="font-sans antialiased bg-[#0b2447] text-white">
        {children}
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  )
}

