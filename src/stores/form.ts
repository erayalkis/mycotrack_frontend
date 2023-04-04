import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Culture } from './cultures'
import type { Spawn } from './spawns'
import type { Block } from './blocks'

export const useFormStore = defineStore('form', () => {
  const viewForm = ref(false)

  const cultureDefault = {
    id: -1,
    genus: '',
    species: '',
    source: '',
    user_id: -1,
    created_at: '',
    updated_at: ''
  }

  const spawnDefault = {
    id: -1,
    substrate: '',
    culture_id: -1,
    user_id: -1,
    created_at: '',
    updated_at: ''
  }

  const blockDefault = {
    id: -1,
    substrate: '',
    spawn_id: -1,
    user_id: -1,
    created_at: '',
    updated_at: ''
  }

  const cultureFormTarget: Ref<Culture> = ref(cultureDefault)

  const spawnFormTarget: Ref<Spawn> = ref(spawnDefault)

  const blockFormTarget: Ref<Block> = ref(blockDefault)

  const toggleView = () => (viewForm.value = !viewForm.value)
  const setCultureTarget = (target: Culture) => {
    if (spawnFormTarget.value.id) clearSpawnTarget()
    if (blockFormTarget.value.id) clearBlockTarget()

    cultureFormTarget.value = target
  }

  const setSpawnTarget = (target: Spawn) => {
    if (cultureFormTarget.value.id) clearCultureTarget()
    if (blockFormTarget.value.id) clearBlockTarget()

    spawnFormTarget.value = target
  }

  const setBlockTarget = (target: Block) => {
    if (cultureFormTarget.value.id) clearCultureTarget()
    if (spawnFormTarget.value.id) clearSpawnTarget()

    blockFormTarget.value = target
  }

  const clearCultureTarget = () => (cultureFormTarget.value = cultureDefault)
  const clearSpawnTarget = () => (spawnFormTarget.value = spawnDefault)
  const clearBlockTarget = () => (blockFormTarget.value = blockDefault)

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
