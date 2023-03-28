import LoginVİewVue from '@/views/LoginVİew.vue'
import SignupViewVue from '@/views/SignupView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      component: LoginVİewVue
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupViewVue
    }
  ]
})

export default router
