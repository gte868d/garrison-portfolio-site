'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-morphism py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif font-bold hover:text-accent transition-colors">
          Garrison Brooks
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
