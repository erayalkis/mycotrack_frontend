import CategoryItem from './CategoryItem.vue';

<template>
  <div class="p-2 mt-1">
    <h1 class="text-2xl">Categories</h1>
    <div class="flex flex-wrap gap-3 mt-3">
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
