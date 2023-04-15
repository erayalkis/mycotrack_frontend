<template>
  <div class="border border-gray-300 rounded-md w-full h-96 select-none md:w-80">
    <div class="flex mt-1 p-2 border-b border-gray-300 items-center justify-center gap-2">
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
        <tbody v-if="!loading" class="text-left bg-gray-100 border-y border-gray-200 h-full">
          <template v-for="block in blocks" :key="block.id">
            <tr class="hover:bg-gray-200">
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
      <SpinnerSvg v-if="loading" class="w-16 h-16 ml-auto mr-auto mt-5" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useBlockStore, type Block } from '@/stores/blocks'
import { useFormStore } from '@/stores/form'
import { storeToRefs } from 'pinia'
import TrashSvg from '@/assets/components/svg/TrashSvg.vue'
import ZoomInSvg from '@/assets/components/svg/ZoomInSvg.vue'
import MushroomSvg from '@/assets/components/svg/MushroomSvg.vue'
import PlusSvg from '@/assets/components/svg/PlusSvg.vue'
import SpinnerSvg from '@/assets/components/svg/SpinnerSvg.vue'

const blockStore = useBlockStore()
const formStore = useFormStore()
const { blocks, loading } = storeToRefs(blockStore)

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
