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
  title: '$POMBO – Before the Paper Plane, There Were Pigeons',
  description:
    'Before the paper plane, there were pigeons. $POMBO is the legendary deadpan WhatsApp pigeon on TON blockchain — the original messenger turned internet culture icon. Sarcasm with a straight face.',
  keywords: [
    'POMBO',
    '$POMBO',
    'TON',
    'TON blockchain',
    'meme token',
    'meme coin',
    'pigeon',
    'carrier pigeon',
    'WhatsApp emoji',
    'crypto',
    'DeFi',
    'Telegram',
  ],
  authors: [{ name: 'POMBO Team' }],
  creator: 'POMBO',
  metadataBase: new URL('https://pombo.fun'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: '$POMBO – The Original Messenger',
    title: '$POMBO – Before the Paper Plane, There Were Pigeons',
    description:
      'Telegram is the modern messenger. Pigeons were the original. $POMBO brings the deadpan WhatsApp bird to TON — internet culture with a straight face.',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'POMBO Token Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    site: '@PomboGram',
    creator: '@PomboGram',
    title: '$POMBO – Before the Paper Plane, There Were Pigeons',
    description:
      'Telegram is the modern messenger. Pigeons were the original. $POMBO brings the deadpan WhatsApp bird to TON.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
  other: {
    'theme-color': '#061225',
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

