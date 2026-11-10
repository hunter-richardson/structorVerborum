import { createRouter, createWebHistory } from 'vue-router'
import { createApp, type App } from 'vue'
import { useFavicon } from '@vueuse/core'
import { md3 } from 'vuetify/blueprints'
import { createVuetify } from 'vuetify'
import i18NextVue from 'i18next-vue'
import Crustula from '@/miscella/crustula'
import Appositus from '@/facies/appositus.vue'
import Vacuum from '@/facies/vacuum.vue'
import translation from '@/extensions/i18next'
import i18next from '@/i18n'
import '@/extensions/string'

useFavicon('@res/picta/favicon.png')

export const appositus: App<Element> = createApp(Appositus)
  .use(i18NextVue, { i18next })
  .use(Crustula)
  .use(
    createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/index',
          name: 'Appositus',
          component: Appositus
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'Vacuum',
          component: Vacuum
        }
      ]
    })
  )

appositus.config.globalProperties['$tf'] = translation().tf

appositus.mount('#appositus')

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
      },
      VBtnToggle: {
        rounded: true,
        tile: true
      },
      VEmptyState: {
        height: '80%',
        width: '80%'
      },
      VDataTableHeader: {
        align: 'start',
        sortable: true,
        sticky: true
      },
      VDialog: {
        height: '80%',
        width: '80%',
        location: 'center',
        scrim: false,
        scrollable: true
      },
      VChip: {
        closeable: true,
        filter: true,
        pill: true,
        rounded: true,
        tile: true
      }
    }
  }
})
