import { Inventory } from '@/infra/schemas'

export const inventorySeed: Inventory[] = [
  {
    id: 1,
    saveId: 'default',
    item: 'Notebook',
    type: 'eletronic',
    durationWeeks: 0,
    acquiredWeek: 1,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: 2,
    saveId: 'default',
    item: 'Lanterna',
    type: 'eletronic',
    durationWeeks: 0,
    acquiredWeek: 1,
    expiresAtWeek: 5,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
]
