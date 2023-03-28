import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { serverConfig } from '@/config/serverConfig'

type User = {
  username: String | null
  email: String | null
}

export const useUserStore = defineStore('user', () => {
  const isLoggedIn: Ref<boolean> = ref(false)
  const token: Ref<String> = ref('')
  const data: Ref<User> = ref({
    username: null,
    email: null
  })

  const signIn = async (email: String, password: String) => {
    const data = {
      user: {
        email,
        password
      }
    }

    const res = await fetch(`${serverConfig.serverUrl}/users/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (res.status !== 200) {
      console.error('Error while logging in!')
      console.log(res)
    }

    const resToken = res.headers.get('authorization')
    const json = await res.json()

    if (resToken) token.value = resToken
    return json
  }

  const signUp = () => {}

  const signOut = () => {}

  return { isLoggedIn, data, signUp, signIn, signOut }
})
