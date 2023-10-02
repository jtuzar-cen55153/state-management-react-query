import { defineConfig } from 'vite';
import { dependencies } from './package.json';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://sambitsahoo.com/blog/vite-code-splitting-that-works.html
const renderChunks = (deps: Record<string, string>) => {
  let chunks = {};
  Object.keys(deps).forEach(key => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
          ...renderChunks(dependencies),
        },
      },
    },
  },
});
