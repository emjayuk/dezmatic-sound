import type { Metadata } from 'next'
import { Syne, Outfit } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Dezmatic Sound | Bristol's Premier Sound System",
  description:
    'Caribbean and international sound system based in Bristol, UK. Available for weddings, club nights, carnivals, corporate events, private hire and more.',
  keywords:
    'sound system Bristol, Caribbean music Bristol, Dancehall Bristol, Reggae Bristol, wedding sound system, event hire Bristol',
  openGraph: {
    title: "Dezmatic Sound | Bristol's Premier Sound System",
    description:
      'Dancehall, Reggae, Afrobeats, Soca and Hip Hop. Available for every event.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable}`}>
      <body>
        <ScrollProgress />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
