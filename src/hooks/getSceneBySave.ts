import { Save, Scene } from '@/data/types'
import { resolveSceneForNow } from '@/utils/timeslot'
import { useQuery } from '@tanstack/react-query'

export function getScene(save: Save): Scene | null {
  const { data: scene } = useQuery({
    queryKey: ['timeslots', 'scene', save.id, save?.currentWeek, save?.currentDay, save?.currentHour],

    queryFn: async () => {
      if (!save) return null

      return resolveSceneForNow(save)
    },

    enabled: !!save,
  })

  return scene !== undefined && scene !== null ? scene as Scene : null
}