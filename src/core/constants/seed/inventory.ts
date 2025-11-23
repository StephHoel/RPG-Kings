import { Inventory } from '@/core/types'

export const inventorySeed: Inventory[] = [
  {
    id: 1,
    saveId: 'default',
    name: 'Notebook',
    durationWeeks: 0,
    usedAtWeek: null,
    acquiredWeek: 1,
    expiresAtWeek: null,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: 2,
    saveId: 'default',
    name: 'Lanterna',
    durationWeeks: 0,
    usedAtWeek: null,
    acquiredWeek: 1,
    expiresAtWeek: 5,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
]
