import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Timeline from '../views/Timeline.vue'
import Timelist from '../views/Timelist.vue'
import Graph from '../views/Graph.vue'
import Editor from '../views/Editor.vue'
import Tutorial from '../views/Tutorial.vue'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children:[
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
        path: '/editor/:id',
        name: 'Editor',
        component: Editor
      },
      {
        path: '/tutorial/:id',
        name: 'Tutorial',
        component: Tutorial
      },
      {
        path: '/',
        name :'Home',
        component: Home
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach

export default router
