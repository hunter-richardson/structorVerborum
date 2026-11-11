import { defineConfig } from 'knip/config'

export default defineConfig({
  'vite-plus': false,
  ignoreDependencies: [
    'vite-plugin-vue-facing-decorator-hmr',
    'vue-unused-components-checker',
    '@8hobbies/typedoc-plugin-404',
    '@types/lodash.isequalwith',
    'typedoc-github-wiki-theme',
    'typedoc-plugin-mdn-links',
    'typedoc-plugin-coverage',
    'typedoc-plugin-markdown',
    '@mxssfd/typedoc-theme',
    'vue-facing-decorator',
    'typedoc-plugin-vue',
    'lodash.isequalwith',
    '@types/deep-equal',
    'amphtml-validator',
    'turbo-ts',
    'typedoc'
  ], //  TODO: remove
  entry: [
    './src/extensions/{array,env,error,string,{pleasejs,vue-shim}.d}.ts',
    './src/scriptura/{invenire.ts,quamHocErrat.fish}',
    './vite.config.ts',
    './.githooks/*',
    './index.html'
  ],
  compilers: {
    json: (scriptum: string) => {
      const lectum = JSON.parse(scriptum)
      return typeof lectum.extends === 'string' ? `import ${lectum.extends}\n` : ''
    }
  },
  project: [
    './src/facies/{,tabulas/}*.vue',
    './{*.config,src/**/*}.ts',
    './tsconfig.*.json',
    './res/**'
  ],
  ignore: ['./.oxlintrc.json', './src/scriptura/invenire.ts'],
  paths: {
    '@/*': ['./src/*'],
    '@res': ['./res']
  },
  rules: {
    dependencies: 'warn',
    enumMembers: 'warn',
    unresolved: 'warn',
    duplicates: 'warn',
    exports: 'warn',
    files: 'warn',
    types: 'warn'
  }
})
