import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Quizz from '../views/Quizz'
import Admin from '../components/Admin'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/questionnaire',
    name: 'questionnaire',
    component: Quizz
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/admin/:id',
    name: 'quizz-result',
    component: Admin
  }
]

const router = new VueRouter({
  routes
})

export default router
