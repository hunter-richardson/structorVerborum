import { type PluginOptions as PrettierYamlOptions } from 'prettier-plugin-yaml'
import { type Config as PrettierOptions } from 'prettier'

type Options = PrettierOptions & PrettierYamlOptions
export default {
  bracketSameLine: true,
  bracketSpacing: true,
  checkIgnorePragma: true,
  endOfLine: 'lf',
  quoteProps: 'as-needed',
  printWidth: 100,
  proseWrap: 'never',
  semi: false,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  vueIndentScriptAndStyle: true,
  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      options: {
        singleQuote: false
      }
    }
  ],

  plugins: ['prettier-plugin-yaml'],
  yamlBlockStyle: 'folded',
  yamlCollectionStyle: 'block',
  yamlQuoteKeys: false
} satisfies Options
