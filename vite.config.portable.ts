import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Build "portátil": gera um único arquivo HTML autocontido (JS/CSS embutidos),
// que abre com duplo clique em qualquer computador via file://, sem servidor
// e sem instalar nada. Usado para distribuir o jogo por e-mail/pendrive.
// https://vite.dev/config/
export default defineConfig({
  base: './',
  publicDir: false,
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-portatil',
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
  },
})
