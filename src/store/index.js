import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import mutations from './mutations'

Vue.use(Vuex)
const state = () => {
  return {
    projectInfo: {
      menueDisable:true,
      projectName: '',
      projectInnerNum: '',
      projectOuterNum: ''
    }
  }
}

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  state,
  getters,
  mutations
})

export default store
