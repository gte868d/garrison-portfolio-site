import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'Garrison Brooks | Industrial Designer',
  description: 'Fast ideation. Deep exploration. Solutions that ship. 20 years solving how products meet consumers through systematic design thinking and AI-integrated workflows.',
  keywords: 'industrial designer, retail displays, packaging design, trade show design, POP displays, AI design methodology',
  authors: [{ name: 'Garrison Brooks' }],
  metadataBase: new URL('https://garrisonbrooks.com'),
  openGraph: {
    title: 'Garrison Brooks | Industrial Designer',
    description: 'Fast ideation. Deep exploration. Solutions that ship.',
    type: 'website',
    url: 'https://garrisonbrooks.com',
    siteName: 'Garrison Brooks Portfolio',
    images: [
      {
        url: '/images/gblogo.png',
        width: 1200,
        height: 630,
        alt: 'Garrison Brooks - Industrial Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Garrison Brooks | Industrial Designer',
    description: 'Fast ideation. Deep exploration. Solutions that ship.',
    images: ['/images/gblogo.png'],
  },
}

function getSettings() {
  try {
    const settingsPath = path.join(process.cwd(), 'content/settings/config.json')
    const settingsData = fs.readFileSync(settingsPath, 'utf8')
    return JSON.parse(settingsData)
  } catch (error) {
    return {}
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = getSettings()
  
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="grain-texture min-h-screen bg-gradient-mesh">
          <Navigation 
            logo={settings.logo} 
            logoDark={settings.logoDark}
            showLogo={settings.showLogo}
          />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
