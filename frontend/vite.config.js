import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: {
      overlay: false, // Disable error overlay
    },
    port: 5173, // optional, ensures same port
    // 👇 this makes sure unknown routes fallback to index.html in dev
    historyApiFallback: true 
  },
  preview: {
    port: 5000, // when running vite preview
    strictPort: true,
  },
  build: {
    outDir: 'dist',
  },
  base: '/', // important for routing
})
