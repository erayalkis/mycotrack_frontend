<template>
  <div class="p-2 text-center flex flex-col justify-center mt-2 items-center mt-10">
    <h1 class="text-2xl mb-3">Statistics</h1>
    <div class="flex gap-5 flex-wrap items-center justify-center h-full w-full">
      <div class="border border-gray-300 rounded-md w-full h-80 select-none md:w-80">
        <h1 class="p-3 text-lg border-b border-gray-300">Culture Usage Data</h1>
        <CultureDoughnutChart />
      </div>
      <div class="border border-gray-300 rounded-md w-full h-80 select-none md:w-80">
        <h1 class="p-3 text-lg border-b border-gray-300">Spawn Usage Data</h1>
        <SpawnPieChart />
      </div>
      <div class="border border-gray-300 rounded-md w-full h-80 select-none md:w-80">
        <h1>Status of blocks</h1>
        <div>Graph</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CultureDoughnutChart from './CultureDoughnutChart.vue'
import SpawnPieChart from './SpawnPieChart.vue'
</script>
