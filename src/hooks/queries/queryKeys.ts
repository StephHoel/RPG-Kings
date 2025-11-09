import { SaveId } from '@/interfaces'

export const useQueryKeys = {
  saveActive: () => ['saves', 'active'] as const,
  saveId: (id: SaveId) => ['save', id] as const,
  // scene: (id: string) => ['timeslots', 'scene', id, save?.currentWeek, save?.currentDay, save?.currentHour] as const
}
