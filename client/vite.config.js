import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { SITE_URL } from './src/seo/seoConfig.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'kundu-site-url',
      transformIndexHtml(html) {
        return html.replaceAll('__SITE_URL__', SITE_URL.replace(/\/+$/, ''));
      },
    },
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || ''),
  },
});
