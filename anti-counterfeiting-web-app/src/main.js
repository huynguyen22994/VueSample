// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import i18next from 'i18next'
import VueI18Next from '@panter/vue-i18next'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import App from './App'
import router from './router/index'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import English from '@/translate/en.js'
import VietNamese from '@/translate/vi.js'

const locales = {
  en: English,
  vi: VietNamese
}

Vue.use(BootstrapVue)
Vue.use(VueI18Next)
Vue.use(VueLodash, lodash)

i18next.init({
  lng: 'en',
  resources: {
    en: { translation: locales.en },
    vi: { translation: locales.vi }
  }
})

const i18n = new VueI18Next(i18next)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  i18n: i18n
})
