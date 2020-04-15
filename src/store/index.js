import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keyword:"0"
  },
  mutations: {
    submit (state, n) {
      state.keyword = n
    }
  },
  actions: {
  },
  modules: {
  }
})
