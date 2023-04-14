<template>
  <div>
    <h1 v-if="allDataNull">Start adding some data to see your statistics!</h1>
    <DoughnutChart
      v-if="!allDataNull"
      ref="doughnutRef"
      class="w-64 h-64 mx-auto mt-1"
      :chartData="chartData"
      :options="options"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { DoughnutChart, type ExtractComponentData } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { useStatisticsStore } from '@/stores/statistics'
import { mapStores } from 'pinia'

Chart.register(...registerables)

export default defineComponent({
  name: 'CultureUsageDonutChart',
  components: { DoughnutChart },

  setup() {
    const doughnutRef = ref<ExtractComponentData<typeof DoughnutChart>>()

    return { doughnutRef }
  },
  computed: {
    ...mapStores(useStatisticsStore),
    allDataNull() {
      return (
        this.statisticsStore.cultureUsageStatistics.unusedCultures.length === 0 &&
        this.statisticsStore.cultureUsageStatistics.usedOnceCultures.length === 0 &&
        this.statisticsStore.cultureUsageStatistics.usedMultipleCultures.length === 0
      )
    },
    chartData() {
      return {
        labels: ['Unused', 'Used Once', 'Used Multiple Times'],
        datasets: [
          {
            data: [
              this.statisticsStore.cultureUsageStatistics.unusedCultures.length,
              this.statisticsStore.cultureUsageStatistics.usedOnceCultures.length,
              this.statisticsStore.cultureUsageStatistics.usedMultipleCultures.length
            ],
            backgroundColor: ['#77CEFF', '#44b4db', '#55c9f2']
          }
        ]
      }
    },
    options() {
      return {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              afterBody: (item: any) => {
                let body = '\n'
                if (item[0].label === 'Unused') {
                  this.statisticsStore.cultureUsageStatistics.unusedCultures.forEach(
                    (culture, idx) => {
                      const newLine = `- ${culture.genus + ' ' + culture.species}`
                      const isLastIdx =
                        idx ===
                        this.statisticsStore.cultureUsageStatistics.unusedCultures.length - 1
                      body += newLine
                      if (!isLastIdx) body += '\n'
                    }
                  )
                } else if (item[0].label === 'Used Once') {
                  this.statisticsStore.cultureUsageStatistics.usedOnceCultures.forEach(
                    (culture, idx) => {
                      const newLine = `- ${culture.genus + ' ' + culture.species}`
                      const isLastIdx =
                        idx ===
                        this.statisticsStore.cultureUsageStatistics.usedOnceCultures.length - 1
                      body += newLine
                      if (!isLastIdx) body += '\n'
                    }
                  )
                } else if (item[0].label === 'Used Multiple Times') {
                  this.statisticsStore.cultureUsageStatistics.usedMultipleCultures.forEach(
                    (culture, idx) => {
                      const newLine = `- ${culture.genus + ' ' + culture.species}`
                      const isLastIdx =
                        idx ===
                        this.statisticsStore.cultureUsageStatistics.usedMultipleCultures.length - 1
                      body += newLine
                      if (!isLastIdx) body += '\n'
                    }
                  )
                }

                return body
              }
            }
          }
        }
      }
    }
  }
})
</script>
