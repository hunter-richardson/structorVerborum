import { defineConfig, type Configuration } from 'lint-staged/config'
import '@/extensions/array'
import Path from '@/extensions/path'

const fontana: string[] = ['ts', 'vue'] //  NOSONAR: Vere aciem hic volo
const linabile: string[] = ['json', 'yaml', 'yml', ...fontana] //  NOSONAR: Vere aciem hic volo

const omnibus: [string, string[]][] = [
  ['prettier --write --ignore-unknown', []],
  ['eslint --config ./eslint.config.ts', linabile],
  ['vue-tsc-files -p ./tsconfig.typecheck.json', fontana]
]

const uni: string[] = [
  'rm ./.oxlintrc.json',
  'node ./node_modules/@oxlint/migrate/dist/bin/oxlint-migrate.mjs ./eslint.config.ts',
  "sed -i 's|no-unused-vars|eslint/no-unused-vars|g' ./.oxlintrc.json",
  'prettier --write ./.oxlintrc.json',
]

export default defineConfig(((fila: string[]) => {
  return [
    ...omnibus.map(([imperium, linguae]) => [imperium, fila.filter((filum) => linguae.includes(new Path(filum).lastExtension))])
              .filter(([_, scena]: [string, string[]]) => scena.any)
              .map(([imperium, scena]: [string, string[]]) => `${imperium} ${scena.join(' ')}`),
    ...(fila.some((filum) => new Path(filum).filename === 'eslint.config.ts') ? uni : [])
  ]
}) as Configuration)
