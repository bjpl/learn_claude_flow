import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/learn_claude_flow/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Optimize chunk size for better caching and loading
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunk splitting for optimal bundle size
        // Target: <200KB initial bundle, lazy load heavy dependencies
        manualChunks: (id) => {
          // Skip lucide-react - keep it in main bundle to prevent load order issues
          if (id.includes('node_modules/lucide-react')) {
            return undefined; // Keep in main bundle
          }

          // React core libraries (shared, ~140KB)
          // MUST be loaded first - other libraries depend on it
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'react-vendor';
          }

          // PDF viewer and dependencies (lazy loaded, ~350KB)
          // This is the HIGHEST PRIORITY optimization
          if (id.includes('node_modules/react-pdf') ||
              id.includes('node_modules/pdfjs-dist')) {
            return 'pdf-viewer';
          }

          // Search functionality (lazy loadable, ~50KB)
          if (id.includes('node_modules/fuse.js')) {
            return 'search-vendor';
          }

          // Routing (eager loaded with main bundle, ~30KB)
          if (id.includes('node_modules/react-router-dom') ||
              id.includes('node_modules/react-helmet-async')) {
            return 'router-vendor';
          }

          // State management (small, can be in main bundle)
          if (id.includes('node_modules/zustand')) {
            return 'state-vendor';
          }

          // UI utilities (moderate size, ~40KB)
          // Note: Removed ui-vendor chunk to prevent load order issues
          // clsx is small enough to include in vendor chunk

          // Keep other node_modules together
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimize output file naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Enable minification and tree-shaking
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      format: {
        comments: false, // Remove comments
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
