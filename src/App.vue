<template>
  <NavbarMain class="h-fit" />
  <main class="w-full h-full">
    <RouterView />
  </main>
  <AlertMain message="Debug Message." type="warn" />
</template>
<script setup lang="ts">
import AlertMain from './components/Alert/AlertMain.vue'
import NavbarMain from './components/Navbar/NavbarMain.vue'
</script>
