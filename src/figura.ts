import { useFavicon } from '@vueuse/core';
import { createVuetify } from 'vuetify';
import { md3 } from 'vuetify/blueprints';
import Index from './facies/index.vue';
import { createApp, type App } from 'vue';

useFavicon('/res/picta/favicon.png')

export default createVuetify({
  blueprint: md3,
  defaults: {
    global: {
      ripple: true,
      VBtn: { rounded: 'pill' },
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
      }, VSnackbar: {
        rounded: 'pill'
      }, VChip: {
        closeable: true,
        filter: true,
        pill: true,
        rounded: true,
        tile: true
      }, VTabsWindowItem: {
        transition: 'v-tab-transition'
      }
    }
  }
});

export const app: App = createApp(Index);
