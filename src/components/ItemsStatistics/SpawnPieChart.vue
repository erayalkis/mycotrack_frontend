<template>
  <div>
    <h1 v-if="allDataNull">Start adding some data to see your statistics!</h1>
    <PieChart
      v-if="!allDataNull"
      ref="pieRef"
      class="w-64 h-64 mx-auto mt-1"
      :chartData="chartData"
      :options="options"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { PieChart, type ExtractComponentData } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { useStatisticsStore } from '@/stores/statistics'
import { mapStores } from 'pinia'

Chart.register(...registerables)

export default defineComponent({
  name: 'CultureUsageDonutChart',
  components: { PieChart },

  setup() {
    const pieRef = ref<ExtractComponentData<typeof PieChart>>()

    return { pieRef }
  },
  computed: {
    ...mapStores(useStatisticsStore),
    allDataNull() {
      return (
        this.statisticsStore.spawnUsageStatistics.usedSpawns.length === 0 &&
        this.statisticsStore.spawnUsageStatistics.unusedSpawns.length === 0
      )
    },
    chartData() {
      return {
        labels: ['Unused', 'Used'],
        datasets: [
          {
            data: [
              this.statisticsStore.spawnUsageStatistics.unusedSpawns.length,
              this.statisticsStore.spawnUsageStatistics.usedSpawns.length
            ],
            backgroundColor: ['#44b4db', '#55c9f2']
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
                console.log(item)
                let body = '\n'
                if (item[0].label === 'Unused') {
                  this.statisticsStore.spawnUsageStatistics.unusedSpawns.forEach((spawn, idx) => {
                    const newLine = `- SPWN#${
                      spawn.id.toString().padStart(3, '0') + ' | ' + spawn.substrate
                    }`
                    const isLastIdx =
                      idx === this.statisticsStore.spawnUsageStatistics.unusedSpawns.length - 1
                    body += newLine
                    if (!isLastIdx) body += '\n'
                  })
                } else if (item[0].label === 'Used') {
                  this.statisticsStore.spawnUsageStatistics.usedSpawns.forEach((spawn, idx) => {
                    const newLine = `- SPWN#${
                      spawn.id.toString().padStart(3, '0') + ' | ' + spawn.substrate
                    }`
                    const isLastIdx =
                      idx === this.statisticsStore.spawnUsageStatistics.usedSpawns.length - 1
                    body += newLine
                    if (!isLastIdx) body += '\n'
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
