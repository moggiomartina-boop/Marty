import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativa: la build funziona su qualsiasi hosting statico (Netlify, Vercel, GitHub Pages…)
export default defineConfig({
  plugins: [react()],
  base: './',
});
