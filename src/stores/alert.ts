import { ref, type Ref } from 'vue'
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

  return { messages, addMessage, popMessage, clearMessages }
})
