<template>
  <div class="p-2 text-center flex flex-col justify-center mt-2 items-center">
    <h1 class="text-2xl hidden mb-3 md:block">Quick Access</h1>
    <div class="flex gap-5 flex-wrap items-center justify-center h-full w-full">
      <div class="border border-gray-300 rounded-md w-full h-96 md:w-80">
        <div class="flex mt-1 p-2 border-b border-gray-300 items-center justify-center gap-1">
          <PetriDishSvg class="w-8 h-8 text-blue-500" />
          <h1 class="text-lg">Cultures</h1>
        </div>
        <div class="h-full">
          <table class="w-full text-sm text-left">
            <thead class="uppercase">
              <tr class="">
                <th>ID</th>
                <th>Species</th>
                <th class="opacity-0">Actions</th>
              </tr>
            </thead>
            <tbody class="text-left bg-gray-100 border-y border-gray-200 h-full">
              <template v-for="culture in cultures" :key="culture.id">
                <tr>
                  <td>CLTR#{{ culture.id.toString().padStart(3, '0') }}</td>
                  <td>{{ culture.genus + ' ' + culture.species }}</td>
                  <td class="flex">
                    <ZoomInSvg
                      class="w-5 h-5 ml-auto text-blue-500 cursor-pointer transition duration-300 ease-out hover:text-blue-700"
                      @click="openCultureForm(culture)"
                    />
                    <TrashSvg
                      class="w-5 h-5 ml-2 mr-1 text-blue-500 cursor-pointer transition duration-300 ease-out hover:text-blue-700"
                    />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="border border-gray-300 rounded-md w-full h-96 md:w-80">
        <div class="flex mt-1 p-2 border-b border-gray-300 items-center justify-center gap-1">
          <JarSvg class="w-8 h-8 text-blue-500" />
          <h1 class="text-lg">Spawns</h1>
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
                    />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="border border-gray-300 rounded-md w-full h-96 md:w-80">
        <div class="flex mt-1 p-2 border-b border-gray-300 items-center justify-center gap-1">
          <MushroomSvg class="w-8 h-8 text-blue-500" />
          <h1 class="text-lg">Blocks</h1>
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
import { useCultureStore, type Culture } from '@/stores/cultures'
import { useSpawnStore, type Spawn } from '@/stores/spawns'
import { useBlockStore, type Block } from '@/stores/blocks'
import { useFormStore } from '@/stores/form'
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import TrashSvg from '@/assets/components/svg/TrashSvg.vue'
import ZoomInSvg from '@/assets/components/svg/ZoomInSvg.vue'
import PetriDishSvg from '@/assets/components/svg/PetriDishSvg.vue'
import JarSvg from '@/assets/components/svg/JarSvg.vue'
import MushroomSvg from '@/assets/components/svg/MushroomSvg.vue'

const cultureStore = useCultureStore()
const spawnStore = useSpawnStore()
const blockStore = useBlockStore()
const formStore = useFormStore()

const { cultures } = storeToRefs(cultureStore)
const { spawns } = storeToRefs(spawnStore)
const { blocks } = storeToRefs(blockStore)

onBeforeMount(async () => {
  await cultureStore.fetchCultures()
  await spawnStore.fetchSpawns()
  await blockStore.fetchBlocks()
})

const openCultureForm = (culture: Culture) => {
  if (formStore.cultureFormTarget && formStore.cultureFormTarget.id == culture.id) {
    formStore.toggleView()
    setTimeout(() => {
      formStore.clearCultureTarget()
    }, 300)
    return
  }

  if (!formStore.viewForm) formStore.toggleView()
  formStore.setCultureTarget(culture)
}

const openSpawnForm = (spawn: Spawn) => {
  if (formStore.spawnFormTarget && formStore.spawnFormTarget.id == spawn.id) {
    formStore.toggleView()
    setTimeout(() => {
      formStore.clearSpawnTarget()
    }, 300)
    return
  }

  if (!formStore.viewForm) formStore.toggleView()
  formStore.setSpawnTarget(spawn)
}

const openBlockForm = (block: Block) => {
  if (formStore.blockFormTarget && formStore.blockFormTarget.id == block.id) {
    formStore.toggleView()
    setTimeout(() => {
      formStore.clearBlockTarget()
    }, 300)
    return
  }

  if (!formStore.viewForm) formStore.toggleView()
  formStore.setBlockTarget(block)
}
</script>
