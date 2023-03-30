<template>
  <NavbarMain class="h-fit" />
  <main class="w-full h-full">
    <RouterView />
  </main>
  <AlertMain message="Debug Message." type="success" />
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue'
import AlertMain from './components/Alert/AlertMain.vue'
import NavbarMain from './components/Navbar/NavbarMain.vue'
import { useUserStore } from './stores/user'

const { loadToken } = useUserStore()
onBeforeMount(async () => {
  await loadToken()
})
</script>
