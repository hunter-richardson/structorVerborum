import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import checker from 'vite-plugin-checker';
import VueDevTools from 'vite-plugin-vue-devtools';
import { configDefaults, defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
/** @type {import ('vite').UserConfig} */

export default defineConfig(({ mode }) => {
  const production: boolean = mode === 'production'
  return {
    build: {
      minify: false,
      publicDir: './res',
      sourcemap: !production
    }, plugins: [
      checker( { typescript: true }),
      vue(), vueJsx(), production ? [] : VueDevTools()
    ], resolve: {
      alias: { '@' : fileURLToPath(new URL('./src/', import.meta.url)) }
    }, test: {
      environment: 'jsdom',
      exclude: [ ...configDefaults.exclude, 'e2e/**' ],
      root: fileURLToPath(new URL('/', import.meta.url))
    }, css: {
      logLevel: production ? 'error' : 'info',  //  development:warn after consistent builds
      devSourcemap: !production,
      devTools: !production,
      appType: 'mpa',
      server: {
        open: true
      }
    }
  }
})
