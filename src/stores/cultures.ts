import { ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { serverConfig } from '@/config/serverConfig'
import { useUserStore } from './user'

export type Culture = {
  id: number
  genus: string
  species: string
  source: string
  user_id: number
  should_render: boolean
  created_at: string
  updated_at: string
}

export type CulturePayload = {
  id: number | null
  genus: string
  species: string
  source: string
  user_id: number
}

export const useCultureStore = defineStore('culture', () => {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)

  const cultures: Ref<Culture[]> = ref([])

  const fetchCultures = async () => {
    const res = await fetch(`${serverConfig.serverUrl}/cultures`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.value
      }
    })

    const json = await res.json()

    console.log(json)
    cultures.value = json
    return json
  }

  const addToCultures = (culture: Culture) => {
    cultures.value.push(culture)
  }

  const updateCultureData = (culture_id: number, culture: Culture) => {
    const indexOfTarget = cultures.value.findIndex((culture) => culture.id === culture_id)
    cultures.value[indexOfTarget] = culture
  }

  const postCulture = async (culture: CulturePayload) => {
    const body = {
      culture: culture
    }

    const res = await fetch(`${serverConfig.serverUrl}/cultures`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.value
      },
      body: JSON.stringify(body)
    })

    const json = await res.json()
    return json
  }

  const patchCulture = async (culture: CulturePayload) => {
    const body = {
      culture: culture
    }

    const res = await fetch(`${serverConfig.serverUrl}/cultures/${culture.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.value
      },
      body: JSON.stringify(body)
    })

    const json = await res.json()

    return json
  }

  return { cultures, addToCultures, fetchCultures, postCulture, patchCulture, updateCultureData }
})
