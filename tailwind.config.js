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
        'primary-light': 'rgb(var(--color-primary-light-rgb, 8 145 178) / <alpha-value>)',
        'primary-light-hover': 'rgb(var(--color-primary-light-hover-rgb, 14 116 144) / <alpha-value>)',
        dark: 'rgb(var(--color-dark-rgb, 10 15 26) / <alpha-value>)',
        darker: 'rgb(var(--color-darker-rgb, 5 8 16) / <alpha-value>)',
        // Mode-aware semantic tokens (re-themed by [data-theme-mode]).
        accent: 'rgb(var(--color-accent-rgb, 0 212 255) / <alpha-value>)',
        'accent-hover': 'rgb(var(--color-accent-hover-rgb, 0 184 224) / <alpha-value>)',
        'on-accent': 'rgb(var(--color-on-accent-rgb, 5 8 16) / <alpha-value>)',
        surface: 'rgb(var(--color-surface-rgb, 5 8 16) / <alpha-value>)',
        'surface-alt': 'rgb(var(--color-surface-alt-rgb, 10 15 26) / <alpha-value>)',
        card: 'rgb(var(--color-card-rgb, 19 28 46) / <alpha-value>)',
        content: 'rgb(var(--color-content-rgb, 226 232 240) / <alpha-value>)',
        'content-soft': 'rgb(var(--color-content-soft-rgb, 203 213 225) / <alpha-value>)',
        'content-muted': 'rgb(var(--color-content-muted-rgb, 148 163 184) / <alpha-value>)',
        'content-faint': 'rgb(var(--color-content-faint-rgb, 100 116 139) / <alpha-value>)',
        border: 'rgb(var(--color-border-rgb, 51 65 85) / <alpha-value>)',
        'border-strong': 'rgb(var(--color-border-strong-rgb, 71 85 105) / <alpha-value>)',
        field: 'rgb(var(--color-field-rgb, 30 41 59) / <alpha-value>)',
        'field-hover': 'rgb(var(--color-field-hover-rgb, 51 65 85) / <alpha-value>)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
