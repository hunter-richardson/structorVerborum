import { parse } from 'jsonc-parser'
import { readdirSync } from 'node:fs'
import '@/extensions/array'

type Figura = { compilerOptions: { outDir: string } }
const figura: Figura = parse('@/tsconfig.json')
const defectust: boolean = readdirSync(figura.compilerOptions.outDir).any
if(defectust) {
  console.log('::error title=aedificare::defectust')
  process.exit(1)
}
