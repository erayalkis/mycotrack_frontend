<template>
  <div class="p-2 w-64 mx-auto my-auto">
    <h1 class="text-5xl mb-10 text-center">Myco<span class="text-blue-500">Track</span></h1>
    <h1 class="text-2xl mb-2">Signup</h1>
    <div class="flex flex-col">
      <label>Username</label>
      <input
        placeholder="Username"
        class="border border-gray-300 p-1 rounded-md transition duration-300 ease-out hover:bg-gray-100 outline-none indent-1 mb-2"
      />
      <label>Email</label>
      <input
        placeholder="Email"
        class="border border-gray-300 p-1 rounded-md transition duration-300 ease-out hover:bg-gray-100 outline-none indent-1 mb-2"
      />
      <label>Password</label>
      <input
        placeholder="Password"
        type="password"
        class="border border-gray-300 p-1 rounded-md transition duration-300 ease-out hover:bg-gray-100 outline-none indent-1 mb-2"
      />
      <label>Password Confirmation</label>
      <input
        placeholder="Password"
        type="password"
        class="border border-gray-300 p-1 rounded-md transition duration-300 ease-out hover:bg-gray-100 outline-none indent-1"
      />
      <button
        class="border border-gray-300 p-1 mt-3 rounded-md transition duration-300 ease-out hover:bg-gray-200"
        @click="signup"
      >
        Sign Up
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { serverConfig } from '@/config/serverConfig'

const signup = () => {
  console.log(serverConfig)
}
</script>
