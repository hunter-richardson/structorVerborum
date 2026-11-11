import { readFileSync, readdirSync } from 'node:fs'
import { parse } from 'jsonc-parser'
import '@/extensions/array'

type Figura = { compilerOptions: { outDir: string } }
const figura: Figura = parse(readFileSync('@/tsconfig.json', 'utf8'))
//  eslint-disable-next-line  security/detect-non-literal-fs-filename -- Filum validust
if (readdirSync(figura.compilerOptions.outDir).any) {
  console.log('::error title=aedificare::defectust')
  process.exit(1)
}
