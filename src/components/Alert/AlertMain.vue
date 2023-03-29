<template>
  <div
    class="absolute rounded-md border border-gray-100 left-0 right-0 mx-auto bottom-10 w-80 px-7 py-5"
  >
    <div class="flex justify-between align-center">
      <CheckCircle class="text-green-600 my-auto h-6 w-6" v-if="type === 'success'" />
      <ExclamationCircle class="text-yellow-600 my-auto" v-if="type === 'warn'" />
      <InfoCircle class="text-blue-600" v-if="type === 'info'" />
      <ExclamationTriangle class="text-red-600" v-if="type === 'error'" />
      <div>{{ message }}</div>
      <div class="flex">
        <SkipForward
          class="text-gray-500 cursor-pointer transition duration-300 hover:text-gray-800"
        />
        <X class="text-gray-500 cursor-pointer transition duration-300 hover:text-gray-800" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ExclamationCircle from '@/assets/components/svg/ExclamationCircleSvg.vue'
import CheckCircle from '@/assets/components/svg/CheckCircleSvg.vue'
import InfoCircle from '@/assets/components/svg/InfoCircleSvg.vue'
import ExclamationTriangle from '@/assets/components/svg/ExclamationTriangleSvg.vue'
import SkipForward from '@/assets/components/svg/SkipForwardSvg.vue'
import X from '@/assets/components/svg/xSvg.vue'
import { useAlertStore } from '@/stores/alert'

const { messages } = useAlertStore()

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
