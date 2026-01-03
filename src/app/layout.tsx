import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Garrison Brooks | Industrial Designer',
  description: 'Fast ideation. Deep exploration. Solutions that ship. 20 years solving how products meet consumers through systematic design thinking and AI-integrated workflows.',
  keywords: 'industrial designer, retail displays, packaging design, trade show design, POP displays, AI design methodology',
  authors: [{ name: 'Garrison Brooks' }],
  openGraph: {
    title: 'Garrison Brooks | Industrial Designer',
    description: 'Fast ideation. Deep exploration. Solutions that ship.',
    type: 'website',
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
        <div className="grain-texture min-h-screen bg-gradient-mesh">
          <Navigation />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
