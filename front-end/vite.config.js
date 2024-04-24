import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

defineConfig({
  plugins: [
    react({
      include: "**/*.tsx",
    }),
  ],          
  hmr: { overlay: false }, 
  watch: {
    usePolling: true
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
