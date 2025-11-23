import { db } from '@/infra/dexie/database'
import { log } from '@/services/lib'
import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'
import { Scene } from '@/infra/schemas'

export function useGetScene(saveId: string): Scene | null {
  const { data: scene } = useQuery({
    queryKey: useQueryKeys.scene(saveId),
    enabled: !!saveId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes

    queryFn: async () => {
      try {
        const save = await db.saves.get(saveId)
        if (!save) return null

        const scenes = await db.scenes.toArray()

        await log.info('[useGetScene] Cena obtida', { scene: scenes[0] })

        return scenes[0]
      } catch (err: any) {
        await log.error('[useGetScene] Erro ao obter cena', {
          saveId,
          error: String(err),
        })
        throw err
      }
    },
  })

  return scene ?? null
}
