// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 🎯 NEW: Set the default development server port to 5173
    port: 5173, 
    // OPTIONAL: If true, the server will error out if 5173 is busy, 
    // ensuring it never silently uses a different port.
    strictPort: true, 
    proxy: {
      // Proxy requests starting with '/api'
      '/api': {
        // Target is your backend URL
        target: 'http://localhost:3000',
        // Important: changes the Host header to match the target
        changeOrigin: true,
        // Optional: If your backend expects the path without '/api', use rewrite
        // rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
})