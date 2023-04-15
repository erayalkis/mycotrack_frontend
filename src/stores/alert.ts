import { ref, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'

type Message = {
  content: String
  type: String
}

export const useAlertStore = defineStore('alert', () => {
  const messages: Ref<Message[]> = ref([])

  const addMessage = (msg: Message) => messages.value.push(msg)
  const popMessage = () => messages.value.shift()
  const clearMessages = () => (messages.value.length = 0)

  let autoSkipTimeout: NodeJS.Timeout | null = null

  watch(
    messages,
    () => {
      if (autoSkipTimeout != null) clearTimeout(autoSkipTimeout)
      if (messages.value.length === 0) return

      autoSkipTimeout = setTimeout(() => {
        popMessage()
      }, 1600)
    },
    { deep: true }
  )

  return { messages, addMessage, popMessage, clearMessages }
})
