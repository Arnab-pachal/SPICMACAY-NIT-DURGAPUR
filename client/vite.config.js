import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // ✅ use Vite default for Vercel
  },
  css: {
    postcss: './postcss.config.js',
  },
  base: './', // ✅ ensures assets load correctly after deploy
})
