// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // include .js files in JSX transform
      include: [
        '**/*.jsx',
        '**/*.tsx',
        '**/*.js'   // ← add this line
      ]
    })
  ],
})
