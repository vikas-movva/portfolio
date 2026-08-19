/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // RGB-triplet bridge: each token is `rgb(var(--name-rgb) / <alpha-value>)`
        // so Tailwind can apply opacity modifiers (bg-primary/10, surface/95, ...).
        // Values come from the :root blocks in src/index.css.
        primary: 'rgb(var(--color-primary-rgb, 0 212 255) / <alpha-value>)',
        'primary-hover': 'rgb(var(--color-primary-hover-rgb, 0 184 224) / <alpha-value>)',
        'primary-light': 'rgb(var(--color-primary-light-rgb, 0 135 161) / <alpha-value>)',
        'primary-light-hover': 'rgb(var(--color-primary-light-hover-rgb, 0 110 135) / <alpha-value>)',
        dark: 'rgb(var(--color-dark-rgb, 20 20 20) / <alpha-value>)',
        darker: 'rgb(var(--color-darker-rgb, 10 10 10) / <alpha-value>)',
        // Mode-aware semantic tokens (re-themed by [data-theme-mode]).
        accent: 'rgb(var(--color-accent-rgb, 0 212 255) / <alpha-value>)',
        'accent-hover': 'rgb(var(--color-accent-hover-rgb, 0 184 224) / <alpha-value>)',
        'on-accent': 'rgb(var(--color-on-accent-rgb, 20 20 20) / <alpha-value>)',
        surface: 'rgb(var(--color-surface-rgb, 250 247 242) / <alpha-value>)',
        'surface-alt': 'rgb(var(--color-surface-alt-rgb, 240 236 229) / <alpha-value>)',
        card: 'rgb(var(--color-card-rgb, 255 255 255) / <alpha-value>)',
        content: 'rgb(var(--color-content-rgb, 20 20 20) / <alpha-value>)',
        'content-soft': 'rgb(var(--color-content-soft-rgb, 58 58 58) / <alpha-value>)',
        'content-muted': 'rgb(var(--color-content-muted-rgb, 118 118 118) / <alpha-value>)',
        'content-faint': 'rgb(var(--color-content-faint-rgb, 162 162 162) / <alpha-value>)',
        border: 'rgb(var(--color-border-rgb, 20 20 20) / <alpha-value>)',
        'border-strong': 'rgb(var(--color-border-strong-rgb, 20 20 20) / <alpha-value>)',
        'border-soft': 'rgb(var(--color-border-soft-rgb, 228 226 221) / <alpha-value>)',
        field: 'rgb(var(--color-field-rgb, 255 255 255) / <alpha-value>)',
        'field-hover': 'rgb(var(--color-field-hover-rgb, 245 243 239) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Anton', '"Arial Narrow"', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        roles: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}