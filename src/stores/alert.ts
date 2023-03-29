import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

type Message = {
  content: String
  type: String
}

export const useAlertStore = defineStore('alert', () => {
  const messages: Ref<Message[]> = ref([])

  return { messages }
})
