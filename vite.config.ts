import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import checker from 'vite-plugin-checker';
import VueDevTools from 'vite-plugin-vue-devtools';
import { configDefaults, defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
/** @type {import ('vite').UserConfig} */

export default defineConfig(({ mode }) => {
  const operandi: boolean = mode === 'production'
  const minifaciendi: {
    vexillum: operandi ? 'oxc' : false,
    sistenda: operandi ? {
      mangle: {
        reserved: [
          'Sessio', 'Apices', 'UtendaU', 'Magnas', 'Assensus', 'Facies', 'Lingua', 'Separator',
          'Categoria', 'Casus', 'Factus', 'Genus', 'Gradus', 'Modus',
          'Numerus', 'Persona', 'Referendus', 'Tempus', 'Vox'
        ]
      }
    } : {}
  }

  return {
    build: {
      cssMinify: operandi ? 'lightningcss' : false,
      minify: minifaciendi.vexillum,
      minifyOptions: minifaciendi.sistenda,
      publicDir: './res',
      sourcemap: !operandi,
      rolldownOptions: {
        output: {
          codeSplitting: false,
          entryFilenames: 'fascis.min.js',
          minify: minifaciendi.sistenda
        }
      }
    }, plugins: [
      checker( { typescript: true }),
      vue(), vueJsx(), operandi ? [] : VueDevTools()
    ], resolve: {
      alias: { '@' : fileURLToPath(new URL('./src/', import.meta.url)) }
    }, test: {
      environment: 'jsdom',
      exclude: [ ...configDefaults.exclude, 'e2e/**' ],
      root: fileURLToPath(new URL('/', import.meta.url))
    }, css: {
      logLevel: operandi ? 'error' : 'info',  //  development:warn after consistent builds
      devSourcemap: !operandi,
      devTools: !operandi,
      appType: 'mpa',
      server: {
        open: true
      }
    }
  }
})
