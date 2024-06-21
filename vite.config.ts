import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import VueDevTools from 'vite-plugin-vue-devtools';
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
/** @type {import ('vite').UserConfig} */
export default defineConfig({
  plugins: [
    checker({
      typescript: true
    }),
    vue(),
    vueJsx(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
