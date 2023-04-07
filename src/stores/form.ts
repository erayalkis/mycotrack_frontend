import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Culture } from './cultures'
import type { Spawn } from './spawns'
import type { Block } from './blocks'

export const useFormStore = defineStore('form', () => {
  const viewForm = ref(false)

  const cultureDefault = () => ({
    id: -1,
    genus: '',
    species: '',
    source: '',
    user_id: -1,
    should_render: false,
    created_at: '',
    updated_at: ''
  })

  const spawnDefault = () => ({
    id: -1,
    substrate: '',
    culture_id: -1,
    user_id: -1,
    should_render: false,
    created_at: '',
    updated_at: ''
  })

  const blockDefault = () => ({
    id: -1,
    substrate: '',
    spawn_id: -1,
    user_id: -1,
    should_render: false,
    created_at: '',
    updated_at: ''
  })

  const cultureFormTarget: Ref<Culture> = ref(cultureDefault())

  const spawnFormTarget: Ref<Spawn> = ref(spawnDefault())

  const blockFormTarget: Ref<Block> = ref(blockDefault())

  const toggleView = () => (viewForm.value = !viewForm.value)

  const setCultureTarget = (target: Culture | null) => {
    if (spawnFormTarget.value.id || spawnFormTarget.value.should_render) clearSpawnTarget()
    if (blockFormTarget.value.id) clearBlockTarget()

    if (target != null) {
      cultureFormTarget.value = target
    } else {
      cultureFormTarget.value = cultureDefault()
    }

    cultureFormTarget.value.should_render = true
  }

  const setSpawnTarget = (target: Spawn | null) => {
    if (cultureFormTarget.value.id || cultureFormTarget.value.should_render) clearCultureTarget()
    if (blockFormTarget.value.id || blockFormTarget.value.should_render) clearBlockTarget()

    if (target != null) {
      spawnFormTarget.value = target
    } else {
      spawnFormTarget.value = spawnDefault()
    }

    spawnFormTarget.value.should_render = true
  }

  const setBlockTarget = (target: Block | null) => {
    if (cultureFormTarget.value.id) clearCultureTarget()
    if (spawnFormTarget.value.id) clearSpawnTarget()

    if (target != null) {
      blockFormTarget.value = target
    } else {
      blockFormTarget.value = blockDefault()
    }
  }

  const clearCultureTarget = () => (cultureFormTarget.value = cultureDefault())
  const clearSpawnTarget = () => (spawnFormTarget.value = spawnDefault())
  const clearBlockTarget = () => (blockFormTarget.value = blockDefault())

  return {
    viewForm,
    cultureFormTarget,
    spawnFormTarget,
    blockFormTarget,
    toggleView,
    setCultureTarget,
    setSpawnTarget,
    setBlockTarget,
    clearCultureTarget,
    clearSpawnTarget,
    clearBlockTarget
  }
})
