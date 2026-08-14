import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, sectionIds, brandName } from '../data'
import ThemeControls from './ThemeControls'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      for (const section of sectionIds) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (!element) return

    // Close the mobile menu BEFORE starting the smooth scroll.
    // Closing it here (rather than after) means the menu's height-collapse
    // doesn't mutate the document layout mid-scroll and cancel the
    // in-flight smooth-scroll animation — which is why mobile menu links
    // worked locally (desktop viewport, menu not rendered) but not on the
    // deployed GitHub Pages site (mobile viewport, menu rendered).
    // `setMobileMenuOpen(false)` unmounts via AnimatePresence; to keep the
    // layout shift from racing the scroll we skip the exit animation below.
    setMobileMenuOpen(false)

    // Defer the scroll one frame so the menu's unmount has flushed and the
    // browser computes the section's position against the final layout.
    requestAnimationFrame(() => element.scrollIntoView({ behavior: 'smooth' }))
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled || mobileMenuOpen
                  ? 'bg-surface/95 backdrop-blur-md border-b border-border'
                  : 'bg-transparent'
              }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <motion.a
            href="#hero"
            className="text-2xl font-bold text-accent tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Go to home"
          >
            {brandName}
          </motion.a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  activeSection === link.href.replace('#', '') 
                    ? 'text-accent' 
                    : 'text-content-muted hover:text-accent'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                whileHover={{ y: -2 }}
              >
                {link.label}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: activeSection === link.href.replace('#', '') ? 1 : 0 
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <ThemeControls variant="desktop" />
          </div>

          <motion.button
            className="md:hidden p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              className={`md:hidden mt-2 pb-4 border-t border-border ${mobileMenuOpen ? 'overflow-visible' : 'overflow-hidden'}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col space-y-4 pt-4">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`px-4 py-2 rounded-lg text-center font-medium transition-colors text-left ${
                      activeSection === link.href.replace('#', '')
                        ? 'bg-accent/20 text-accent'
                        : 'text-content-muted hover:bg-accent/10 hover:text-accent'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <div className="pt-2 flex items-center justify-center border-t border-accent/20">
                  <ThemeControls variant="mobile" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}