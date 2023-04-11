<template>
  <div class="p-2 text-center flex flex-col justify-center mt-2 items-center">
    <h1 class="text-2xl hidden mb-3 md:block">Quick Access</h1>
    <div class="flex gap-5 flex-wrap items-center justify-center h-full w-full">
      <CultureDisplayVue />
      <div class="border border-gray-300 rounded-md w-full h-96 select-none md:w-80">
        <div class="flex mt-1 p-2 border-b border-gray-300 items-center justify-center gap-1">
          <JarSvg class="w-8 h-8 text-blue-500" />
          <h1 class="text-lg">Spawns</h1>
          <PlusSvg class="w-7 h-7 text-blue-500 cursor-pointer" @click="openEmptySpawnForm" />
        </div>
        <div class="h-full">
          <table class="w-full text-sm text-left">
            <thead class="uppercase">
              <tr class="">
                <th>ID</th>
                <th>Substrate</th>
                <th class="opacity-0">Actions</th>
              </tr>
            </thead>
            <tbody class="text-left bg-gray-100 border-y border-gray-200 h-full">
              <template v-for="spawn in spawns" :key="spawn.id">
                <tr>
                  <td>SPWN#{{ spawn.id.toString().padStart(3, '0') }}</td>
                  <td>{{ spawn.substrate }}</td>
                  <td class="flex">
                    <ZoomInSvg
                      class="w-5 h-5 ml-auto text-blue-500 cursor-pointer transition duration-300 ease-out hover:text-blue-700"
                      @click="openSpawnForm(spawn)"
                    />
                    <TrashSvg
                      class="w-5 h-5 ml-2 mr-1 text-blue-500 cursor-pointer transition duration-300 ease-out hover:text-blue-700"
                      @click="deleteSpawnConfirmation(spawn)"
                    />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="border border-gray-300 rounded-md w-full h-96 select-none md:w-80">
        <div class="flex mt-1 p-2 border-b border-gray-300 items-center justify-center gap-1">
          <MushroomSvg class="w-8 h-8 text-blue-500" />
          <h1 class="text-lg">Blocks</h1>
          <PlusSvg class="w-7 h-7 text-blue-500 cursor-pointer" @click="openEmptyBlockForm" />
        </div>
        <div class="h-full">
          <table class="w-full text-sm text-left">
            <thead class="uppercase">
              <tr class="">
                <th>ID</th>
                <th>Substrate</th>
                <th class="opacity-0">Actions</th>
              </tr>
            </thead>
            <tbody class="text-left bg-gray-100 border-y border-gray-200 h-full">
              <template v-for="block in blocks" :key="block.id">
                <tr>
                  <td>BLCK#{{ block.id.toString().padStart(3, '0') }}</td>
                  <td>{{ block.substrate }}</td>
                  <td class="flex">
                    <ZoomInSvg
                      class="w-5 h-5 ml-auto text-blue-500 cursor-pointer transition duration-300 ease-out hover:text-blue-700"
                      @click="openBlockForm(block)"
                    />
                    <TrashSvg
                      class="w-5 h-5 ml-2 mr-1 text-blue-500 cursor-pointer transition duration-300 ease-out hover:text-blue-700"
                      @click="deleteBlockConfirmation(block)"
                    />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCultureStore } from '@/stores/cultures'
import { useSpawnStore, type Spawn } from '@/stores/spawns'
import { useBlockStore, type Block } from '@/stores/blocks'
import { useFormStore } from '@/stores/form'
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import TrashSvg from '@/assets/components/svg/TrashSvg.vue'
import ZoomInSvg from '@/assets/components/svg/ZoomInSvg.vue'
import JarSvg from '@/assets/components/svg/JarSvg.vue'
import MushroomSvg from '@/assets/components/svg/MushroomSvg.vue'
import PlusSvg from '@/assets/components/svg/PlusSvg.vue'
import CultureDisplayVue from './CultureDisplay.vue'

const cultureStore = useCultureStore()
const spawnStore = useSpawnStore()
const blockStore = useBlockStore()
const formStore = useFormStore()

const { spawns } = storeToRefs(spawnStore)
const { blocks } = storeToRefs(blockStore)

onBeforeMount(async () => {
  await cultureStore.fetchCultures()
  await spawnStore.fetchSpawns()
  await blockStore.fetchBlocks()
})

const openSpawnForm = (spawn: Spawn) => {
  if (formStore.spawnFormTarget && formStore.spawnFormTarget.id == spawn.id) {
    formStore.toggleView()
    setTimeout(() => {
      formStore.clearSpawnTarget(false)
    }, 300)
    return
  }

  if (!formStore.viewForm) formStore.toggleView()
  formStore.setSpawnTarget(spawn)
}

const openEmptySpawnForm = () => {
  if (formStore.spawnFormTarget.should_render && formStore.spawnFormTarget.id === -1) {
    formStore.toggleView()
    return
  }

  if (!formStore.viewForm) formStore.toggleView()
  formStore.setSpawnTarget(null)
}

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

const deleteSpawnConfirmation = (spawn: Spawn) => {
  const opt = confirm('Are you sure you want to delete this spawn?')
  if (opt) {
    spawnStore.deleteSpawn(spawn)
    spawnStore.removeSpawnData(spawn)
  }
}

const deleteBlockConfirmation = (block: Block) => {
  const opt = confirm('Are you sure you want to delete this culture?')
  if (opt) {
    blockStore.deleteBlock(block)
    blockStore.removeBlockData(block)
  }
}
</script>
