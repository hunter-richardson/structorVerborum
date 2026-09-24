import { type App } from 'vue';
import { dominus } from './dominus';

export default {
  install: (app: App) => {
    app.config.globalProperties.$dominus = dominus
    app.provide('dominus', dominus)
  }
}
