import { SaveId, Scene } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'
import { db } from '@/db'

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

      const scenes = await db.scenes.toArray()

      console.log('scene', scenes)

      return scenes[0] ?? null
    },
  })

  return { scene: scene ?? null, isLoading }
}