export type Category = {
  // Name of category
  name: String
  // Path of icon
  icon: String
}

export const categoriesData: Category[] = [
  {
    name: 'Cultures',
    icon: './assets/icons/CulturesIcon.svg'
  },
  {
    name: 'Spawns',
    icon: './assets/icons/SpawnsIcon.svg'
  },
  {
    name: 'Grow Blocks',
    icon: './assets/icons/GrowBlockIcon.svg'
  }
]
