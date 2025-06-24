import './globals.css'
import ThemeWrapper from '@/components/ThemeWrapper'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackgroundLayer from '@/components/BackgroundLayer'
import { Toaster } from 'react-hot-toast'
export const metadata = {
  title: 'Artistly',
  description: 'Book talented artists for your events',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth" >

      <body className="relative">
        <ThemeWrapper>
          <BackgroundLayer />
          <Header />
           <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          <main className="relative z-10 min-h-screen">{children}</main>
          <Footer />
        </ThemeWrapper>
      </body>
    </html>
  )
}



