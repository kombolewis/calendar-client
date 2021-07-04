import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)


const routes = [

  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/auth/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/auth/Register')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next) => {
  let requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const isLoggedIn = store.getters.isLoggedIn

  if(requiresAuth && !isLoggedIn){
    next({name:'Login'})
  } else if(requiresAuth && isLoggedIn){
    next()
  }else{
    next()
  }
})


export default router
