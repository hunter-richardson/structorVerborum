import { vueTsConfigs as vuetslint, withVueTs } from '@vue/eslint-config-typescript'
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import { buildRegExp, startOfString } from 'ts-regex-builder'
import { ConfigObject, globalIgnores } from 'eslint/config'
import noBarrelFiles from 'eslint-plugin-no-barrel-files'
import prettierlint from '@vue/eslint-config-prettier'
import cypresslint from 'eslint-plugin-cypress'
import security from 'eslint-plugin-security'
import markdownlint from '@eslint/markdown'
import ymllint from 'eslint-plugin-yml'
import vuelint from 'eslint-plugin-vue'
import globals from 'globals'

type OmitByPattern<T, P extends string> = {
  [K in keyof T as K extends P ? never : K]: T[K]
}

type RulesConfig = ConfigObject['rules']
type Plugin = NonNullable<ConfigObject['plugins']>[string]

function omitKeys<T extends Record<string, unknown>, P extends string>(obj: T, pattern: RegExp & { __brand?: P }): OmitByPattern<T, P> {
  const result = { ...obj }
  for (const key in result) {
    //  eslint-disable-next-line security/detect-object-injection -- key is verified
    if (key in result && pattern.test(key)) delete result[key]
  }
  return result
}

const rules: RulesConfig = {
  'no-restricted-imports': ['error', { patterns: ['@/**/index'] }],
  '@eslint-community/eslint-plugin-eslint-comments/require-description': 'error',
  'no-barrel-files/prefer-source-imports': 'error',
  'vue/multi-word-component-names': 'off',
  'vue/first-attribute-linebreak': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      varsIgnorePattern: '^_+$',
      argsIgnorePattern: '^_+$',
      caughtErrorsIgnorePattern: '^_+$'
    }
  ],
  'no-relative-import-paths/no-relative-import-paths': [
    'error',
    {
      allowSameFolder: false,
      rootDir: 'src',
      prefix: '@'
    }
  ]
}

const ignores: ConfigObject = globalIgnores(['src/cypress/{e2e,fixtures,support}/*', 'res/loci/{en,la}.errata.yml', 'pnpm-lock.yaml', 'dist/**', '**/*.js', '**/*.cjs', '**/*.mjs', '**.html'])

const source: ConfigObject = {
  files: ['{,src/**}/*.{ts,vue}'],
  plugins: {
    '@eslint-community/eslint-plugin-eslint-comments': eslintComments,
    'no-relative-import-paths': noRelativeImportPaths as unknown as Plugin,
    'no-barrel-files': noBarrelFiles as unknown as Plugin
  },
  rules: rules,
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node
    },
    parserOptions: {
      ecmaVersion: 'latest',
      tsconfigRootDir: import.meta.dirname
    }
  }
}

const noBarrels: ConfigObject = {
  files: ['**/index{,.d}.*'],
  plugins: {
    'no-barrel-files': noBarrelFiles as unknown as Plugin
  },
  rules: {
    'no-barrel-files/no-barrel-files': 'error'
  }
}

const typescript: ConfigObject = {
  files: ['{*.config,src/**/*}.ts'],
  plugins: {
    '@eslint-community/eslint-plugin-eslint-comments': eslintComments,
    'no-relative-import-paths': noRelativeImportPaths as unknown as Plugin,
    'no-barrel-files': noBarrelFiles as unknown as Plugin
  },
  rules: omitKeys(rules, buildRegExp([startOfString, 'vue'])),
  languageOptions: {
    parserOptions: {
      tsConfigRootDir: import.meta.dirname,
      projectService: {
        allowDefaultProject: [
          'src/cypress/{a_capite_ad_caupam,componenta}/*.ts'
          // 'src/cypress/componenta/*.ts'
        ]
      }
    }
  }
}

const vue: ConfigObject[] = vuelint.configs['flat/recommended'].map((config: ConfigObject) => ({
  files: config.files ?? ['src/**/*.vue'],
  ...config
}))

const markdown: ConfigObject[] = markdownlint.configs.recommended.map((config) => ({
  files: ['{,res/docenda/{en,la}}/*.md'],
  ...config
}))

const prettier: ConfigObject = {
  files: ['{,**/}*.{ts,vue,yaml,yml}'],
  ...prettierlint
}

export default withVueTs(...vue, ...markdown, ...ymllint.configs['flat/standard'], vuetslint.recommended, cypresslint.configs.recommended, security.configs.recommended, ignores, source, typescript, noBarrels, prettier)
