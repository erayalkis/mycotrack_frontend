<template>
  <nav class="fixed w-full top-0 flex justify-between bg-gray-200 z-50">
    <RouterLink to="/">
      <h1 class="text-3xl p-2">Myco<span class="text-blue-500">Track</span></h1>
    </RouterLink>
    <template v-if="isLoggedIn">
      <div class="text-lg my-auto mr-2 flex gap-5 select-none flex-wrap md:text-xl">
        <h1>{{ data.username }}</h1>
        <h1 @click="signOut" class="cursor-pointer">Sign Out</h1>
      </div>
    </template>
    <template v-else>
      <div class="flex text-2xl gap-5 my-auto align-center mr-2">
        <RouterLink to="/login">
          <h1>Sign in</h1>
        </RouterLink>
        <RouterLink to="/signup">
          <h1>Sign up</h1>
        </RouterLink>
      </div>
    </template>
  </nav>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const { push } = useRouter()
const userStore = useUserStore()
const { isLoggedIn, data } = storeToRefs(userStore)

const signOut = async () => {
  await userStore.signOut()
  push('/login')
}
</script>
