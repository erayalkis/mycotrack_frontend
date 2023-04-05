import { ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { serverConfig } from '@/config/serverConfig'
import { useUserStore } from './user'

export type Block = {
  id: number
  spawn_id: number | null
  substrate: string
  user_id: number
  should_render: boolean
  created_at: string
  updated_at: string
}

export const useBlockStore = defineStore('block', () => {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)

  const blocks: Ref<Block[]> = ref([])

  const fetchBlocks = async () => {
    const res = await fetch(`${serverConfig.serverUrl}/blocks`, {
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

  return { blocks, fetchBlocks }
})
