import fs from 'fs';
import i18next, { InitOptions } from 'i18next';
import FsBackend from 'i18next-fs-backend';
import yaml from 'js-yaml';
import path from 'path';
import './extensions/string';

const deTransferendo: InitOptions = {
  lng: 'la',
  initAsync: false,
  supportedLngs: [ 'en', 'la' ],
  nonExplicitSupportedLngs: false,
  ns: [ 'translation' ],
  saveMissing: true,
  load: 'languageOnly',
  backend: {
    loadPath: path.resolve('/res/loci/{{lng}}.yml'),
    addPath: path.resolve('/res/loci/{{lng}}.errata.yml'),
    parse: function (data: string) { return yaml.load(data) }
  }, parseMissingKeyHandler: (clavis: string): string => { return clavis },
  missingKeyHandler: (linguae: readonly string[], spatium: string, clavis: string, inhaesum: string = '') => {
    linguae.forEach(lingua => {
      if (spatium) clavis = `${spatium}:${clavis}`
      const linea: string = inhaesum ? `${clavis}: ${JSON.stringify(inhaesum)}` : `${clavis}: ""`
      fs.appendFileSync(path.resolve(`/res/loci/${lingua}.errata.yml`), linea)
    })
  }
}

i18next.use(FsBackend).init(deTransferendo)

i18next.services.formatter?.add('uppercase', (valor: string, _, __) => valor.toUpperCase())
i18next.services.formatter?.add('lowercase', (valor: string, _, __) => valor.toLowerCase())
i18next.services.formatter?.add('capitalize', (valor: string, _, __) => valor.capitalize())

export default i18next
