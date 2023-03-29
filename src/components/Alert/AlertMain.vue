<template>
  <div
    v-if="messages.length"
    class="notification absolute rounded-md border border-gray-200 bg-white left-0 right-0 mx-auto w-[21rem] px-7 py-5 shadow-md"
  >
    <div class="flex justify-between align-center">
      <CheckCircle
        class="text-green-600 my-auto h-6 w-6 shrink-0"
        v-if="current.type === 'success'"
      />
      <ExclamationCircle
        class="text-yellow-600 my-auto h-6 w-6 shrink-0"
        v-if="current.type === 'warn'"
      />
      <InfoCircle class="text-blue-600 h-6 w-6 shrink-0" v-if="current.type === 'info'" />
      <ExclamationTriangle class="text-red-600 h-6 w-6 shrink-0" v-if="current.type === 'error'" />
      <div>{{ current.content }}</div>
      <div class="flex">
        <SkipForward
          v-if="messages.length > 1"
          class="text-gray-500 cursor-pointer transition duration-300 hover:text-gray-800"
          @click="skipMessage"
        />
        <X
          class="text-gray-500 cursor-pointer transition duration-300 hover:text-gray-800"
          @click="dismissAllMessages"
        />
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
import { computed } from 'vue'

const { messages, popMessage, clearMessages } = useAlertStore()
const current = computed(() => messages[0])

const skipMessage = () => popMessage()
const dismissAllMessages = () => clearMessages()
</script>
<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    bottom: 80px;
  }

  to {
    opacity: 100;
    bottom: 50px;
  }
}
.notification {
  transition: bottom, 300ms, ease-out;
  animation: fade-in 300ms forwards;
}
</style>
