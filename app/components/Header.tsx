"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'mission', 'team', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 50 && rect.bottom > 50
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'gradient-teal shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-extrabold text-white">ApexCare</Link>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-50 w-10 h-10 flex items-center justify-center text-white"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`
          fixed inset-0 bg-gradient-to-br from-[#00BCD4] to-[#4DD0E1] 
          md:hidden transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="h-full flex flex-col pt-20 px-6">
            {['home', 'mission', 'team'].map((section) => (
              <button
                key={section}
                className="text-white text-2xl font-semibold py-4 border-b border-white/20 text-left"
                onClick={() => scrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            <button
              className="text-white text-2xl font-semibold py-4 mt-4 text-left"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 items-center">
            {['home', 'mission', 'team'].map((section) => (
              <li key={section}>
                <button
                  className={`text-white hover:text-[#B2EBF2] transition-colors ${
                    activeSection === section ? 'border-b-2 border-[#B2EBF2]' : ''
                  }`}
                  onClick={() => scrollToSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
            <li>
              <button
                className="bg-white text-[#00BCD4] px-6 py-2 rounded-full font-bold hover:bg-[#B2EBF2] transition-colors"
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

