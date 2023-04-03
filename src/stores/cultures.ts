import { ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { serverConfig } from '@/config/serverConfig'
import { useUserStore } from './user'

export type Culture = {
  id: number
  genus: string
  species: string | null
  source: string | null
  user_id: number
  created_at: string
  updated_at: string
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

  return { cultures, fetchCultures }
})
