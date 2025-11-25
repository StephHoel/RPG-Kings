import { ITEM_ENUM, ITEM_TYPE } from '@/domain/constants'
import { Inventory } from '@/infra/schemas'

export const inventoriesSeed: Inventory[] = [
  {
    saveId: 'save_1',
    item: ITEM_ENUM.notebook,
    type: ITEM_TYPE.wearable,
    acquiredWeek: 1,
    durationWeeks: 1,
    expiresAtWeek: 2,
  },
  {
    saveId: 'default',
    item: ITEM_ENUM.laptop,
    type: ITEM_TYPE.eletronic,
    durationWeeks: 0,
    acquiredWeek: 1,
  },
]
