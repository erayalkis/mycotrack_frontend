import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { serverConfig } from '@/config/serverConfig'
import { useAlertStore } from './alert'

type User = {
  username: string | null
  email: string | null
  created_at: string | null
  updated_at: string | null
}

export const useUserStore = defineStore('user', () => {
  const { addMessage } = useAlertStore()

  const isLoggedIn: Ref<boolean> = ref(false)
  const token: Ref<string> = ref('')
  const data: Ref<User> = ref({
    username: null,
    email: null,
    created_at: null,
    updated_at: null
  })

  const setToken = (token: string) => {
    localStorage.setItem(`mycotrack-sessiontoken`, token)
    isLoggedIn.value = true
  }

  const loadToken = () => {
    const localToken = localStorage.getItem('mycotrack-sessiontoken')
    if (localToken) {
      token.value = localToken
      isLoggedIn.value = true
    }
  }

  const removeToken = () => {
    localStorage.removeItem(`mycotrack-sessiontoken`)
    isLoggedIn.value = false
  }

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

    await fetchAndSetUserData()
    addMessage({ content: json.message, type: 'success' })
    if (resToken) setToken(resToken)
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

    await fetchAndSetUserData()
    addMessage({ content: json.message, type: 'success' })
    if (resToken) setToken(resToken)
    return json
  }

  const signOut = async () => {
    if (!token.value) {
      console.error("Can't sign out without a token!")
      return
    }

    const res = await fetch(`${serverConfig.serverUrl}/users/sign_out`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.value
      }
    })

    const json = await res.json()

    if (res.status !== 200) {
      console.error('Error while signing out!')
      console.log(res)
      addMessage({ content: json.error, type: 'error' })
      return json
    }

    console.log(json)
    addMessage({ content: json.message, type: 'success' })
    removeToken()
    return json
  }

  const fetchAndSetUserData = async () => {
    if (!token.value) {
      console.error("Can't fetch user data without a token!")
      return
    }

    const res = await fetch(`${serverConfig.serverUrl}/current_user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.value
      }
    })

    const json = await res.json()

    if (res.status !== 200) {
      console.error('Error while fetching user data!')
      console.log(res)
      addMessage({ content: json.error, type: 'error' })
      return json
    }

    data.value = json

    console.log(data.value)
    return json
  }

  return { isLoggedIn, data, signUp, signIn, signOut }
})
