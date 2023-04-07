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

export type SpawnPayload = {
  id: number | null
  substrate: string
  culture_id: number
  user_id: number
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
    spawns.value = json
    return json
  }

  const addToSpawns = (spawn: Spawn) => {
    spawns.value.push(spawn)
  }

  const updateSpawnData = (spawn_id: number, spawn: Spawn) => {
    const indexOfTarget = spawns.value.findIndex((spawn) => spawn.id === spawn_id)
    spawns.value[indexOfTarget] = spawn
  }

  const postSpawn = async (spawn: SpawnPayload) => {
    const body = {
      spawn: spawn
    }

    const res = await fetch(`${serverConfig.serverUrl}/spawns`, {
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

  const patchSpawn = async (spawn: SpawnPayload) => {
    const body = {
      spawn: spawn
    }

    const res = await fetch(`${serverConfig.serverUrl}/spawns/${spawn.id}`, {
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

  return { spawns, fetchSpawns, addToSpawns, updateSpawnData, postSpawn, patchSpawn }
})
