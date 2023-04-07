<template>
  <div
    class="myc-form fixed w-full h-full bg-gray-100 top-0 overflow-hidden mt-12 md:w-96"
    :class="{ show: viewForm }"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  >
    <CultureFormMain v-if="cultureFormTarget" />
  </div>
</template>
<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import { storeToRefs } from 'pinia'
import CultureFormMain from './CultureFormMain.vue'

const formStore = useFormStore()
const { viewForm, cultureFormTarget } = storeToRefs(formStore)
</script>
<style scoped>
.myc-form {
  right: -100vw;
  opacity: 100;
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}

.myc-form.show {
  right: 0;
  opacity: 100;
}

@media screen and (min-width: 1050px) {
  .myc-form.show {
    right: 0;
    opacity: 100;
  }
}
</style>
