<template>
  <div class="p-2 text-center flex flex-col justify-center mt-2 items-center">
    <div class="flex gap-2 items-center mb-5 mt-1">
      <h1 class="text-2xl">Quick Access</h1>
      <MenuSvg class="w-8 h-8 text-blue-500 mt-0.5" />
    </div>

    <div class="flex gap-5 flex-wrap items-center justify-center h-full w-full">
      <CultureDisplayVue />
      <SpawnDisplayVue />
      <BlockDisplayVue />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCultureStore } from '@/stores/cultures'
import { useSpawnStore } from '@/stores/spawns'
import { useBlockStore } from '@/stores/blocks'
import { onBeforeMount } from 'vue'
import CultureDisplayVue from './CultureDisplay.vue'
import SpawnDisplayVue from './SpawnDisplay.vue'
import BlockDisplayVue from './BlockDisplay.vue'
import MenuSvg from '@/assets/components/svg/MenuSvg.vue'

const cultureStore = useCultureStore()
const spawnStore = useSpawnStore()
const blockStore = useBlockStore()

onBeforeMount(async () => {
  await cultureStore.fetchCultures()
  await spawnStore.fetchSpawns()
  await blockStore.fetchBlocks()
})
</script>
