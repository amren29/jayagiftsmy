import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Borneo Gifts & Premium Supply - Corporate Gifts Made Easy in Sabah',
  description: 'Professional corporate gifts and promotional items in Miri & Kota Kinabalu, Sabah. Custom branding, competitive MOQ pricing, and reliable delivery.',
  keywords: 'corporate gifts, promotional items, custom branding, Sabah, Miri, Kota Kinabalu',
  authors: [{ name: 'Borneo Gifts & Premium Supply' }],
  openGraph: {
    title: 'Borneo Gifts & Premium Supply - Corporate Gifts Made Easy in Sabah',
    description: 'Professional corporate gifts and promotional items in Miri & Kota Kinabalu, Sabah.',
    type: 'website',
    locale: 'en_MY',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}