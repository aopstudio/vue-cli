import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keyword:"0",
    logged:false,
    isAdmin:false,
    isRoot:false
  },
  mutations: {
    login (state, n) {
      state.logged = n
    },
    admin (state,n){
      state.isAdmin = n
    },
    root (state,n){
      state.isRoot=n
    }
    
  },
  actions: {
  },
  modules: {
  }
})
