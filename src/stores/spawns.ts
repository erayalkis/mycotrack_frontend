import { ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { serverConfig } from '@/config/serverConfig'
import { useUserStore } from './user'

export type Spawn = {
  id: number
  substrate: string | null
  culture_id: number | null
  user_id: number
  should_render: boolean
  created_at: string
  updated_at: string
}

export const useSpawnStore = defineStore('spawn', () => {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)

  const spawns: Ref<Spawn[]> = ref([])

  const fetchSpawns = async () => {
    const res = await fetch(`${serverConfig.serverUrl}/spawns`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.value
      }
    })

    const json = await res.json()

    console.log(json)
    return json
  }

  return { spawns, fetchSpawns }
})
