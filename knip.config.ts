import { defineConfig } from 'knip/config'

export default defineConfig({
  // plugins: { vue: true },
  ignoreDependencies: [
    '@8hobbies/typedoc-plugin-404',
    'typedoc-github-wiki-theme',
    'typedoc-plugin-mdn-links',
    'typedoc-plugin-markdown',
    '@mxssfd/typedoc-theme',
    'typedoc-plugin-vue',
    'typedoc'
  ],  //  TODO: remove after typedoc integration
  entry: [
    './src/extensions/{array,env,error,string,{pleasejs,vue-shim}.d}.ts',
    './src/scriptura/quamHocErrat.fish',
    './index.html',
    './.githooks/*'
  ],
  project: [
    './src/facies/{,tabulas/}*.vue',
    './.github/workflows/*.yml',
    './{*.config,src/**/*}.ts',
    './res/*'
  ],
  paths: {
    '@/*': ['./src/*'],
    '@res': ['./res']
  }
})
