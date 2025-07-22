import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Permet de simuler __dirname dans ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',  // 👈 ajoute ceci pour rendre ton serveur visible sur le réseau local
    port: 5173        // (optionnel : pour forcer le port, sinon c’est déjà la valeur par défaut)
  }
})
