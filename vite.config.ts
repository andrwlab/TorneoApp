// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/TorneoApp/',      // ← debe coincidir con tu repo
  plugins: [ react() ]
})