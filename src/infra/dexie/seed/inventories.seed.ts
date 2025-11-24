import { Inventory } from '@/infra/schemas'

export const inventoriesSeed: Inventory[] = [
  {
    id: 1,
    saveId: 'save_1',
    item: 'Potion',
    type: 'healing',
    acquiredWeek: 1,
    durationWeeks: 1,
    expiresAtWeek: 2,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: 2,
    saveId: 'default',
    item: 'Notebook',
    type: 'eletronic',
    durationWeeks: 0,
    acquiredWeek: 1,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: 3,
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
