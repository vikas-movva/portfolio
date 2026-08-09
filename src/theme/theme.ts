/**
 * Centralized theme configuration.
 *
 * To change the colour theme, edit the `activeTheme` line below to one of the
 * keys defined in `themes`. Each preset maps to a set of CSS custom properties
 * (see `themeTokens` and the `:root[data-theme="..."]` blocks in index.css).
 *
 * The CSS variables are what Tailwind reads (see tailwind.config.js), so both
 * build-time and runtime theme swaps work: change `activeTheme` to rebuild with
 * a new default, or set `data-theme="..."` on <html> to switch at runtime.
 */

export type ThemeName = 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose'

/** Tokens exposed as CSS custom properties. Keep in sync with index.css. */
export interface ThemeTokens {
  /** Main accent colour. Used for highlights, active nav, buttons, borders. */
  primary: string
  /** Slightly darker primary, used for hover states. */
  'primary-hover': string
  /** Dark base background (body / cards). */
  dark: string
  /** Even darker background (alternating sections, scrollbar track). */
  darker: string
}

export const themes: Record<ThemeName, ThemeTokens> = {
  cyan: {
    primary: '#00d4ff',
    'primary-hover': '#00b8e0',
    dark: '#0a0f1a',
    darker: '#050810',
  },
  violet: {
    primary: '#a78bfa',
    'primary-hover': '#8b5cf6',
    dark: '#0f0a1a',
    darker: '#0a0510',
  },
  emerald: {
    primary: '#34d399',
    'primary-hover': '#10b981',
    dark: '#0a1a14',
    darker: '#05100b',
  },
  amber: {
    primary: '#fbbf24',
    'primary-hover': '#f59e0b',
    dark: '#1a140a',
    darker: '#100c05',
  },
  rose: {
    primary: '#fb7185',
    'primary-hover': '#f43f5e',
    dark: '#1a0a0e',
    darker: '#100507',
  },
}

/**
 * The theme used when the page first loads. Change this single line to
 * retheme the whole site. To switch themes at runtime instead, set
 * `document.documentElement.dataset.theme = 'violet'` (or any ThemeName).
 */
export const activeTheme: ThemeName = 'cyan'

/** human-readable label for each theme — used if you build a theme picker UI. */
export const themeLabels: Record<ThemeName, string> = {
  cyan: 'Cyan',
  violet: 'Violet',
  emerald: 'Emerald',
  amber: 'Amber',
  rose: 'Rose',
}
