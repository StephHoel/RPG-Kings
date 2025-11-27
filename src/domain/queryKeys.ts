import { InventoryModel, SaveModel, XPRecordModel } from './models'

export const useQueryKeys = {
  saveActive: () => ['saves', 'active'],
  sheetActive: () => ['sheet', 'active'],
  statsActive: () => ['stats', 'active'],
  
  saves: () => ['saves'],
  
  saveId: (id: SaveModel['id']) => ['save', id],

  inventory: (saveId: InventoryModel['saveId']) => ['inventory', saveId],

  xps: (saveId: XPRecordModel['saveId']) => ['xps', saveId],

  // TODO tirar query de scene futuramente
  scene: (saveId: string) => ['scene', saveId],
} as const
