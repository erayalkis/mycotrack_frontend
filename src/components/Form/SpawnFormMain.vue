<template>
  <div>
    <ArrowLeftSvg class="w-8 h-8 m-2 rotate-180 cursor-pointer" @click="closeForm" />
    <JarSvg class="w-10 h-10 text-blue-500 mx-auto" />
    <div
      v-if="spawnFormTarget.id !== -1"
      class="flex justify-center gap-2 font-medium text-lg p-2 md:text-xl"
    >
      <h1>SPWN#{{ spawnFormTarget.id.toString().padStart(3, '0') }}</h1>
    </div>
    <div v-else>
      <h1 class="font-medium text-lg md:text-xl text-center p-2">Add a spawn</h1>
    </div>

    <form @submit.prevent="handleSpawnSubmit" class="flex flex-col gap-2 px-2 py-1">
      <select class="border border-gray-200 rounded-md outline-0 hover:0" v-model="cultureId">
        <option disabled :value="-1">Select a culture</option>
        <template v-for="culture in cultures" :key="culture.id">
          <option :value="culture.id">{{ culture.genus + ' ' + culture.species }}</option>
        </template>
      </select>
      <textarea
        placeholder="Substrate"
        class="rounded-md border border-gray-200 transition duration-300 ease-out outline-0 indent-1 hover:border-gray-300"
        v-model="substrate"
      ></textarea>
      <br />
      <button
        v-if="spawnFormTarget.id == -1"
        type="submit"
        class="bg-blue-500 text-white rounded-md p-2 mx-auto flex justify-center gap-3 transition-all duration-300 ease-out hover:bg-blue-700"
        :class="{ 'w-32': !isLoading, 'w-60': isLoading }"
      >
        Add spawn
        <SpinnerSvg v-if="isLoading" />
      </button>
      <button
        v-else
        type="submit"
        class="bg-blue-500 text-white rounded-md p-2 mx-auto flex justify-center gap-3 transition-all duration-300 ease-out hover:bg-blue-700"
        :class="{ 'w-32': !isLoading, 'w-60': isLoading }"
      >
        Edit spawn
        <SpinnerSvg v-if="isLoading" />
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import ArrowLeftSvg from '@/assets/components/svg/ArrowLeftSvg.vue'
import JarSvg from '@/assets/components/svg/JarSvg.vue'
import SpinnerSvg from '@/assets/components/svg/SpinnerSvg.vue'
import { onMounted, ref, watch } from 'vue'
import { useSpawnStore, type SpawnPayload } from '@/stores/spawns'
import { useCultureStore } from '@/stores/cultures'

const { postSpawn, addToSpawns, patchSpawn, updateSpawnData } = useSpawnStore()
const { cultures } = useCultureStore()
const formStore = useFormStore()
const { spawnFormTarget, viewForm } = storeToRefs(formStore)

const userStore = useUserStore()
const { data } = storeToRefs(userStore)

const isLoading = ref(false)
const substrate = ref('')
const cultureId = ref(-1)

const updateRefValues = () => {
  if (spawnFormTarget.value.substrate !== null) {
    substrate.value = spawnFormTarget.value.substrate
  }
  if (spawnFormTarget.value.culture_id) {
    cultureId.value = spawnFormTarget.value.culture_id
  }
}

onMounted(() => {
  updateRefValues()
})

watch(spawnFormTarget, () => {
  updateRefValues()
})

const closeForm = () => {
  if (viewForm.value) {
    formStore.toggleView()
    setTimeout(() => {
      formStore.clearSpawnTarget(false)
    }, 300)
  }
}

const handleSpawnSubmit = async () => {
  if (!substrate.value.length || cultureId.value === -1) return

  isLoading.value = true
  if (spawnFormTarget.value.id === -1) {
    await createSpawn()
  } else {
    await updateSpawn()
  }
  isLoading.value = false
}

const createSpawn = async () => {
  if (data.value.id === null) return

  const spawn: SpawnPayload = {
    id: null,
    substrate: substrate.value,
    culture_id: cultureId.value,
    user_id: data.value.id
  }

  const spawnRes = await postSpawn(spawn)
  addToSpawns(spawnRes)
}

const updateSpawn = async () => {
  if (data.value.id === null) return

  const spawn: SpawnPayload = {
    id: spawnFormTarget.value.id,
    substrate: substrate.value,
    culture_id: cultureId.value,
    user_id: data.value.id
  }

  const spawnRes = await patchSpawn(spawn)
  console.log(spawnRes)
  updateSpawnData(spawnFormTarget.value.id, spawnRes)
}
</script>
