import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

type User = {
  username: String | null
  email: String | null
}

export const useUserStore = defineStore('user', () => {
  const isLoggedIn: Ref<boolean> = ref(false)
  const data: Ref<User> = ref({
    username: null,
    email: null
  })

  const login = () => {}

  const signup = () => {}

  return { isLoggedIn, data }
})
