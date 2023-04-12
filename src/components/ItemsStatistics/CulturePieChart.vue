<template>
  <div>
    <DoughnutChart ref="doughnutRef" :chartData="testData" :options="options" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { DoughnutChart, type ExtractComponentData } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
export default defineComponent({
  name: 'CultureUsageDonutChart',
  components: { DoughnutChart },
  setup() {
    const data = ref([30, 40, 60, 70, 5])
    const doughnutRef = ref<ExtractComponentData<typeof DoughnutChart>>()

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      }
    }

    const testData = computed(() => ({
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          data: data.value,
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED']
        }
      ]
    }))

    return { testData, doughnutRef, options }
  }
})
</script>
