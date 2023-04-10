<template>
  <NavbarMain class="h-fit" />
  <main class="w-full h-full mt-14">
    <RouterView />
  </main>
  <AlertMain />
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue'
import AlertMain from './components/Alert/AlertMain.vue'
import NavbarMain from './components/Navbar/NavbarMain.vue'
import { useUserStore } from './stores/user'

const { loadToken, fetchAndSetUserData } = useUserStore()
onBeforeMount(async () => {
  await loadToken()
  await fetchAndSetUserData()
})
</script>
