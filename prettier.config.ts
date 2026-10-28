import { type PluginOptions as PrettierYamlOptions } from 'prettier-plugin-yaml'
import { type Config as PrettierOptions } from 'prettier'
type Options = PrettierOptions & PrettierYamlOptions
export default {
  bracketSameLine: true,
  bracketSpacing: true,
  checkIgnorePragma: true,
  endOfLine: 'lf',
  quoteProps: 'as-needed',
  printWidth: 10000,
  semi: false,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  vueIndentScriptAndStyle: true,

  plugins: [ 'prettier-plugin-yaml' ],
  yamlBlockStyle: 'folded',
  yamlCollectionStyle: 'block',
  yamlQuoteKeys: false,
  yamlQuoteValues: false
} satisfies Options
