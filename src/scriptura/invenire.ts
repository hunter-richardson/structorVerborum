import { parse } from 'jsonc-parser'
import { readdirSync } from 'node:fs'
import '@/extensions/array'

type Figura = { compilerOptions: { outDir: string } }
const figura: Figura = parse('@/tsconfig.json')
//  eslint-disable-next-line  security/detect-non-literal-fs-filename -- Filum validust
if (readdirSync(figura.compilerOptions.outDir).any) {
  console.log('::error title=aedificare::defectust')
  process.exit(1)
}
