import petriDish from '@/assets/svg/petri-dish.svg?url'
import jar from '@/assets/svg/jar.svg?url'
import mushroom from '@/assets/svg/mushroom.svg?url'

export type Category = {
  // Name of category
  name: string
  // Path of icon
  icon: string
}

export const categoriesData: Category[] = [
  {
    name: 'Cultures',
    icon: petriDish
  },
  {
    name: 'Spawns',
    icon: jar
  },
  {
    name: 'Grow Blocks',
    icon: mushroom
  }
]
