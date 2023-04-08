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

export type BlockPayload = {
  id: number | null
  spawn_id: number | null
  substrate: string
  user_id: number
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
    blocks.value = json
    return json
  }

  const addToBlocks = (block: Block) => {
    blocks.value.push(block)
  }

  const updateBlockData = (block_id: number, block: Block) => {
    const indexOfTarget = blocks.value.findIndex((block) => block.id === block_id)
    blocks.value[indexOfTarget] = block
  }

  const postBlock = async (block: BlockPayload) => {
    const body = {
      block: block
    }

    const res = await fetch(`${serverConfig.serverUrl}/blocks`, {
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

  const patchBlock = async (block: BlockPayload) => {
    const body = {
      block: block
    }

    const res = await fetch(`${serverConfig.serverUrl}/blocks/${block.id}`, {
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

  return { blocks, fetchBlocks, addToBlocks, updateBlockData, postBlock, patchBlock }
})
