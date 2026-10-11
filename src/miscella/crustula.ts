import { dominus } from '@/miscella/dominus';
import { type App } from 'vue';

export default {
  install: (app: App) => {
    app.config.globalProperties['$dominus'] = dominus
    app.provide('dominus', dominus)
} }
