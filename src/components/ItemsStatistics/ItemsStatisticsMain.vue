<template>
  <div class="p-2 text-center flex flex-col justify-center mt-2 items-center mt-10">
    <div class="flex gap-2 items-center mb-5">
      <h1 class="text-2xl">Statistics</h1>
      <PieChartSvg class="w-8 h-8 text-blue-500" />
    </div>

    <div class="flex gap-5 flex-wrap items-center justify-center h-full w-full">
      <div class="border border-gray-300 rounded-md w-full h-80 select-none md:w-80">
        <div
          class="flex w-full p-3 text-lg border-b border-gray-300 items-center justify-center gap-2"
        >
          <h1 class="">Culture Usage Data</h1>
        </div>
        <CultureDoughnutChart />
      </div>
      <div class="border border-gray-300 rounded-md w-full h-80 select-none md:w-80">
        <h1 class="p-3 text-lg border-b border-gray-300">Spawn Usage Data</h1>
        <SpawnPieChart />
      </div>
      <div class="border border-gray-300 rounded-md w-full h-80 select-none md:w-80">
        <h1 class="p-3 text-lg border-b border-gray-300">Block Status Data</h1>
        <BlockDoughnutChart />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PieChartSvg from '@/assets/components/svg/PieChartSvg.vue'
import BlockDoughnutChart from './BlockDoughnutChart.vue'
import CultureDoughnutChart from './CultureDoughnutChart.vue'
import SpawnPieChart from './SpawnDoughnutChart.vue'
</script>
