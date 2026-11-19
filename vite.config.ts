import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// A API Java não libera CORS. Em vez de chamar o Render direto do navegador,
// o front chama /api e o servidor (Vite aqui, Vercel em produção) repassa a
// requisição. Para o navegador, tudo fica na mesma origem.
const API_REMOTA = 'https://vem-ai-gs.onrender.com'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: API_REMOTA,
        changeOrigin: true,
        rewrite: (caminho) => caminho.replace(/^\/api/, ''),
      },
    },
  },
})
