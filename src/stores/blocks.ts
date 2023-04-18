import { ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { serverConfig } from '@/config/serverConfig'
import { useUserStore } from './user'
import { useFormStore } from './form'
import { useAlertStore } from './alert'

export type Block = {
  id: number
  spawn_id: number | null
  substrate: string
  status: number
  user_id: number
  should_render: boolean
  created_at: string
  updated_at: string
}

export type BlockPayload = {
  id: number | null
  spawn_id: number | null
  substrate: string
  status: number
  user_id: number
}

export const useBlockStore = defineStore('block', () => {
  const userStore = useUserStore()
  const { clearBlockTarget } = useFormStore()
  const { token } = storeToRefs(userStore)

  const { addMessage } = useAlertStore()

  const blocks: Ref<Block[]> = ref([])
  const loading: Ref<boolean> = ref(true)

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
    loading.value = false
    return json
  }

  const addToBlocks = (block: Block) => {
    blocks.value.push(block)
  }

  const updateBlockData = (block_id: number, block: Block) => {
    const indexOfTarget = blocks.value.findIndex((block) => block.id === block_id)
    blocks.value[indexOfTarget] = block
  }

  const removeBlockData = (block: Block) => {
    const filteredBlocks = blocks.value.filter((currBlock) => currBlock.id !== block.id)
    blocks.value = filteredBlocks
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
    clearBlockTarget(true)

    addMessage({ content: 'Block successfully created!', type: 'success' })
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

    addMessage({ content: 'Block successfully updated!', type: 'success' })
    return json
  }

  const deleteBlock = async (block: Block) => {
    const res = await fetch(`${serverConfig.serverUrl}/blocks/${block.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token.value
      }
    })

    const json = await res.json()

    addMessage({ content: 'Block successfully deleted!', type: 'success' })
    return json
  }

  return {
    blocks,
    loading,
    fetchBlocks,
    addToBlocks,
    updateBlockData,
    removeBlockData,
    postBlock,
    patchBlock,
    deleteBlock
  }
})
