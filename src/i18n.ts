import i18next, { type InitOptions } from 'i18next'
import FsBackend from 'i18next-fs-backend'
import { appendFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { load } from 'js-yaml'
import '@/extensions/string'

const deTransferendo: InitOptions = {
  lng: 'la',
  initAsync: false,
  supportedLngs: ['en', 'la'],
  nonExplicitSupportedLngs: false,
  ns: ['translation'],
  saveMissing: true,
  load: 'languageOnly',
  backend: {
    loadPath: resolve('@res/loci/{{lng}}.yml'),
    addPath: resolve('@res/loci/{{lng}}.errata.yml'),
    parse: function (data: string) {
      return load(data)
    }
  },
  parseMissingKeyHandler: (clavis: string): string => {
    return clavis
  },
  missingKeyHandler: (
    linguae: readonly string[],
    spatium: string,
    clavis: string,
    inhaesum: string = ''
  ) => {
    linguae.forEach((lingua) => {
      if (spatium) clavis = `${spatium}:${clavis}`
      const linea: string = inhaesum ? `${clavis}: ${JSON.stringify(inhaesum)}` : `${clavis}: ""`
      //  eslint-disable-next-line security/detect-non-literal-fs-filename -- Hoc filum validust
      appendFileSync(resolve('@/res/loci', `${lingua}.errata.yml`), linea)
    })
  }
}

await i18next.use(FsBackend).init(deTransferendo)

i18next.services.formatter?.add('uppercase', (valor: string, _, __) => valor.uppercase)
i18next.services.formatter?.add('lowercase', (valor: string, _, __) => valor.lowercase)
i18next.services.formatter?.add('capitalize', (valor: string, _, __) => valor.capitalized)

export default i18next
