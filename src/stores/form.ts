import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', () => {
  const viewForm = ref(false)
  const toggleView = () => (viewForm.value = !viewForm.value)

  return { viewForm, toggleView }
})
