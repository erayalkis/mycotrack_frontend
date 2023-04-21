<template>
  <div>
    <ArrowLeftSvg class="w-8 h-8 m-2 rotate-180 cursor-pointer" @click="closeForm" />
    <PetriDishSvg class="w-10 h-10 text-blue-500 mx-auto" />
    <div
      v-if="cultureFormTarget.id !== -1"
      class="flex justify-center gap-2 font-medium text-lg p-2 md:text-xl"
    >
      <h1>CLTR#{{ cultureFormTarget.id.toString().padStart(3, '0') }}</h1>
      <h1>{{ cultureFormTarget.genus + ' ' + cultureFormTarget.species }}</h1>
    </div>
    <div v-else>
      <h1 class="font-medium text-lg md:text-xl text-center p-2">Add a culture</h1>
    </div>

    <form @submit.prevent="handleCultureSubmit" class="flex flex-col gap-2 px-2 py-1">
      <input
        type="text"
        placeholder="Genus"
        class="rounded-md border border-gray-200 transition duration-300 ease-out outline-0 indent-1 hover:border-gray-300"
        v-model="genus"
      />
      <input
        type="text"
        placeholder="Species"
        class="rounded-md border border-gray-200 transition duration-300 ease-out outline-0 indent-1 hover:border-gray-300"
        v-model="species"
      />
      <textarea
        placeholder="Source"
        class="rounded-md border border-gray-200 transition duration-300 ease-out outline-0 indent-1 hover:border-gray-300"
        v-model="source"
      ></textarea>
      <br />
      <button
        v-if="cultureFormTarget.id == -1"
        type="submit"
        class="bg-blue-500 text-white rounded-md p-2 mx-auto flex justify-center gap-3 transition-all duration-300 ease-out hover:bg-blue-700"
        :class="{ 'w-32': !isLoading, 'w-60': isLoading }"
      >
        Add culture
        <SpinnerSvg v-if="isLoading" />
      </button>
      <button
        v-else
        type="submit"
        class="bg-blue-500 text-white rounded-md p-2 mx-auto flex justify-center gap-3 transition duration-300 ease-out hover:bg-blue-700"
        :class="{ 'w-32': !isLoading, 'w-60': isLoading }"
      >
        Edit culture
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import { useUserStore } from '@/stores/user'
import { useCultureStore, type CulturePayload } from '@/stores/cultures'
import { storeToRefs } from 'pinia'
import ArrowLeftSvg from '@/assets/components/svg/ArrowLeftSvg.vue'
import PetriDishSvg from '@/assets/components/svg/PetriDishSvg.vue'
import SpinnerSvg from '@/assets/components/svg/SpinnerSvg.vue'
import { ref, watch, onMounted } from 'vue'

const formStore = useFormStore()
const userStore = useUserStore()
const { postCulture, addToCultures, patchCulture, updateCultureData } = useCultureStore()
const { viewForm, cultureFormTarget } = storeToRefs(formStore)
const { data } = storeToRefs(userStore)

const isLoading = ref(false)
const genus = ref('')
const species = ref('')
const source = ref('')

const updateRefValues = () => {
  genus.value = cultureFormTarget.value.genus
  species.value = cultureFormTarget.value.species
  source.value = cultureFormTarget.value.source
}

onMounted(() => {
  updateRefValues()
})

watch(cultureFormTarget, () => {
  updateRefValues()
})

const closeForm = () => {
  if (viewForm.value) {
    formStore.toggleView()
    setTimeout(() => {
      formStore.clearCultureTarget(false)
    }, 300)
  }
}

const handleCultureSubmit = async () => {
  if (!genus.value.length || !species.value.length) return

  isLoading.value = true

  if (cultureFormTarget.value.id === -1) {
    await createCulture()
  } else {
    await updateCulture()
  }
  isLoading.value = false
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
  updateCultureData(cultureFormTarget.value.id, cultureRes)
}
</script>
-
