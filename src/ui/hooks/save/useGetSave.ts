import { db } from '@/infra/dexie/database'
import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'
import { log } from '@/services/lib'
import { Save } from '@/infra/schemas'

export function useGetSave(saveId: string) {
  const { data: save } = useQuery<Save | null>({
    queryKey: useQueryKeys.saveId(saveId),
    enabled: !!saveId,
    staleTime: 5 * 60_000, // 5 minutes
    gcTime: 30 * 60_000, // 30 minutes

    queryFn: async () => {
      try {
        if (!saveId) {
          await log.info('[useGetSave] SaveId nulo')
          return null
        }

        const save = await db.saves.get(saveId)

        await log.info('[useGetSave] Jogo obtido', { save })

        return save ?? null
      } catch (err: any) {
        await log.error('[useGetSave] Erro ao obter jogo', {
          saveId,
          error: String(err),
        })
        throw err
      }
    },
  })

  return save ?? null
}
