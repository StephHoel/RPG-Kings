import { ItemList } from '@/infra/schemas'

export const itemSeed: ItemList[] = [
  {
    id: 1,
    name: 'Poção Pequena',
    description: 'Restaura uma pequena quantidade de HP',
    durationWeeks: 0,
    cost: 5,
    type: 'healing',
  },
]
