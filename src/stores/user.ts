import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { serverConfig } from '@/config/serverConfig'
import { useAlertStore } from './alert'

type User = {
  username: String | null
  email: String | null
}

export const useUserStore = defineStore('user', () => {
  const { addMessage } = useAlertStore()

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

    const json = await res.json()
    json['status'] = res.status

    if (res.status !== 200) {
      console.error('Error while logging in!')
      console.log(res)
      addMessage({ content: json.error, type: 'error' })
      return json
    }

    const resToken = res.headers.get('authorization')
    if (resToken) token.value = resToken

    addMessage({ content: json.message, type: 'success' })
    return json
  }

  const signUp = async (
    username: String,
    email: String,
    password: String,
    passwordConfirmation: String
  ) => {
    const data = {
      user: {
        username,
        email,
        password,
        password_confirmation: passwordConfirmation
      }
    }

    const res = await fetch(`${serverConfig.serverUrl}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const json = await res.json()
    json['status'] = res.status

    if (res.status !== 200) {
      console.error('Error while signing up!')
      console.log(res)
      addMessage({ content: json.error, type: 'error' })
      return json
    }

    const resToken = res.headers.get('authorization')
    if (resToken) token.value = resToken

    addMessage({ content: json.message, type: 'success' })
    return json
  }

  const signOut = () => {}

  return { isLoggedIn, data, signUp, signIn, signOut }
})
