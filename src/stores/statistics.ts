import { defineStore, storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useCultureStore, type Culture } from './cultures'
import { useBlockStore, type Block } from './blocks'
import { useSpawnStore, type Spawn } from './spawns'

export const useStatisticsStore = defineStore('statistics', () => {
  const cultureStore = useCultureStore()
  const spawnStore = useSpawnStore()
  const blockStore = useBlockStore()

  const { cultures } = storeToRefs(cultureStore)
  const { spawns } = storeToRefs(spawnStore)
  const { blocks } = storeToRefs(blockStore)

  // Provides statistics about culture usage.
  // unusedCultures: Array of cultures who have not been used in a spawn bag yet
  // usedOnceCultures: Array of cultures that have been used once
  // usedMultipleCultures: Array of cultures that have been used more than once
  const cultureUsageStatistics = computed(() => {
    const statistics: { [key: string]: Array<Culture> } = {
      unusedCultures: [],
      usedOnceCultures: [],
      usedMultipleCultures: []
    }

    cultures.value.forEach((culture) => {
      // Filtered array of spawns where culture_id matches current culture's id. Gives us a usage count of the current culture
      const usedCount = spawns.value.filter((spawn) => spawn.culture_id === culture.id).length

      if (usedCount === 0) {
        statistics.unusedCultures.push(culture)
      } else if (usedCount === 1) {
        statistics.usedOnceCultures.push(culture)
      } else {
        statistics.usedMultipleCultures.push(culture)
      }
    })

    console.log(statistics)
    return statistics
  })

  const spawnUsageStatistics = computed(() => {
    const statistics: { [key: string]: Array<Spawn> } = {
      usedOnceSpawns: [],
      usedMultipleSpawns: [],
      unusedSpawns: []
    }

    spawns.value.forEach((spawn) => {
      const usedCount = blocks.value.filter((block) => block.spawn_id === spawn.id).length

      if (usedCount === 0) {
        statistics.unusedSpawns.push(spawn)
      } else if (usedCount === 1) {
        statistics.usedOnceSpawns.push(spawn)
      } else {
        statistics.usedMultipleSpawns.push(spawn)
      }
    })

    console.log(statistics)
    return statistics
  })

  const blockUsageStatistics = computed(() => {
    const statistics: { [key: string]: Array<Block> } = {
      Inoculated: [],
      'Mycelium Healthy': [],
      'Fruiting / Harvesting': [],
      Discarded: []
    }

    blocks.value.forEach((block) => {
      const status = block.status

      if (status === 0) {
        statistics['Inoculated'].push(block)
      } else if (status === 1) {
        statistics['Mycelium Healthy'].push(block)
      } else if (status === 2) {
        statistics['Fruiting / Harvesting'].push(block)
      } else if (status === 3) {
        statistics['Discarded'].push(block)
      }
    })

    console.log(statistics)
    return statistics
  })

  return { cultureUsageStatistics, spawnUsageStatistics, blockUsageStatistics }
})
