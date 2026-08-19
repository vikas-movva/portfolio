import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../theme/ThemeContext'
import { themes, themeOrder, themeLabels, type ThemeName } from '../theme/theme'

/**
 * Light/Dark toggle + accent-colour picker.
 *
 * Renders two controls side by side:
 *  - a sun/moon button that flips the visual mode, and
 *  - a palette button that opens a popover of the five accent swatches.
 *
 * Reused in both the desktop nav and the mobile menu, so it takes a `variant`
 * to keep spacing sane in each context.
 */
export default function ThemeControls({
  variant = 'desktop',
}: {
  variant?: 'desktop' | 'mobile'
}) {
  const { mode, accent, toggleMode, setAccent } = useTheme()
  const [open, setOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Close the accent popover on outside click or Escape.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const container =
    variant === 'mobile' ? 'flex items-center gap-3' : 'flex items-center gap-2'

  return (
    <div className={container}>
      {/* Light / dark toggle — thin rectangular button, no pill/glass. */}
      <motion.button
        type="button"
        onClick={toggleMode}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={mode === 'light'}
        title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className="p-2 border border-border-soft text-content-muted hover:text-accent hover:border-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={mode}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="block"
          >
            {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Accent picker — thin rectangular button. */}
      <div className="relative" ref={popoverRef}>
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Choose accent colour"
          title="Choose accent colour"
          className="p-2 border border-border-soft text-content-muted hover:text-accent hover:border-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <PaletteIcon />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              role="menu"
              aria-label="Accent colour"
              className="absolute right-0 mt-2 z-50 p-3 border border-border-soft bg-surface flex flex-col gap-1 w-44"
            >
              <span className="text-xs font-medium text-content-faint mb-1 px-1">
                Accent colour
              </span>
              <div className="grid grid-cols-5 gap-2">
                {themeOrder.map((name: ThemeName) => {
                  const active = name === accent
                  return (
                    <motion.button
                      key={name}
                      type="button"
                      role="menuitemradio"
                      aria-checked={active}
                      aria-label={themeLabels[name]}
                      title={themeLabels[name]}
                      onClick={() => {
                        setAccent(name)
                        setOpen(false)
                      }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className={`relative h-7 w-7 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:ring-accent ${
                        active ? 'ring-2 ring-current ring-offset-1 ring-offset-surface' : ''
                      }`}
                      style={{ backgroundColor: themes[name].primary }}
                    >
                      {active && (
                        <svg
                          className="w-3.5 h-3.5 text-on-accent drop-shadow"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  )
}

function PaletteIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>
  )
}