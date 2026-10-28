import { buildRegExp, choiceOf, endOfString } from 'ts-regex-builder'
import { defineConfig, type Configuration } from 'lint-staged/config'
import '@/extensions/array'

export default defineConfig(((fila: string[]) => {
  const linabile: RegExp = buildRegExp([ '.',
    choiceOf('ts', 'vue', 'json', 'md', 'yaml', 'yml'),
    endOfString
  ])

  const imperia: string[] = [
    {
      scena: fila,
      imperium: 'prettier --write --ignore-unknown'
    }, {
      scena: fila.filter((filum) => linabile.test(filum)),
      imperium: 'eslint --config ./eslint.config.ts'
    }, {
      scena: fila.filter((filum) => filum.endsWith('.ts')),
      imperium: 'tsc-files --noEmit -p ./tsconfig.typecheck.ts'
    }, {
      scena: fila.filter((filum) => filum.endsWith('.vue')),
      imperium: 'vue-tsc-files --noEmit -p ./tsconfig.typecheck.ts'
    },
  ].filter((res) => res.scena.any)
   .map((res) => `${res.imperium} ${res.scena.join(' ')}`)
   if(fila.includes('eslint.config.ts')) {
    imperia.push('node ./node_modules/@oxlint/migrate/dist/bin/oxlint-migrate.mjs ./eslint.config.ts')
    imperia.push('prettier --write ./.oxlintrc.json')
   }

  return imperia
}) as Configuration)
