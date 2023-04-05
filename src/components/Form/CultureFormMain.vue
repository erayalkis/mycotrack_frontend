<template>
  <div>
    <div v-if="formStore.cultureFormTarget.id">
      <h1>CLTR#{{ formStore.cultureFormTarget.id.toString().padStart(3, '0') }}</h1>
      <h1>{{ formStore.cultureFormTarget.genus + ' ' + formStore.cultureFormTarget.species }}</h1>
    </div>
    <div v-else>
      <h1>Add a culture</h1>
    </div>
    <ArrowLeftSvg class="cursor-pointer" @click="closeForm" />
  </div>
</template>
<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import { storeToRefs } from 'pinia'
import ArrowLeftSvg from '@/assets/components/svg/ArrowLeftSvg.vue'

const formStore = useFormStore()
const { viewForm } = storeToRefs(formStore)

const closeForm = () => {
  if (viewForm.value) {
    formStore.toggleView()
    setTimeout(() => {
      formStore.clearCultureTarget()
    }, 300)
  }
}
</script>
-
