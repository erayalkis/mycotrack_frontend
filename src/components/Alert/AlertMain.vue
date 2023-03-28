<template>
  <div class="w-36 absolute bg-red-300 rounded-md border border-gray-100 bottom-0 right-36">
    <div class="flex justify-between">
      <img :src="checkCircle" v-if="type === 'success'" />
      <img :src="exclamationCirlce" v-if="type === 'warn'" />
      <img :src="infoCircle" v-if="type === 'info'" />
      <img :src="exclamationTriangle" v-if="type === 'error'" />
      <div>{{ message }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import checkCircle from '@/assets/svg/check-circle.svg'
import exclamationCirlce from '@/assets/svg/exclamation-circle.svg'
import infoCircle from '@/assets/svg/info-circle.svg'
import exclamationTriangle from '@/assets/svg/exclamation-triangle.svg'

defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})
</script>
