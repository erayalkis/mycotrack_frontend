<template>
  <NavbarMain class="h-fit" />
  <main class="w-full h-full">
    <RouterView />
  </main>
</template>
<script setup lang="ts">
import NavbarMain from './components/Navbar/NavbarMain.vue'
</script>
