import { ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { serverConfig } from '@/config/serverConfig'
import { useUserStore } from './user'
import { useFormStore } from './form'
import { useAlertStore } from './alert'

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
  const { clearCultureTarget } = useFormStore()
  const { token } = storeToRefs(userStore)

  const { addMessage } = useAlertStore()

  const cultures: Ref<Culture[]> = ref([])
  const loading: Ref<boolean> = ref(true)

  const fetchCultures = async () => {
    const res = await fetch(`${serverConfig.serverUrl}/cultures`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.value
      }
    })

    const json = await res.json()

    cultures.value = json
    loading.value = false
    return json
  }

  const addToCultures = (culture: Culture) => {
    cultures.value.push(culture)
  }

  const updateCultureData = (culture_id: number, culture: Culture) => {
    const indexOfTarget = cultures.value.findIndex((culture) => culture.id === culture_id)
    cultures.value[indexOfTarget] = culture
  }

  const removeCultureData = (culture: Culture) => {
    const filteredCultures = cultures.value.filter((cult) => cult.id !== culture.id)
    cultures.value = filteredCultures
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
    clearCultureTarget(true)

    addMessage({ content: 'Culture successfully created!', type: 'success' })
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

    addMessage({ content: 'Culture successfully updated!', type: 'success' })
    return json
  }

  const deleteCulture = async (culture: Culture) => {
    const res = await fetch(`${serverConfig.serverUrl}/cultures/${culture.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token.value
      }
    })

    const json = await res.json()

    addMessage({ content: 'Culture successfully deleted!', type: 'success' })
    return json
  }

  return {
    cultures,
    loading,
    addToCultures,
    fetchCultures,
    postCulture,
    patchCulture,
    updateCultureData,
    removeCultureData,
    deleteCulture
  }
})
