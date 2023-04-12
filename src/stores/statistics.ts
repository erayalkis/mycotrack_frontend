import { defineStore, storeToRefs } from 'pinia'
import { useCultureStore, type Culture } from './cultures'
import { useBlockStore } from './blocks'
import { useSpawnStore } from './spawns'

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
  const cultureUsageStatistics = () => {
    const statistics: { [key: string]: Culture[] } = {}

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

    return statistics
  }

  return { cultureUsageStatistics }
})