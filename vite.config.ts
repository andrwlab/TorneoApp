import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// if you're using TS:
export default defineConfig({
  plugins: [
    react({
      // tell the plugin to treat `.js` as JSX
      include: ['**/*.jsx', '**/*.tsx', '**/*.js'],
    }),
  ],
})
