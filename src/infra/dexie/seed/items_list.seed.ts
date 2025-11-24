import { ItemList } from '@/infra/schemas'

export const itemsListSeed: ItemList[] = [
  {
    id: 1,
    name: 'Potion',
    description: 'Recupera 20 de vida.',
    cost: 5,
    durationWeeks: 1,
    type: 'healing',
  },
  {
    id: 2,
    name: 'Magic Amulet',
    description: 'Aumenta a mana em 10.',
    cost: 25,
    durationWeeks: null,
    type: 'wearable',
  },
  {
    id: 3,
    name: 'Walkie-Talkie',
    description: 'Permite comunicação à distância.',
    cost: 12,
    durationWeeks: null,
    type: 'eletronic',
  },
]
