import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    server: {
      proxy: command === 'serve' ? {
        '/api': 'http://localhost:3001',
        '/uploads': 'http://localhost:3001'
      } : {}
    },
    build: {
      chunkSizeWarningLimit: 1000,
    }
  }
})
