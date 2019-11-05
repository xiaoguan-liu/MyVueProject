import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import baseInfo from './modules/baseInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    baseInfo
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
