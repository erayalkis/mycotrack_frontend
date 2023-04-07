<template>
  <div>
    {{ cultureFormTarget }}
    <div v-if="cultureFormTarget.id !== -1">
      <h1>CLTR#{{ cultureFormTarget.id.toString().padStart(3, '0') }}</h1>
      <h1>{{ cultureFormTarget.genus + ' ' + cultureFormTarget.species }}</h1>
    </div>
    <div v-else>
      <h1>Add a culture</h1>
    </div>

    <form @submit.prevent="handleCultureSubmit">
      <input type="text" placeholder="Genus" v-model="genus" />
      <input type="text" placeholder="Species" v-model="species" />
      <textarea placeholder="Source" v-model="source"></textarea>
      <br />
      <button v-if="cultureFormTarget.id == -1" type="submit">Add culture</button>
      <button v-else type="submit">Edit culture</button>
    </form>
    <ArrowLeftSvg class="cursor-pointer" @click="closeForm" />
  </div>
</template>
<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import { useUserStore } from '@/stores/user'
import { useCultureStore, type CulturePayload } from '@/stores/cultures'
import { storeToRefs } from 'pinia'
import ArrowLeftSvg from '@/assets/components/svg/ArrowLeftSvg.vue'
import { ref, watch } from 'vue'

const formStore = useFormStore()
const userStore = useUserStore()
const { postCulture, addToCultures, patchCulture } = useCultureStore()
const { viewForm, cultureFormTarget } = storeToRefs(formStore)
const { data } = storeToRefs(userStore)

const genus = ref('')
const species = ref('')
const source = ref('')

watch(cultureFormTarget, () => {
  genus.value = cultureFormTarget.value.genus
  species.value = cultureFormTarget.value.species
  source.value = cultureFormTarget.value.source
})

const closeForm = () => {
  if (viewForm.value) {
    formStore.toggleView()
    setTimeout(() => {
      formStore.clearCultureTarget()
    }, 300)
  }
}

const createCulture = async () => {
  if (data.value.id === null) return

  const culture: CulturePayload = {
    id: null,
    genus: genus.value,
    species: species.value,
    source: source.value,
    user_id: data.value.id
  }

  const cultureRes = await postCulture(culture)
  addToCultures(cultureRes)
}

const updateCulture = async () => {
  if (data.value.id === null) return

  const culture: CulturePayload = {
    id: cultureFormTarget.value.id,
    genus: genus.value,
    species: species.value,
    source: source.value,
    user_id: data.value.id
  }

  const cultureRes = await patchCulture(culture)
  console.log(cultureRes)
}

const handleCultureSubmit = async () => {
  if (cultureFormTarget.value.id === -1) {
    createCulture()
  } else {
    updateCulture()
  }
}
</script>
-
