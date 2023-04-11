<template>
  <div class="p-2 text-center flex flex-col justify-center mt-2 items-center">
    <h1 class="text-2xl hidden mb-3 md:block">Quick Access</h1>
    <div class="flex gap-5 flex-wrap items-center justify-center h-full w-full">
      <CultureDisplayVue />
      <SpawnDisplayVue />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCultureStore } from '@/stores/cultures'
import { useSpawnStore } from '@/stores/spawns'
import { useBlockStore, type Block } from '@/stores/blocks'
import { useFormStore } from '@/stores/form'
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import TrashSvg from '@/assets/components/svg/TrashSvg.vue'
import ZoomInSvg from '@/assets/components/svg/ZoomInSvg.vue'
import MushroomSvg from '@/assets/components/svg/MushroomSvg.vue'
import PlusSvg from '@/assets/components/svg/PlusSvg.vue'
import CultureDisplayVue from './CultureDisplay.vue'
import SpawnDisplayVue from './SpawnDisplay.vue'

const cultureStore = useCultureStore()
const spawnStore = useSpawnStore()
const blockStore = useBlockStore()
const formStore = useFormStore()

const { blocks } = storeToRefs(blockStore)

onBeforeMount(async () => {
  await cultureStore.fetchCultures()
  await spawnStore.fetchSpawns()
  await blockStore.fetchBlocks()
})

const openBlockForm = (block: Block) => {
  if (formStore.blockFormTarget && formStore.blockFormTarget.id == block.id) {
    formStore.toggleView()
    setTimeout(() => {
      formStore.clearBlockTarget(false)
    }, 300)
    return
  }

  if (!formStore.viewForm) formStore.toggleView()
  formStore.setBlockTarget(block)
}

const openEmptyBlockForm = () => {
  if (formStore.blockFormTarget.should_render && formStore.blockFormTarget.id === -1) {
    formStore.toggleView()
    return
  }

  if (!formStore.viewForm) formStore.toggleView()
  formStore.setBlockTarget(null)
}

const deleteBlockConfirmation = (block: Block) => {
  const opt = confirm('Are you sure you want to delete this culture?')
  if (opt) {
    blockStore.deleteBlock(block)
    blockStore.removeBlockData(block)
  }
}
</script>
