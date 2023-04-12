<template>
  <div>
    <DoughnutChart ref="doughnutRef" :chartData="chartData" :options="options" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
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
            backgroundColor: '#77CEFF'
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
