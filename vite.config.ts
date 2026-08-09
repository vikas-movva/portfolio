import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site from /<repo-name>/, so we set the base path.
// Change this if the repo is renamed.
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
