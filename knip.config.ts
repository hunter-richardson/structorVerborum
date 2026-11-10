import { defineConfig } from 'knip/config'

export default defineConfig({
  // plugins: { vue: true },
  ignoreDependencies: [
    'vite-plugin-vue-facing-decorator-hmr',
    'vue-unused-components-checker',
    '@8hobbies/typedoc-plugin-404',
    '@types/lodash.isequalwith',
    'typedoc-github-wiki-theme',
    'typedoc-plugin-mdn-links',
    'typedoc-plugin-coverage',
    'typedoc-plugin-markdown',
    'git-remote-origin-url',
    '@mxssfd/typedoc-theme',
    'typedoc-plugin-vue',
    'lodash.isequalwith',
    '@types/deep-equal',
    'amphtml-validator',
    'git-url-parse',
    'turbo-ts',
    'typedoc'
  ], //  TODO: remove
  entry: [
    './src/extensions/{array,env,error,string,{pleasejs,vue-shim}.d}.ts',
    './src/scriptura/{invenire.ts,quamHocErrat.fish}',
    './index.html',
    './.githooks/*'
  ],
  compilers: {
    json: (scriptum: string) => {
      const lectum = JSON.parse(scriptum)
      return typeof lectum.extends === 'string' ? `import ${lectum.extends};\n` : ''
    }
  },
  project: [
    './src/facies/{,tabulas/}*.vue',
    './.github/workflows/*.yml',
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
