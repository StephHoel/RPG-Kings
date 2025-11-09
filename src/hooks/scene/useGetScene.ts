import { SaveId, Scene } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'
import { db } from '@/data'
import { matchesRule } from '@/libs/others/matchesRule'

export function useGetScene(saveId: SaveId) {
  // const queryKey = useQueryKeys.saveId(saveId)

  const { data: scene, isLoading } = useQuery({
    queryKey: [],
    enabled: !!saveId,
    staleTime: 5 * 60 * 1000, // 5 min
    gcTime: 30 * 60 * 1000,   // 30 min (ajuste conforme seu app)

    // Normaliza: sempre retorna null se não houver save
    select: (d) => d ?? null,

    queryFn: async (): Promise<Scene | null> => {
      const save = await db.saves.get(saveId)
      if (!save) return null

      const candidates = await db.timeslots.filter(r => matchesRule(save, r)).toArray()
      if (candidates.length === 0) return null

      const pool = candidates[0].scenes
      if (!Array.isArray(pool) || pool.length === 0) return null

      const chosenId = pool[Math.floor(Math.random() * pool.length)]

      const scene = await db.scenes.get(chosenId)

      console.log('scene', scene)

      return scene ?? null
    },
  })

  return { scene: scene ?? null, isLoading }
}