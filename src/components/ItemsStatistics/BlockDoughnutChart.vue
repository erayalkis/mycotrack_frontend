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
      return Object.values(this.statisticsStore.blockUsageStatistics).every(
        (blocks) => blocks.length === 0
      )
    },
    chartData() {
      return {
        labels: ['Inoculated', 'Mycelium Healthy', 'Fruiting / Harvesting', 'Discarded'],
        datasets: [
          {
            data: [
              this.statisticsStore.blockUsageStatistics['Inoculated'].length,
              this.statisticsStore.blockUsageStatistics['Mycelium Healthy'].length,
              this.statisticsStore.blockUsageStatistics['Fruiting / Harvesting'].length,
              this.statisticsStore.blockUsageStatistics['Discarded'].length
            ],
            // 53b8e9
            // '#62bce7' <- old
            backgroundColor: ['#77CEFF', '#44b4db', '#55c9f2', '#409DC7']
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
                if (item[0].label === 'Inoculated') {
                  this.statisticsStore.blockUsageStatistics['Inoculated'].forEach((block, idx) => {
                    const newLine =
                      `- BLCK#${block.id.toString().padStart(3, '0')}` + ' | ' + block.substrate
                    const isLastIdx =
                      idx === this.statisticsStore.blockUsageStatistics['Inoculated'].length - 1
                    body += newLine
                    if (!isLastIdx) body += `\n`
                  })
                } else if (item[0].label === 'Mycelium Healthy') {
                  this.statisticsStore.blockUsageStatistics['Mycelium Healthy'].forEach(
                    (block, idx) => {
                      const newLine =
                        `- BLCK#${block.id.toString().padStart(3, '0')}` + ' | ' + block.substrate
                      const isLastIdx =
                        idx ===
                        this.statisticsStore.blockUsageStatistics['Mycelium Healthy'].length - 1
                      body += newLine
                      if (!isLastIdx) body += `\n`
                    }
                  )
                } else if (item[0].label === 'Fruiting / Harvesting') {
                  this.statisticsStore.blockUsageStatistics['Fruiting / Harvesting'].forEach(
                    (block, idx) => {
                      const newLine =
                        `- BLCK#${block.id.toString().padStart(3, '0')}` + ' | ' + block.substrate
                      const isLastIdx =
                        idx ===
                        this.statisticsStore.blockUsageStatistics['Fruiting / Harvesting'].length -
                          1
                      body += newLine
                      if (!isLastIdx) body += `\n`
                    }
                  )
                } else if (item[0].label === 'Discarded') {
                  this.statisticsStore.blockUsageStatistics['Discarded'].forEach((block, idx) => {
                    const newLine =
                      `- BLCK#${block.id.toString().padStart(3, '0')}` + ' | ' + block.substrate
                    const isLastIdx =
                      idx === this.statisticsStore.blockUsageStatistics['Discarded'].length - 1
                    body += newLine
                    if (!isLastIdx) body += `\n`
                  })
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
