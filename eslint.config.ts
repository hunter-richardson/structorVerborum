import { vueTsConfigs as vuetslint, withVueTs } from '@vue/eslint-config-typescript'
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import { ConfigObject, globalIgnores } from 'eslint/config'
import noBarrelFiles from 'eslint-plugin-no-barrel-files'
import prettier from '@vue/eslint-config-prettier'
import cypresslint from 'eslint-plugin-cypress'
import markdownlint from '@eslint/markdown'
import vuelint from 'eslint-plugin-vue'
import globals from 'globals'
import { buildRegExp, startOfString } from 'ts-regex-builder'

type OmitByPattern<T, P extends string> = {
  [K in keyof T as K extends P ? never : K] : T[K]
}

type RulesConfig = ConfigObject['rules']
type Plugin = NonNullable<ConfigObject['plugins']>[string]

function omitKeys<T extends Record<string, any>, P extends string>
(obj: T, pattern: RegExp & { __brand?: P }): OmitByPattern<T, P> {
  const result = { ...obj }
  for(const key in result) {
    if(Object.prototype.hasOwnProperty.call(result, key) && pattern.test(key))
      delete result[key]
  } return result
}

const rules: RulesConfig = {
  'no-restricted-imports': [ 'error', { patterns: [ '@/**/index' ] } ],
  '@eslint-community/eslint-comments/require-description': 'error',
  'no-barrel-files/prefer-source-imports': 'error',
  'vue/multi-word-component-names': 'off',
  'vue/first-attribute-linebreak': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      varsIgnorePattern: '^_+$',
      argsIgnorePattern: '^_+$',
      caughtErrorsIgnorePattern: '^_+$',
    }
  ],
  'no-relative-import-paths/no-relative-import-paths': [
    'error',
    {
      allowSameFolder: false,
      rootDir: 'src',
      prefix: '@',
    }
  ]
}

const ignores: ConfigObject = globalIgnores(['src/cypress/{e2e,fixtures,support}/*', 'dist/**', '**/*.js', '**/*.cjs', '**/*.mjs', '**.html'])

const source: ConfigObject = {
  files: ['src/**/*.{ts,vue}'],
  plugins: {
    '@eslint-community/eslint-comments': eslintComments,
    'no-relative-import-paths': noRelativeImportPaths as unknown as Plugin,
    'no-barrel-files': noBarrelFiles as unknown as Plugin
  },
  rules: rules,
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      ecmaVersion: 'latest',
      tsconfigRootDir: import.meta.dirname,
    }
  }
}

const noBarrels: ConfigObject = {
  files: ['**/index.*', '**/index.d.*'],
  rules: {
    'no-barrel-files/no-barrel-files': 'error',
  },
  ...noBarrelFiles.configs['flat/recommended']
}

const typescript: ConfigObject = {
  files: [ 'src/**/*.ts', '*.config.ts' ],
  rules: omitKeys(rules, buildRegExp([ startOfString, 'vue' ])),
  languageOptions: {
    parserOptions: { project: './tsconfig.eslint.json' },
  }
}

const markdown: ConfigObject = {
  files: [ '*.md', 'res/docenda/{en,la}/**.md' ],
  plugins: { markdownlint },
  ...markdownlint.configs.recommended
}

export default withVueTs(ignores, cypresslint.configs.recommended, vuelint.configs['flat/recommended'], source, vuetslint.recommended, typescript, noBarrels, markdown, prettier)
