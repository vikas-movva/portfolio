/**
 * Centralized theme configuration.
 *
 * There are TWO independent theme axes:
 *
 *  1. Accent colour (`ThemeName`): cyan | violet | emerald | amber | rose.
 *     Each maps to a set of CSS custom properties (see `themeTokens` and the
 *     `:root[data-theme="..."]` blocks in index.css). Pickable at runtime via
 *     the theme picker UI.
 *
 *  2. Light / dark mode (`ThemeMode`): 'dark' | 'light'. Toggled at runtime via
 *     the sun/moon button. Drives the `--color-surface`, `--color-text`,
 *     `--color-muted`, `--color-border` variables and the accent shades used in
 *     light mode (see index.css `[data-theme-mode="light"]`).
 *
 * Tailwind reads the CSS variables (see tailwind.config.js), so both axes work
 * at runtime: set `data-theme` and `data-theme-mode` on <html> to switch live.
 */

export type ThemeName = 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose'

/** Visual mode. Orthogonal to the accent colour above. */
export type ThemeMode = 'dark' | 'light'

/** Tokens exposed as CSS custom properties. Keep in sync with index.css. */
export interface ThemeTokens {
  /** Main accent colour. Used for highlights, active nav, buttons, borders. */
  primary: string
  /** Slightly darker primary, used for hover states (dark mode). */
  'primary-hover': string
  /** Dark base background (body / cards) in dark mode. */
  dark: string
  /** Even darker background (alternating sections, scrollbar track) in dark mode. */
  darker: string
  /** Lighter accent, used for text/fills on light backgrounds in light mode. */
  'primary-light': string
  /** Hover shade of `primary-light`. */
  'primary-light-hover': string
}

export const themes: Record<ThemeName, ThemeTokens> = {
  cyan: {
    primary: '#00d4ff',
    'primary-hover': '#00b8e0',
    dark: '#0a0f1a',
    darker: '#050810',
    'primary-light': '#0369a1', // cyan-700: WCAG AA on slate-200
    'primary-light-hover': '#025482', // cyan-800
  },
  violet: {
    primary: '#a78bfa',
    'primary-hover': '#8b5cf6',
    dark: '#0f0a1a',
    darker: '#0a0510',
    'primary-light': '#6d28d9', // violet-700
    'primary-light-hover': '#5b21b6', // violet-800
  },
  emerald: {
    primary: '#34d399',
    'primary-hover': '#10b981',
    dark: '#0a1a14',
    darker: '#05100b',
    'primary-light': '#047857', // emerald-700
    'primary-light-hover': '#065f46', // emerald-800
  },
  amber: {
    primary: '#fbbf24',
    'primary-hover': '#f59e0b',
    dark: '#1a140a',
    darker: '#100c05',
    'primary-light': '#b45309', // amber-700 (600 too light on white)
    'primary-light-hover': '#92400e', // amber-800
  },
  rose: {
    primary: '#fb7185',
    'primary-hover': '#f43f5e',
    dark: '#1a0a0e',
    darker: '#100507',
    'primary-light': '#be123c', // rose-700
    'primary-light-hover': '#9f1239', // rose-800
  },
}

/**
 * The accent colour used when the page first loads. Change this single line to
 * retheme the whole site default. To switch accents at runtime instead, the
 * theme picker sets `document.documentElement.dataset.theme = 'violet'`.
 */
export const activeTheme: ThemeName = 'cyan'

/** human-readable label for each theme — used by the theme picker UI. */
export const themeLabels: Record<ThemeName, string> = {
  cyan: 'Cyan',
  violet: 'Violet',
  emerald: 'Emerald',
  amber: 'Amber',
  rose: 'Rose',
}

/** Stable, predictable order for rendering the accent picker swatches. */
export const themeOrder: ThemeName[] = ['cyan', 'violet', 'emerald', 'amber', 'rose']
