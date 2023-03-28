<template>
  <div class="absolute rounded-md border border-gray-100 left-0 right-0 mx-auto bottom-10 w-max">
    <div class="flex justify-between">
      <img :src="checkCircle" class="text-green-600" v-if="type === 'success'" />
      <img :src="exclamationCirlce" class="text-yellow-600" v-if="type === 'warn'" />
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
