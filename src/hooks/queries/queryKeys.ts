import { SaveId } from '@/interfaces'

export const useQueryKeys = {
  saveActive: () => ['saves', 'active'],
  saveId: (id: SaveId) => ['save', id],
  saves: () => ['saves']
  // scene: (id: string) => ['timeslots', 'scene', id, save?.currentWeek, save?.currentDay, save?.currentHour]
} as const
