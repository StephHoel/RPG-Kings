import { SaveId } from '@/interfaces'

export const useQueryKeys = {
  saveActive: () => ['saves', 'active'],
  saveId: (id: SaveId) => ['save', id],
  saves: () => ['saves']
} as const
