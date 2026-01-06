'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface NavigationProps {
  logo?: string
  logoDark?: string
  showLogo?: boolean
}

export default function Navigation({ logo, logoDark, showLogo }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determine which logo to use based on scroll state
  const currentLogo = scrolled && logoDark ? logoDark : logo

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-morphism py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          {showLogo && currentLogo ? (
            <Image 
              src={currentLogo} 
              alt="Garrison Brooks" 
              width={200} 
              height={40}
              className="h-8 w-auto"
              priority
            />
          ) : (
            <span className="text-2xl font-serif font-bold hover:text-accent transition-colors">
              Garrison Brooks
            </span>
          )}
        </Link>
        
        <div className="flex gap-8">
          <Link href="/#projects" className="hover:text-accent transition-colors">
            Work
          </Link>
          <Link href="/about" className="hover:text-accent transition-colors">
            About
          </Link>
          <Link href="https://askbetter.us" target="_blank" rel="noopener noreferrer" 
                className="text-primary-light hover:text-accent transition-colors">
            AskBetter
          </Link>
        </div>
      </div>
    </nav>
  )
}
