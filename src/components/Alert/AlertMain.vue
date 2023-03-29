<template>
  <div class="absolute rounded-md border border-gray-100 left-0 right-0 mx-auto bottom-10 w-48">
    <div class="flex justify-around align-center">
      <CheckCircle class="text-green-600 my-auto" v-if="type === 'success'" />
      <ExclamationCircle class="text-yellow-600 my-auto" v-if="type === 'warn'" />
      <InfoCircle class="text-blue-600" v-if="type === 'info'" />
      <ExclamationTriangle class="text-red-600" v-if="type === 'error'" />
      <div>{{ message }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ExclamationCircle from '@/assets/components/svg/ExclamationCircleSvg.vue'
import CheckCircle from '@/assets/components/svg/CheckCircleSvg.vue'
import InfoCircle from '@/assets/components/svg/InfoCircleSvg.vue'
import ExclamationTriangle from '@/assets/components/svg/ExclamationTriangleSvg.vue'

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
