<template>
  <div>
    <ArrowLeftSvg class="w-8 h-8 m-2 cursor-pointer" @click="closeForm" />
    <MushroomSvg class="w-10 h-10 text-blue-500 mx-auto" />
    <div
      v-if="blockFormTarget.id !== -1"
      class="flex justify-center gap-2 font-medium text-lg p-2 md:text-xl"
    >
      <h1>BLCK#{{ blockFormTarget.id.toString().padStart(3, '0') }}</h1>
    </div>
    <div v-else>
      <h1 class="font-medium text-lg md:text-xl text-center p-2">Add a block</h1>
    </div>

    <form @submit.prevent="handleCultureSubmit" class="flex flex-col gap-2 px-2 py-1">
      <select class="border border-gray-200 rounded-md outline-0 hover:0" v-model="spawnId">
        <option disabled :value="-1">Select a spawn</option>
        <template v-for="spawn in spawns" :key="spawn.id">
          <option :value="spawn.id">
            SPWN#{{ spawn.id.toString().padStart(3, '0') }} | {{ spawn.substrate }}
          </option>
        </template>
      </select>
      <textarea
        placeholder="Substrate"
        class="rounded-md border border-gray-200 transition duration-300 ease-out outline-0 indent-1 hover:border-gray-300"
        v-model="substrate"
      ></textarea>
      <br />
      <br />
      <button
        v-if="blockFormTarget.id == -1"
        type="submit"
        class="bg-blue-500 text-white rounded-md w-32 p-2 mx-auto transition duration-300 ease-out hover:bg-blue-700"
      >
        Add block
      </button>
      <button
        v-else
        type="submit"
        class="bg-blue-500 text-white rounded-md w-32 p-2 mx-auto transition duration-300 ease-out hover:bg-blue-700"
      >
        Edit block
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import { useUserStore } from '@/stores/user'
import { useBlockStore, type BlockPayload } from '@/stores/blocks'
import { storeToRefs } from 'pinia'
import ArrowLeftSvg from '@/assets/components/svg/ArrowLeftSvg.vue'
import MushroomSvg from '@/assets/components/svg/MushroomSvg.vue'
import { ref, watch, onMounted } from 'vue'
import { useSpawnStore } from '@/stores/spawns'

const formStore = useFormStore()
const { spawns } = useSpawnStore()
const userStore = useUserStore()
const { postBlock, addToBlocks, updateBlockData, patchBlock } = useBlockStore()
const { viewForm, blockFormTarget } = storeToRefs(formStore)
const { data } = storeToRefs(userStore)

const substrate = ref('')
const spawnId = ref(-1)

const updateRefValues = () => {
  substrate.value = blockFormTarget.value.substrate
  if (blockFormTarget.value.spawn_id) {
    spawnId.value = blockFormTarget.value.spawn_id
  }
}

onMounted(() => {
  updateRefValues()
})

watch(blockFormTarget, () => {
  updateRefValues()
})

const closeForm = () => {
  if (viewForm.value) {
    formStore.toggleView()
    setTimeout(() => {
      formStore.clearCultureTarget()
    }, 300)
  }
}

const handleCultureSubmit = async () => {
  if (blockFormTarget.value.id === -1) {
    createBlock()
  } else {
    updateBlock()
  }
}

const createBlock = async () => {
  if (data.value.id === null) return

  const block: BlockPayload = {
    id: null,
    spawn_id: spawnId.value,
    substrate: substrate.value,
    user_id: data.value.id
  }

  const cultureRes = await postBlock(block)
  addToBlocks(cultureRes)
}

const updateBlock = async () => {
  if (data.value.id === null) return

  const block: BlockPayload = {
    id: blockFormTarget.value.id,
    spawn_id: spawnId.value,
    substrate: substrate.value,
    user_id: data.value.id
  }

  const blockRes = await patchBlock(block)
  console.log(blockRes)
  updateBlockData(blockFormTarget.value.id, blockRes)
}
</script>
-
