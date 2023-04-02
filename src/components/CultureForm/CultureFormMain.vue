<template>
  <div
    class="myc-form fixed w-full h-full bg-red-300 top-0 right-0 overflow-hidden mt-12"
    :class="{ show: viewForm }"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  >
    {{ viewForm }}
    <ArrowLeftSvg class="cursor-pointer" @click="formStore.toggleView" />
    <h1>Add a culture</h1>
  </div>
</template>
<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import { storeToRefs } from 'pinia'
import ArrowLeftSvg from '@/assets/components/svg/ArrowLeftSvg.vue'

const formStore = useFormStore()
const { viewForm } = storeToRefs(formStore)
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
</style>
