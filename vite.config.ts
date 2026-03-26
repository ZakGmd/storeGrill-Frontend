import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
   build: {
    rollupOptions: {
      input: {
        client: './src/entry-client.tsx',
        server: './src/entry-server.tsx'
      }
    }
  },
  ssr: {
    external: ['react', 'react-dom']
  }
})
