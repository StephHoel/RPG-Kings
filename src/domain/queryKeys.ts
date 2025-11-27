export const useQueryKeys = {
  saveActive: () => ['saves', 'active'],
  sheetActive: () => ['sheet', 'active'],
  statsActive: () => ['stats', 'active'],
  
  saves: () => ['saves'],
  
  saveId: (id: string) => ['save', id],

  inventory: (saveId: string) => ['inventory', saveId],

  // TODO tirar query de scene futuramente
  scene: (saveId: string) => ['scene', saveId],
} as const
