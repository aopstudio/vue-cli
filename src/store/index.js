import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keyword:"0",
    logged:false
  },
  mutations: {
    login (state, n) {
      state.logged = n
    },
    
  },
  actions: {
  },
  modules: {
  }
})
