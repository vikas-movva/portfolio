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

type ThemeColorToken =
  | 'primary'
  | 'primary-hover'
  | 'dark'
  | 'darker'
  | 'accent'
  | 'accent-hover'

function readVar(token: ThemeColorToken): string | null {
  if (typeof window === 'undefined') return null
  const name = `--color-${token}-rgb`
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  // Tokens are stored as space-separated RGB triplets ("0 212 255").
  // Return a ready-to-use `rgb(...)` string so callers can also feed it to
  // hexToRgba-style helpers or template literals in SVG/Framer Motion.
  if (!value) return null
  return `rgb(${value})`
}

/**
 * Convert a colour to an `rgba(r, g, b, alpha)` string.
 * Accepts either a `#RRGGBB` hex or an `rgb(r g b)` triplet (the form
 * returned by useThemeColor). Returns '' for invalid input. Used to build
 * Framer Motion shadows / SVG values from theme colours.
 */
export function hexToRgba(color: string, alpha: number): string {
  const c = color.trim()
  const m = /^#?([0-9a-fA-F]{6})$/.exec(c)
  if (m) {
    const n = parseInt(m[1], 16)
    return `rgba(${(n >> 16) & 0xff}, ${(n >> 8) & 0xff}, ${n & 0xff}, ${alpha})`
  }
  const t = /^rgb\(\s*([\d]+)\s+([\d]+)\s+([\d]+)\s*\)$/.exec(c)
  if (t) {
    return `rgba(${t[1]}, ${t[2]}, ${t[3]}, ${alpha})`
  }
  return ''
}
