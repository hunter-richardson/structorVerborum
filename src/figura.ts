import { useFavicon } from '@vueuse/core';
import fs from 'fs';
import i18next from 'i18next';
import FsBackend from 'i18next-fs-backend';
import i18NextVue from 'i18next-vue';
import yaml from 'js-yaml';
import path from 'path';
import { createApp, type App } from 'vue';
import { createVuetify } from 'vuetify';
import { md3 } from 'vuetify/blueprints';
import './extensions/string';
import appositus from './facies/appositus.vue';

useFavicon('/res/picta/favicon.png')

const deTransferendo = {
  lng: 'la',
  initAsync: false,
  supportedLngs: [ 'en', 'la' ],
  nonExplicitSupportedLangs: false,
  ns: [ 'translation' ],
  saveMissing: true,
  load: 'languageOnly',
  interpolation: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    format(valor: string, forma: string, lingua: string) {
      switch(forma) {
        case  'uppercase': return String(valor).toUpperCase()
        case  'lowercase': return String(valor).toLowerCase()
        case 'capitalize': return String(valor).capitalize()
        default: return valor
      }
    }
  }, backend: {
    loadPath: path.resolve('/res/loci/{{lng}}.yml'),
    addPath: path.resolve('/res/loci/{{lng}}.errata.yml'),
    parse: function(data: string) { return yaml.load(data) }
  }, parseMissingKeyHandler: (clavis: string): string => { return clavis },
  missingKeyHandler: (linguae: string[], spatium: string, clavis: string, inhaesum: string = '') => {
    linguae.forEach(lingua => {
      if(spatium) clavis = `${spatium}:${clavis}`
      const linea: string = inhaesum ? `${clavis}: ${JSON.stringify(inhaesum)}` : `${clavis}: ""`
      fs.appendFileSync(path.resolve(`/res/loci/${lingua}.errata.yml`), linea)
    })
  }
}

await i18next.use(FsBackend).init(deTransferendo)

export const appositus: App<Element> =
    createApp(appositus as any)
      .use(i18NextVue, { i18next })
      .mount('#appositus')

export default createVuetify({
  blueprint: md3,
  defaults: {
    global: {
      VTabsWindowItem: { transition: 'v-tab-transition' },
      VSpeedDial: { position: 'absolute' },
      VSnackbar: { rounded: 'pill' },
      VBtn: { rounded: 'pill' },
      ripple: true,
      VNumberInput: {
        controlVariant: 'stacked',
        inset: true
      }, VBtnToggle: {
        rounded: true,
        tile: true
      }, VEmptyState: {
        height: '80%',
        width: '80%'
      }, VDataTableHeader: {
        align: 'start',
        sortable: true,
        sticky: true
      }, VDialog: {
        height: '80%',
        width: '80%',
        location: 'center',
        scrim: false,
        scrollable: true
      }, VChip: {
        closeable: true,
        filter: true,
        pill: true,
        rounded: true,
        tile: true
      }
    }
  }
})
