import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Timeline from '../views/Timeline.vue'
import Timelist from '../views/Timelist.vue'
import Graph from '../views/Graph.vue'
import Editor from '../views/Editor.vue'
import Tutorial from '../views/Tutorial.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/timeline/:headline',
    name: 'Timeline',
    component: Timeline
  },
  {
    path: '/timelist',
    name: 'Timelist',
    component: Timelist
  },
  {
    path: '/graph',
    name: 'Graph',
    component: Graph
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor
  },
  {
    path: '/tutorial',
    name: 'Tutorial',
    component: Tutorial
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
