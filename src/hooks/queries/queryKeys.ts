import { SaveId } from '@/interfaces'

export const useQueryKeys = {
  saveActive: () => ['saves', 'active'],
  saveId: (id: SaveId) => ['save', id],
  saves: () => ['saves'],
  inventory: (saveId: string) => ['inventory', saveId],
  discipline: (saveId: string, discipline: string) => ['discipline', saveId, discipline],
} as const
