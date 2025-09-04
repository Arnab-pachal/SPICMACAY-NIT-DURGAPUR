import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Use 'dist' if deploying as a static site on Render
  },
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4000, // Let Render assign the port
    allowedHosts: [
      'spicmacay-nit-durgapur-chapter.onrender.com'
    ]
  },
  base: '/', 
})
