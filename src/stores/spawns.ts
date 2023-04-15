import { ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { serverConfig } from '@/config/serverConfig'
import { useUserStore } from './user'
import { useFormStore } from './form'
import { useAlertStore } from './alert'

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
  const { clearSpawnTarget } = useFormStore()
  const { token } = storeToRefs(userStore)

  const { addMessage } = useAlertStore()

  const spawns: Ref<Spawn[]> = ref([])
  const loading: Ref<boolean> = ref(true)

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
    loading.value = false
    return json
  }

  const addToSpawns = (spawn: Spawn) => {
    spawns.value.push(spawn)
  }

  const updateSpawnData = (spawn_id: number, spawn: Spawn) => {
    const indexOfTarget = spawns.value.findIndex((spawn) => spawn.id === spawn_id)
    spawns.value[indexOfTarget] = spawn
  }

  const removeSpawnData = (spawn: Spawn) => {
    const filteredSpawns = spawns.value.filter((currSpawn) => currSpawn.id !== spawn.id)
    spawns.value = filteredSpawns
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
    clearSpawnTarget(true)

    addMessage({ content: 'Spawn successfully created!', type: 'success' })
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

  const deleteSpawn = async (spawn: Spawn) => {
    const res = await fetch(`${serverConfig.serverUrl}/spawns/${spawn.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token.value
      }
    })

    const json = await res.json()

    console.log(json)
    return json
  }

  return {
    spawns,
    loading,
    fetchSpawns,
    addToSpawns,
    updateSpawnData,
    removeSpawnData,
    postSpawn,
    patchSpawn,
    deleteSpawn
  }
})
