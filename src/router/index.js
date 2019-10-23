import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Quizz from '../views/Quizz'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
