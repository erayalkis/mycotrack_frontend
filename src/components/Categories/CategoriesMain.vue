import CategoryItem from './CategoryItem.vue';

<template>
  <div class="p-2 mt-1 text-center">
    <h1 class="text-2xl">Categories</h1>
    <div class="flex flex-wrap gap-5 mt-3 justify-center">
      <template v-for="category in categoriesData" :key="category.name">
        <CategoryItem :data="category" />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import CategoryItem from './CategoryItem.vue'
import { categoriesData } from './categoriesData'
</script>
