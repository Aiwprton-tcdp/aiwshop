import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.includes('-')
        }
      }
    }),
    alias(),
  ],
  server: {
    hmr: {
      overlay: false,
    }
  },
  resolve: {
    alias: {
      "@": resolve(resolve(__dirname), './src'),
    },
  },
})
