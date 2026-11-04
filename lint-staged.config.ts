import { defineConfig, type Configuration } from 'lint-staged/config'
import '@/extensions/array'
import Path from '@/extensions/path'

const fontana: string[] = ['ts', 'vue'] //  NOSONAR: Vere aciem hic volo
const linabile: string[] = ['json', 'yaml', 'yml', ...fontana] //  NOSONAR: Vere aciem hic volo

function seligantur(fila: string[], linguae: string[]): string[] {
  return linguae.any ? fila.filter((filum) => linguae.includes(new Path(filum).lastExtension)) : fila
}

const imperia: [string, string[]][] = [
  ['prettier --write --ignore-unknown', []],
  ['eslint --config ./eslint.config.ts', linabile],
  ['vue-tsc-files -p ./tsconfig.typecheck.json', fontana]
]

export default defineConfig(((fila: string[]) => {
  return [
    ...imperia
      .map(([imperium, scena]) => [imperium, seligantur(fila, scena)])
      .filter(([_, scena]: [string, string[]]) => scena.any)
      .map(([imperium, scena]: [string, string[]]) => `${imperium} ${scena.join(' ')}`),
    ...(fila.includes('eslint.config.ts') ? ['node ./node_modules/@oxlint/migrate/dist/bin/oxlint-migrate.mjs ./eslint.config.ts', 'prettier --write ./.oxlintrc.json'] : [])
  ]
}) as Configuration)
