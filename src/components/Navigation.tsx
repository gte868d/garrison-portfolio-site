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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      scrolled ? 'glass-morphism py-3 md:py-4' : 'bg-transparent py-4 md:py-6'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          {showLogo && currentLogo ? (
            <div className="relative h-8 w-auto">
              <Image 
                src={currentLogo} 
                alt="Garrison Brooks" 
                width={160}
                height={32}
                className="h-8 w-auto object-contain"
                style={{ objectFit: 'contain', height: '32px', width: 'auto' }}
                priority
              />
            </div>
          ) : (
            <span className="text-xl md:text-2xl font-serif font-bold hover:text-accent transition-colors">
              Garrison Brooks
            </span>
          )}
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          <Link href="/#projects" className="hover:text-accent transition-colors text-base">
            Work
          </Link>
          <Link href="/about" className="hover:text-accent transition-colors text-base">
            About
          </Link>
          <Link href="https://askbetter.us" target="_blank" rel="noopener noreferrer" 
                className="text-accent hover:text-accent-glow transition-colors text-base">
            AskBetter
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:text-accent transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-morphism border-t border-white/10 mt-3">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              href="/#projects" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors text-lg py-2"
            >
              Work
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors text-lg py-2"
            >
              About
            </Link>
            <Link 
              href="https://askbetter.us" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-accent hover:text-accent-glow transition-colors text-lg py-2"
            >
              AskBetter
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
