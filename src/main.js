import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import echarts from "echarts";
import Vuex from 'vuex'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
// use
Vue.use(MarkdownItVue)
Vue.use(mavonEditor)
Vue.use(Vuex)
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
//axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
