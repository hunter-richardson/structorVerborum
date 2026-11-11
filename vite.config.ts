import {
  configDefaults,
  defineConfig,
  type ConfigEnv,
  type PluginOption,
  type UserConfig
} from 'vite-plus'
import VueDevTools from 'vite-plugin-vue-devtools'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import checker from 'vite-plugin-checker'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const operandi: boolean = mode === 'production'
  return {
    logLevel: operandi ? 'error' : 'info', //  TODO: development:warn after consistent builds
    resolve: { tsconfigPaths: true },
    css: { devSourcemap: !operandi },
    devtools: { apply: 'serve' },
    server: { open: true },
    publicDir: './res',
    plugins: [
      checker({ typescript: true }),
      vueJsx(),
      vue(),
      ...(operandi ? [] : [basicSsl(), VueDevTools()])
    ] as PluginOption[],
    test: {
      root: fileURLToPath(new URL('.', import.meta.url)),
      exclude: configDefaults.exclude,
      environment: 'jsdom'
    },
    build: {
      cssMinify: operandi ? 'lightningcss' : false,
      minify: operandi ? 'oxc' : false,
      sourcemap: !operandi,
      emptyOutDir: true,
      rolldownOptions: {
        output: {
          codeSplitting: false,
          entryFileNames: 'fascis.min.js',
          minify: operandi
            ? {
                mangle: {
                  reserved: [
                    'Sessio',
                    'Apices',
                    'UtendaU',
                    'Magnas',
                    'Assensus',
                    'Facies',
                    'Lingua',
                    'Separator',
                    'Actus',
                    'Adiectivum',
                    'Adverbium',
                    'Nomen',
                    'Numerale',
                    'Numeramen',
                    'Pronomen',
                    'Categoria',
                    'Casus',
                    'Factus',
                    'Genus',
                    'Gradus',
                    'Modus',
                    'Numerus',
                    'Persona',
                    'Referendus',
                    'Tempus',
                    'Vox'
                  ]
                }
              }
            : 'dce-only'
        }
      }
    }
  }
})
