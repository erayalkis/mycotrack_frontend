<template>
  <div
    class="myc-form fixed w-full h-full bg-gray-100 top-0 overflow-hidden mt-12 md:w-96"
    :class="{ show: viewForm }"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  >
    {{ cultureFormTarget.should_render }}
    {{ spawnFormTarget.should_render }}
    {{ blockFormTarget.should_render }}
    <CultureFormMain v-if="cultureFormTarget.should_render" />
    <SpawnFormMain v-if="spawnFormTarget.should_render" />
  </div>
</template>
<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import { storeToRefs } from 'pinia'
import CultureFormMain from './CultureFormMain.vue'
import SpawnFormMain from './SpawnFormMain.vue'

const formStore = useFormStore()
const { viewForm, cultureFormTarget, spawnFormTarget, blockFormTarget } = storeToRefs(formStore)
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
