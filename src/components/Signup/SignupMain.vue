<template>
  <div class="p-2 w-64">
    <h1 class="text-2xl">Signup</h1>
    <div class="flex flex-col">
      <label>Email</label>
      <input
        placeholder="Email"
        class="border border-gray-300 p-1 rounded-md transition duration-300 ease-out hover:bg-gray-100 outline-none indent-1"
      />
      <label>Password</label>
      <input
        placeholder="Password"
        class="border border-gray-300 p-1 rounded-md transition duration-300 ease-out hover:bg-gray-100 outline-none indent-1"
      />
      <label>Password Confirmation</label>
      <input
        placeholder="Password"
        class="border border-gray-300 p-1 rounded-md transition duration-300 ease-out hover:bg-gray-100 outline-none indent-1"
      />
      <button
        class="border border-gray-300 p-1 mt-3 rounded-md transition duration-300 ease-out hover:bg-gray-200"
      >
        Sign Up
      </button>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
