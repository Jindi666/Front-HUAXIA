// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import './assets/iconfont/iconfont'
import './assets/scss/style.scss'
// import dataV from '@jiaminghi/data-view'
// Vue.use(dataV)

// import 'lib-flexible/flexible.js'
// import '@/utils/viewport'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter
import i18n from './locales'
import echarts from 'echarts'
import 'vue-awesome/icons/chart-bar.js'
import 'vue-awesome/icons/chart-area.js'
import 'vue-awesome/icons/edit.js'
import 'vue-awesome/icons/chart-pie.js'
import 'vue-awesome/icons/chart-line.js'
import 'vue-awesome/icons/align-left.js'
import Icon from 'vue-awesome/components/Icon'
import dataV from '@jiaminghi/data-view'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.component('icon', Icon)
Vue.use(dataV)

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
