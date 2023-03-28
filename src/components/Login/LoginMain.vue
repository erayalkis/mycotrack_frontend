<template>
  <div class="p-2 w-64 mx-auto my-auto">
    <h1 class="text-5xl mb-10 text-center">Myco<span class="text-blue-500">Track</span></h1>
    <h1 class="text-2xl mb-2">Sign In</h1>
    <form class="flex flex-col" @submit.prevent="login">
      <label>Email</label>
      <input
        placeholder="Email"
        class="border border-gray-300 p-1 rounded-md transition duration-300 ease-out hover:bg-gray-100 outline-none indent-1 mb-2"
        v-model="email"
        required
      />
      <label>Password</label>
      <input
        placeholder="Password"
        type="password"
        class="border border-gray-300 p-1 rounded-md transition duration-300 ease-out hover:bg-gray-100 outline-none indent-1"
        v-model="password"
        required
      />
      <!-- The disabled attribute below throws a fuss when we don't pass it pure boolean values for some reason? -->
      <button
        class="border flex justify-center gap-2 align-center border-gray-300 p-1 mt-3 rounded-md transition duration-300 ease-out hover:bg-gray-200 disabled:bg-gray-200"
        type="submit"
        :disabled="isLogginIn ? true : false"
      >
        Login
        <SpinnerSvg v-if="isLogginIn" />
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref, type Ref } from 'vue'
import SpinnerSvg from '@/assets/components/svg/SpinnerSvg.vue'
const { signIn } = useUserStore()

const email: Ref<String> = ref('')
const password: Ref<String> = ref('')
const isLogginIn: Ref<Boolean> = ref(false)

const login = async () => {
  if (isLogginIn.value) return

  isLogginIn.value = true
  const ret = await signIn(email.value, password.value)
  console.log(ret)
  isLogginIn.value = false
}
</script>
