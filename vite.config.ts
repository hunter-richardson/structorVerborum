import { configDefaults, ConfigEnv, defineConfig, PluginOption, UserConfig } from 'vite-plus'
import VueDevTools from 'vite-plugin-vue-devtools'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import checker from 'vite-plugin-checker'
import vue from '@vitejs/plugin-vue'

const figura = ({ mode }: ConfigEnv): UserConfig => {
  const operandi: boolean = mode === 'production'
  const minifaciendi = {
    vexillum: operandi ? 'oxc' : false,
    sistenda: operandi
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
      : {}
  }

  return {
    appType: 'mpa',
    logLevel: operandi ? 'error' : 'info', //  TODO: development:warn after consistent builds
    server: { open: true },
    publicDir: './res',
    build: {
      cssMinify: operandi ? 'lightningcss' : false,
      emptyOutDir: false,
      minify: minifaciendi.vexillum as false | 'oxc',
      sourcemap: !operandi,
      rolldownOptions: {
        output: {
          codeSplitting: false,
          entryFileNames: 'fascis.min.js',
          minify: minifaciendi.sistenda
        }
      }
    },
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
      tsconfigPaths: true
    },
    plugins: [
      checker({ typescript: true }),
      basicSsl(),
      vueJsx(),
      vue(),
      operandi ? [] : VueDevTools()
    ] as PluginOption[],
    test: {
      environment: 'jsdom',
      exclude: configDefaults.exclude,
      root: fileURLToPath(new URL('.', import.meta.url))
    },
    css: { devSourcemap: !operandi },
    devtools: { apply: 'serve' }
  }
}

export default defineConfig(figura)
