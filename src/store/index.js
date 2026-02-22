import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import i18n from './modules/i18n'
import environment from './modules/environment'
import systemConfig from './modules/systemConfig.js'
import agreement from './modules/agreement'
import getters from './getters'
import msgTotal from './modules/messageCount'
import dataVUser from './modules/dataVUser'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    i18n,
    environment,
    systemConfig,
    agreement,
    msgTotal,
    dataVUser
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
