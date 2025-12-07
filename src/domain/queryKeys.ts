import { InventoryModel, SaveModel, XPRecordModel } from './models'

export const useQueryKeys = {
  saveActive: () => ['saves', 'active'],
  sheetActive: () => ['sheet', 'active'],
  statsActive: () => ['stats', 'active'],

  allSaves: () => ['saves'],

  saveId: (id: SaveModel['id']) => ['save', id],

  inventory: (saveId: InventoryModel['saveId']) => ['inventory', saveId],

  xps: (saveId: XPRecordModel['saveId']) => ['xps', saveId],
} as const
