import { Inter } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'
import { LanguageProvider } from '@/context/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Cart from '@/components/Cart'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Comoara Stupului - Produse Apicole Naturale',
    template: '%s | Comoara Stupului',
  },
  description: 'Produse apicole naturale de calitate superioară: miere, fagure, lumânări din ceară de albine și polen. Livrat direct de la producător.',
  icons: {
    icon: '/assets/generalImgs/logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro" className={inter.variable}>
      <body>
        <LanguageProvider>
          <CartProvider>
            <Header />
            <Cart />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
