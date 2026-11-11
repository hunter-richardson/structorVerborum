import { defineConfig, type Configuration } from 'lint-staged/config'
import Path from '@/extensions/path'
import '@/extensions/array'

const fontana: string[] = ['ts', 'vue'] //  NOSONAR: Vere aciem hic volo
const lineabile: string[] = ['json', 'yaml', 'yml', ...fontana] //  NOSONAR: Vere aciem hic volo

const omnibus: [string, string[]][] = [
  ['prettier --write --ignore-unknown', []],
  ['eslint --config ./eslint.config.ts', lineabile],
  ['vue-tsc-files -p ./tsconfig.typecheck.json', fontana]
]

const lineatori: string[] = [
  'rm ./.oxlintrc.json',
  'node ./node_modules/@oxlint/migrate/dist/bin/oxlint-migrate.mjs ./eslint.config.ts',
  "sed -i 's|no-unused-vars|eslint/no-unused-vars|g' ./.oxlintrc.json",
  'prettier --write ./.oxlintrc.json'
]

const insigniendo: string[] = ['npx tsx ./src/scriptura/insignia.ts']

export default defineConfig(((fila: string[]) => {
  return [
    ...(
      omnibus.map(([imperium, linguae]) => [
        imperium,
        fila.filter((filum) => linguae.includes(new Path(filum).lastExtension))
      ]) as [string, string[]][]
    )
      .filter(([, scena]) => scena.any)
      .map(([imperium, scena]) => `${imperium} ${scena.join(' ')}`),
    ...(fila.some((filum) => new Path(filum).filename === 'eslint.config.ts') ? lineatori : []),
    ...(fila.some((filum) => ['README.md', 'insignia.ts'].includes(new Path(filum).filename)) ? insigniendo : [])
    //  TODO: 'knip'
  ]
}) as Configuration)
