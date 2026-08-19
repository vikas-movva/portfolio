import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, sectionIds, brandName } from '../data'
import ThemeControls from './ThemeControls'

/**
 * Lightweight portal host. The mobile menu is rendered here instead of inside
 * the animated header because framer-motion's motion.header applies a
 * transform / will-change that turns it into a containing block for
 * fixed-position descendants — which made the menu's `inset-0` resolve to the
 * header's own 73px height and left the page content visible behind it.
 * Portaling to document.body keeps the overlay full-viewport.
 */
// function usePortalEl() {
//   const ref = useRef<HTMLDivElement | null>(null)
//   if (!ref.current) ref.current = document.createElement('div')
//   useEffect(() => {
//     document.body.appendChild(ref.current!)
//     return () => {
//       if (ref.current?.parentElement) ref.current.parentElement.removeChild(ref.current!)
//     }
//   }, [])
//   return ref.current
// }

/**
 * Compact, understated editorial nav: a thin rule, a small brand mark, and a
 * row of numbered links. Stays transparent until it scrolls, then gains a
 * subtle backing. The mobile menu is a full-height side panel — editorial
 * rather than a dropdown list.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)

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

  // Close the mobile menu BEFORE starting the smooth scroll so the menu's
  // height-collapse doesn't mutate the document layout mid-scroll and cancel
  // the in-flight smooth-scroll animation.
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (!element) return

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
          ? 'bg-surface/95 backdrop-blur-md border-b border-border-soft'
          : 'bg-transparent'
      }`}
    >
      <nav className="container flex items-center justify-between py-4" aria-label="Main navigation">
        <motion.a
          href="#hero"
          className="font-display text-xl tracking-tight text-content"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Go to home"
        >
          {brandName}
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(link.href)
              }}
              className="group inline-flex items-center gap-2 text-sm font-medium text-content-muted transition-colors hover:text-content"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.2 }}
            >
              <span
                className={`text-xs font-mono transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-accent'
                    : 'text-content-faint'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="relative pb-1">
                {link.label}
                <motion.span
                  className="absolute left-0 bottom-0 h-px w-full bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeSection === link.href.replace('#', '') ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </span>
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <ThemeControls variant="desktop" />
        </div>

        <motion.button
          className="md:hidden p-2 text-content hover:text-accent transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          whileTap={{ scale: 0.9 }}
        >
          <span className="sr-only">Menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </motion.button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden fixed inset-0 z-40 bg-surface flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container flex items-center justify-between py-4">
              <span className="font-display text-xl tracking-tight text-content">{brandName}</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-content-muted hover:text-content transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="container flex-1 flex flex-col justify-center gap-1 py-8 bg-surface/95 backdrop-blur-md">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="group flex items-center gap-4 py-4 text-left border-b border-border-soft"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span
                    className={`text-sm font-mono ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-accent'
                        : 'text-content-faint'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-3xl tracking-tight text-content group-hover:text-accent transition-colors">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </div>
            <div className="container pb-8 pt-4 border-t border-border-soft">
              <ThemeControls variant="mobile" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}