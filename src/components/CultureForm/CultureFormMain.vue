<template>
  <div
    class="myc-form fixed w-full h-full bg-gray-100 top-0 right-0 overflow-hidden mt-12"
    :class="{ show: viewForm }"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  >
    <div v-if="formStore.cultureFormTarget">
      <h1>CLTR#{{ formStore.cultureFormTarget.id.toString().padStart(3, '0') }}</h1>
      <h1>{{ formStore.cultureFormTarget.genus + ' ' + formStore.cultureFormTarget.species }}</h1>
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
<style scoped>
.myc-form {
  left: 100vw;
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ease-out;
}

.myc-form.show {
  left: 0;
}

@media screen and (min-width: 1050px) {
  .myc-form.show {
    left: 80vw;
  }
}
</style>
