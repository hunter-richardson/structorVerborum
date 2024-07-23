import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';
import checker from 'vite-plugin-checker';
import VueDevTools from 'vite-plugin-vue-devtools';
import { configDefaults, defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
/** @type {import ('vite').UserConfig} */
export default defineConfig({
  plugins: [
    checker({ typescript: true }),
    vue(), vueJsx(), VueDevTools(),
  ], resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  }, test: {
    environment: 'jsdom',
    exclude: [ ...configDefaults.exclude, 'e2e/**' ],
    root: fileURLToPath(new URL('./', import.meta.url))
  }
});
