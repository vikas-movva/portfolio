import { useState, useEffect } from 'react'

/**
 * Read the current theme colour from the CSS custom properties defined in
 * index.css. Components that need the theme colour as a raw string (e.g. in
 * SVG attributes or Framer Motion animation values, which can't use Tailwind
 * classes) should call this instead of hardcoding a hex value.
 *
 * Example: const primary = useThemeColor('primary')
 *
 * Returns null until the CSS variable is resolvable (first render), then the
 * resolved colour string (e.g. "#00d4ff"). Consumers should provide a sensible
 * fallback while null.
 */
export function useThemeColor(token: ThemeColorToken): string | null {
  const [color, setColor] = useState<string | null>(() => readVar(token))

  useEffect(() => {
    // Re-read after mount (CSS variables are available in the DOM by then).
    setColor(readVar(token))

    // Observe data-theme changes so runtime theme switches update us.
    const observer = new MutationObserver(() => setColor(readVar(token)))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [token])

  return color
}

type ThemeColorToken = 'primary' | 'primary-hover' | 'dark' | 'darker'

function readVar(token: ThemeColorToken): string | null {
  if (typeof window === 'undefined') return null
  const name = `--color-${token}`
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  return value || null
}

/**
 * Convert a `#RRGGBB` hex string to an `rgba(r, g, b, alpha)` string.
 * Returns '' for invalid input. Used to build Framer Motion shadow values
 * from theme colours (which are stored as hex in the CSS variables).
 */
export function hexToRgba(hex: string, alpha: number): string {
  const m = /^#?([0-9a-fA-F]{6})$/.exec(hex.trim())
  if (!m) return ''
  const n = parseInt(m[1], 16)
  const r = (n >> 16) & 0xff
  const g = (n >> 8) & 0xff
  const b = n & 0xff
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
