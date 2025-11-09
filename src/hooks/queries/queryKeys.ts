import { Save } from '@/interfaces'

export const useQueryKeys = {
  saveActive: () => ['saves', 'active'] as const,
  saveId: (id: string) => ['save', id] as const,
  // scene: (id: string) => ['timeslots', 'scene', id, save?.currentWeek, save?.currentDay, save?.currentHour] as const
}

// export type UseQueryKeys = typeof useQueryKeys
