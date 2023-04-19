<template>
  <div>
    <h1 v-if="allDataNull">Start adding some data to see your statistics!</h1>
    <DoughnutChart
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
import { DoughnutChart, type ExtractComponentData } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { useStatisticsStore } from '@/stores/statistics'
import { mapStores } from 'pinia'

Chart.register(...registerables)

export default defineComponent({
  name: 'CultureUsageDonutChart',
  components: { DoughnutChart },

  setup() {
    const pieRef = ref<ExtractComponentData<typeof DoughnutChart>>()

    return { pieRef }
  },
  computed: {
    ...mapStores(useStatisticsStore),
    allDataNull() {
      return (
        this.statisticsStore.spawnUsageStatistics.usedOnceSpawns.length === 0 &&
        this.statisticsStore.spawnUsageStatistics.usedMultipleSpawns.length === 0 &&
        this.statisticsStore.spawnUsageStatistics.unusedSpawns.length === 0
      )
    },
    chartData() {
      return {
        labels: ['Unused', 'Used Once', 'Used Multiple Times'],
        datasets: [
          {
            data: [
              this.statisticsStore.spawnUsageStatistics.unusedSpawns.length,
              this.statisticsStore.spawnUsageStatistics.usedOnceSpawns.length,
              this.statisticsStore.spawnUsageStatistics.usedMultipleSpawns.length
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
                console.log(item)
                let body = '\n'
                console.log(item[0].label)
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
                } else if (item[0].label === 'Used Once') {
                  this.statisticsStore.spawnUsageStatistics.usedOnceSpawns.forEach((spawn, idx) => {
                    const newLine = `- SPWN#${
                      spawn.id.toString().padStart(3, '0') + ' | ' + spawn.substrate
                    }`
                    const isLastIdx =
                      idx === this.statisticsStore.spawnUsageStatistics.usedOnceSpawns.length - 1
                    body += newLine
                    if (!isLastIdx) body += '\n'
                  })
                } else if (item[0].label === 'Used Multiple Times') {
                  this.statisticsStore.spawnUsageStatistics.usedMultipleSpawns.forEach(
                    (spawn, idx) => {
                      const newLine = `- SPWN#${
                        spawn.id.toString().padStart(3, '0') + ' | ' + spawn.substrate
                      }`
                      const isLastIdx =
                        idx ===
                        this.statisticsStore.spawnUsageStatistics.usedMultipleSpawns.length - 1
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
