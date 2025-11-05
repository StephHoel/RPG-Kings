import { Save, Scene } from '@/data/types'
import { resolveSceneForNow } from '@/libs'
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

  return scene ?? null
}