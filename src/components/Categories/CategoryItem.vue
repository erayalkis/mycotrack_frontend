<template>
  <div class="flex flex-col text-center border border-gray-100 rounded-md w-32 p-2">
    <img :src="data.icon" />
    <h1>{{ data.name }}</h1>
  </div>
</template>
<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
