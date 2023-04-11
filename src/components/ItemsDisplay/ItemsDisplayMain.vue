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
import { useBlockStore } from '@/stores/blocks'
import { onBeforeMount } from 'vue'
import CultureDisplayVue from './CultureDisplay.vue'
import SpawnDisplayVue from './SpawnDisplay.vue'

const cultureStore = useCultureStore()
const spawnStore = useSpawnStore()
const blockStore = useBlockStore()

onBeforeMount(async () => {
  await cultureStore.fetchCultures()
  await spawnStore.fetchSpawns()
  await blockStore.fetchBlocks()
})
</script>
