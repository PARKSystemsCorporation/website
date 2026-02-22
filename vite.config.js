import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        research: resolve(__dirname, 'research/index.html'),
        kira: resolve(__dirname, 'kira/index.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
});
