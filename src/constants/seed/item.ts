import { ItemsTagEnum } from '@/enums'
import { Item } from '@/interfaces'

export const itemSeed: Item[] = [
  {
    id: 1,
    name: 'Poção Pequena',
    description: 'Restaura uma pequena quantidade de HP',
    durationWeeks: 0,
    tags: [ItemsTagEnum.enum.HEALING, ItemsTagEnum.enum.CONSUMABLE]
  },
  {
    id: 2,
    name: 'Pedra Mística',
    description: 'Material raro para alquimia',
    durationWeeks: 0,
    tags: []
  },
]