<template>
  <div>
    <div v-if="formStore.spawnFormTarget.id">
      <h1>SPWN#{{ formStore.spawnFormTarget.id.toString().padStart(3, '0') }}</h1>
      <h1>{{ formStore.spawnFormTarget.substrate }}</h1>
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
      formStore.clearSpawnTarget()
    }, 300)
  }
}
</script>
-
