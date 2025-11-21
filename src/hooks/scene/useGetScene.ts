import { db } from '@/db'
import { SaveId, Scene } from '@/interfaces'
import { LogTypeEnum } from '@/enums'
import { log } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'

export function useGetScene(saveId: SaveId): Scene | null {
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

        await log(LogTypeEnum.enum.INFO, '[useGetScene] Cena obtida', { scene: scenes[0] })

        return scenes[0]
      } catch (err: any) {
        await log(LogTypeEnum.enum.ERROR, '[useGetScene] Erro ao obter cena', {
          saveId,
          error: String(err),
        })
        throw err
      }
    },
  })

  return scene ?? null
}
