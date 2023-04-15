<template>
  <div class="border border-gray-300 rounded-md w-full h-96 select-none md:w-80">
    <div class="flex mt-1 p-2 border-b border-gray-300 items-center justify-center gap-2">
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
            <tr class="hover:bg-gray-200">
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
</template>
<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import { useSpawnStore, type Spawn } from '@/stores/spawns'
import { storeToRefs } from 'pinia'
import JarSvg from '@/assets/components/svg/JarSvg.vue'
import PlusSvg from '@/assets/components/svg/PlusSvg.vue'
import TrashSvg from '@/assets/components/svg/TrashSvg.vue'
import ZoomInSvg from '@/assets/components/svg/ZoomInSvg.vue'

const formStore = useFormStore()
const spawnStore = useSpawnStore()
const { spawns } = storeToRefs(spawnStore)

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

const deleteSpawnConfirmation = (spawn: Spawn) => {
  const opt = confirm('Are you sure you want to delete this spawn?')
  if (opt) {
    spawnStore.deleteSpawn(spawn)
    spawnStore.removeSpawnData(spawn)
  }
}
</script>
