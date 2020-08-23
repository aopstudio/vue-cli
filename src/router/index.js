import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateArticle from '../views/CreateArticle.vue'
import Tutorial from '../views/Tutorial.vue'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Manage from '../views/Manage.vue'
import Password from '../views/Password.vue'
import Info from '../views/Info.vue'
import Role from '../views/Role.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children:[
      {
        path: '/createArticle',
        name: 'CreateArticle',
        component: CreateArticle
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
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage,
    redirect: '/password',
    children:[
      {
        path: '/info',
        name: 'Info',
        component: Info
      },
      {
        path: '/password',
        name: 'Password',
        component: Password
      },
      {
        path: 'changeRole',
        name: 'Role',
        component: Role
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach

export default router
