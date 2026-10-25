import eslintComments from '@eslint-community/eslint-plugin-eslint-comments';
import { vueTsConfigs as vuetslint, withVueTs } from '@vue/eslint-config-typescript';
import cypresslint from 'eslint-plugin-cypress';
import vuelint from 'eslint-plugin-vue';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';

const source = {
  files: [ 'src/**/*.{ts,vue}' ],
  plugins: { '@eslint-community/eslint-comments': eslintComments },
  ignores: [
    'src/cypress/{e2e,fixtures,support}/*',
    'src/**/*.js'
  ], languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node
    }, parserOptions: {
      ecmaVersion: 'latest',
      tsconfigRootDir: import.meta.dirname
    }
  }, rules: {
    'vue/html-quotes': [ 'error', 'single', { 'avoidEscape': true } ],
    '@eslint-community/eslint-comments/require-description': 'error',
    '@typescript-eslint/no-useless-empty-export': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'typescript/no-useless-empty-export': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error', {
        varsIgnorePattern: '^_+$',
        argsIgnorePattern: '^_+$',
        caughtErrorsIgnorePattern: '^_+$'
      }
    ]
  }
}

const typescript = {
  files: [ 'src/**/*.ts' ],
  ignores: [
    'src/cypress/{e2e,fixtures,support}/*',
    'src/**/*.js'
  ], languageOptions: {
    parserOptions:
      { project: './tsconfig.eslint.json' }
  }
}

const ignores = globalIgnores([
  'src/cypress/{e2e,fixtures,support}/*',
  '**/*.js', '**/*.cjs', '**/*.mjs'
])

export default withVueTs(
  ignores,
  cypresslint.configs.recommended,
  vuelint.configs['flat/recommended'],
  vuetslint.recommended, source, typescript
)
