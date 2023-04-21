import LoginVİewVue from '@/views/LoginVİew.vue'
import SignupViewVue from '@/views/SignupView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (from, to, next) => {
        const { isLoggedIn } = useUserStore()
        if (isLoggedIn) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginVİewVue,
      beforeEnter: (from, to, next) => {
        const { isLoggedIn } = useUserStore()
        if (isLoggedIn) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupViewVue,
      beforeEnter: (from, to, next) => {
        const { isLoggedIn } = useUserStore()
        if (isLoggedIn) {
          next('/')
        } else {
          next()
        }
      }
    }
  ]
})

export default router
