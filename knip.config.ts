import { defineConfig } from 'knip/config'

export default defineConfig({
  'vite-plus': false,
  typescript: {
    config: ['./tsconfig.*.json']
  },
  ignoreDependencies: [
    'vite-plugin-vue-facing-decorator-hmr',
    'vue-unused-components-checker',
    '@types/lodash.isequalwith',
    'vue-facing-decorator',
    'lodash.isequalwith',
    '@types/deep-equal',
    'amphtml-validator',
    'turbo-ts'
  ], //  TODO: remove
  entry: [
    './src/extensions/{array,env,error,string,{pleasejs,vue-shim}.d}.ts',
    './src/scriptura/{insignia.ts,invenire.sh,quamHocErrat.fish}',
    './.github/workflows/*.yml',
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
  ignore: ['./src/scriptura/expedire.sh', './.{vscode,sonarlint}/*', './.oxlintrc.json'],
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
