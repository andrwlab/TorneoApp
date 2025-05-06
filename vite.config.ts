// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // include .js, .jsx, .ts, .tsx so Vite will transform them all as JSX/TSX
      include: [
        '**/*.js',
        '**/*.jsx',
        '**/*.ts',
        '**/*.tsx'
      ],
    }),
  ],
  resolve: {
    // optional but helps with imports:
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
});
