import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { activeTheme, type ThemeMode, type ThemeName } from './theme'

const themeNameValues = ['cyan', 'violet', 'emerald', 'amber', 'rose'] as const

/** localStorage keys. Bump HASH if the shape ever changes incompatibly. */
const MODE_KEY = 'portfolio:theme-mode:v1'
const ACCENT_KEY = 'portfolio:theme-accent:v1'

type ThemeContextValue = {
  mode: ThemeMode
  accent: ThemeName
  toggleMode: () => void
  setMode: (mode: ThemeMode) => void
  setAccent: (accent: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStored<T extends string>(
  key: string,
  allowed: readonly T[],
  fallback: T,
): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (raw && (allowed as readonly string[]).includes(raw)) return raw as T
  } catch {
    /* localStorage may be unavailable (private mode); fall back silently. */
  }
  return fallback
}

/**
 * Applies the current mode + accent to the document root as data attributes.
 * The CSS layer (index.css) does the actual recolouring, so this is the single
 * source of truth for what the page looks like at any moment.
 */
function applyToDocument(accent: ThemeName, mode: ThemeMode) {
  const root = document.documentElement
  root.dataset.theme = accent
  root.dataset.themeMode = mode
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initial state is read from persisted values, but the *authoritative* first
  // paint is set by the inline no-flash script in index.html. We read whatever
  // it already applied off the DOM so React and the DOM never disagree.
  const [accent, setAccentState] = useState<ThemeName>(() => {
    const fromDom = document.documentElement.dataset.theme as ThemeName | undefined
    return fromDom ?? readStored(ACCENT_KEY, themeNameValues, activeTheme)
  })
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const fromDom = document.documentElement.dataset.themeMode as ThemeMode | undefined
    return fromDom ?? readStored(MODE_KEY, ['dark', 'light'] as const, 'light')
  })

  // Push state to the DOM whenever it changes (and persist).
  useEffect(() => {
    applyToDocument(accent, mode)
    try {
      window.localStorage.setItem(ACCENT_KEY, accent)
      window.localStorage.setItem(MODE_KEY, mode)
    } catch {
      /* ignore persistence failures */
    }
  }, [accent, mode])

  const setMode = useCallback((next: ThemeMode) => setModeState(next), [])
  const setAccent = useCallback((next: ThemeName) => setAccentState(next), [])
  const toggleMode = useCallback(
    () => setModeState((m) => (m === 'dark' ? 'light' : 'dark')),
    [],
  )

  return (
    <ThemeContext.Provider value={{ mode, accent, toggleMode, setMode, setAccent }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
