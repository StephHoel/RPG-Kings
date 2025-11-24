export const useQueryKeys = {
  saveActive: () => ['saves', 'active'],
  saveId: (id: string) => ['save', id],
  saves: () => ['saves'],
  inventory: (saveId: string) => ['inventory', saveId],
  discipline: (saveId: string, discipline: string) => ['discipline', saveId, discipline],
  sheet: (saveId: string) => ['sheet', saveId],
  milestones: (saveId: string) => ['milestones', saveId],
  scene: (saveId: string) => ['scene', saveId],
} as const
