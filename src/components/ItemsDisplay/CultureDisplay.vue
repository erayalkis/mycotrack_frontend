<template>
  <div class="border border-gray-300 rounded-md w-full h-96 select-none md:w-80">
    <div class="flex mt-1 p-2 border-b border-gray-300 items-center justify-center gap-2">
      <PetriDishSvg class="w-8 h-8 text-blue-500" />
      <h1 class="text-lg">Cultures</h1>
      <PlusSvg class="w-7 h-7 text-blue-500 cursor-pointer" @click="openEmptyCultureForm" />
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
        <tbody v-if="!loading" class="text-left bg-gray-100 border-y border-gray-200 h-full">
          <template v-for="culture in cultures" :key="culture.id">
            <tr class="hover:bg-gray-200">
              <td>CLTR#{{ culture.id.toString().padStart(3, '0') }}</td>
              <td>{{ culture.genus + ' ' + culture.species }}</td>
              <td class="flex">
                <ZoomInSvg
                  class="w-5 h-5 ml-auto text-blue-500 cursor-pointer transition duration-300 ease-out hover:text-blue-700"
                  @click="openCultureForm(culture)"
                />
                <TrashSvg
                  class="w-5 h-5 ml-2 mr-1 text-blue-500 cursor-pointer transition duration-300 ease-out hover:text-blue-700"
                  @click="deleteCultureConfirmation(culture)"
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
import { useCultureStore, type Culture } from '@/stores/cultures'
import { storeToRefs } from 'pinia'
import { useFormStore } from '@/stores/form'
import PetriDishSvg from '@/assets/components/svg/PetriDishSvg.vue'
import ZoomInSvg from '@/assets/components/svg/ZoomInSvg.vue'
import TrashSvg from '@/assets/components/svg/TrashSvg.vue'
import PlusSvg from '@/assets/components/svg/PlusSvg.vue'
import SpinnerSvg from '@/assets/components/svg/SpinnerSvg.vue'

const cultureStore = useCultureStore()
const formStore = useFormStore()
const { cultures, loading } = storeToRefs(cultureStore)

const openCultureForm = (culture: Culture) => {
  if (formStore.cultureFormTarget && formStore.cultureFormTarget.id == culture.id) {
    formStore.toggleView()
    setTimeout(() => {
      formStore.clearCultureTarget(false)
    }, 300)
    return
  }

  if (!formStore.viewForm) formStore.toggleView()
  formStore.setCultureTarget(culture)
}

const openEmptyCultureForm = () => {
  if (formStore.cultureFormTarget.should_render && formStore.cultureFormTarget.id === -1) {
    formStore.toggleView()
    return
  }

  if (!formStore.viewForm) formStore.toggleView()
  formStore.setCultureTarget(null)
}

const deleteCultureConfirmation = (culture: Culture) => {
  const opt = confirm('Are you sure you want to delete this culture?')
  if (opt) {
    cultureStore.deleteCulture(culture)
    cultureStore.removeCultureData(culture)
  }
}
</script>
