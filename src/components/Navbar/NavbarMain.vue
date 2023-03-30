<template>
  <nav class="flex justify-between bg-gray-200">
    <RouterLink to="/">
      <h1 class="text-3xl p-2">Myco<span class="text-blue-500">Track</span></h1>
    </RouterLink>
    <template v-if="isLoggedIn">
      <div class="text-2xl my-auto mr-2">
        <h1 @click="signOut">Sign Out</h1>
      </div>
    </template>
    <template v-else>
      <div class="flex text-2xl gap-5 my-auto align-center mr-2">
        <RouterLink to="/login">
          <h1>Sign in</h1>
        </RouterLink>
        <RouterLink to="/signup">
          <h1 class="cursor-pointer">Sign up</h1>
        </RouterLink>
      </div>
    </template>
  </nav>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)

const signOut = () => {
  console.log('hi')
}
</script>
