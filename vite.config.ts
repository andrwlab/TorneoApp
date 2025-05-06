// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/TorneoApp/',        // ← your repo name
  plugins: [
    react({
      include: ['src/**/*.{jsx,tsx,js,ts}']
    })
  ]
})
