import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: '.', // Tells Vite the root is current folder
  build: {
    outDir: 'dist', // Output folder for build
    emptyOutDir: true // Clean before build
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // Optional: Shorthand import paths like @/components/...
    }
  },
  server: {
    port: 3000, // Optional: Dev server port
    open: true  // Automatically open browser on `npm run dev`
  }
});
