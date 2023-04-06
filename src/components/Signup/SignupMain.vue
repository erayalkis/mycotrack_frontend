<template>
  <div class="p-2 w-64 mx-auto my-auto">
    <h1 class="text-5xl mb-10 text-center">Myco<span class="text-blue-500">Track</span></h1>
    <h1 class="text-2xl mb-2">Sign Up</h1>
    <form class="flex flex-col" @submit.prevent="signup">
      <label>Username</label>
      <input
        placeholder="Username"
        class="border border-gray-300 p-1 rounded-md transition duration-300 ease-out hover:bg-gray-100 outline-none indent-1 mb-2"
        v-model="username"
        required
      />
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
        class="border border-gray-300 p-1 rounded-md transition duration-300 ease-out hover:bg-gray-100 outline-none indent-1 mb-2"
        v-model="password"
        required
      />
      <label>Password Confirmation</label>
      <input
        placeholder="Password Confirmation"
        type="password"
        class="border border-gray-300 p-1 rounded-md transition duration-300 ease-out hover:bg-gray-100 outline-none indent-1"
        v-model="passwordConfirmation"
        required
      />
      <!-- The disabled attribute below throws a fuss when we don't pass it pure boolean values for some reason? -->
      <button
        class="border flex justify-center gap-2 align-center border-gray-300 p-1 mt-3 rounded-md transition duration-300 ease-out hover:bg-gray-200 disabled:bg-gray-200"
        type="submit"
        :disabled="isSigningUp ? true : false"
      >
        Sign Up
        <SpinnerSvg v-if="isSigningUp" />
      </button>
    </form>
    <p class="text-sm opacity-50 mt-4 text-center">
      Already have an account?
      <RouterLink to="/login" class="underline">Sign In</RouterLink>
    </p>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import SpinnerSvg from '@/assets/components/svg/SpinnerSvg.vue'
const { signUp } = useUserStore()

const { push } = useRouter()
const username: Ref<String> = ref('')
const email: Ref<String> = ref('')
const password: Ref<String> = ref('')
const passwordConfirmation: Ref<String> = ref('')
const isSigningUp: Ref<Boolean> = ref(false)

const signup = async () => {
  if (isSigningUp.value) return
  if (
    username.value.trim() == '' ||
    email.value.trim() == '' ||
    password.value.trim() == '' ||
    passwordConfirmation.value.trim() == ''
  ) {
    username.value = ''
    email.value = ''
    password.value = ''
    passwordConfirmation.value = ''
    return
  }

  isSigningUp.value = true
  const ret = await signUp(username.value, email.value, password.value, passwordConfirmation.value)
  console.log(ret)
  isSigningUp.value = false
  push('/')
}
</script>
