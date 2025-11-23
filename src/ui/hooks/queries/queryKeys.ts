import { SaveId } from '@/types'

export const useQueryKeys = {
  saveActive: () => ['saves', 'active'],
  saveId: (id: SaveId) => ['save', id],
  saves: () => ['saves'],
  inventory: (saveId: string) => ['inventory', saveId],
  discipline: (saveId: string, discipline: string) => ['discipline', saveId, discipline],
  sheet: (saveId: string) => ['sheet', saveId],
  milestones: (saveId: string) => ['milestones', saveId],
  scene: (saveId: string) => ['scene', saveId],
} as const
