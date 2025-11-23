import { db } from '@/infra/dexie/database'
import { log } from '@/services/lib'
import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'
import { Save } from '@/infra/schemas'

export function useGetAllSaves(): Save[] {
  const { data: saves } = useQuery({
    queryKey: useQueryKeys.saves(),
    staleTime: 60_000 * 60,

    queryFn: async () => {
      try {
        const saves = await db.saves.toArray()

        await log.info('[useGetAllSaves] Saves obtidos', { count: saves.length })

        return saves
      } catch (err: any) {
        await log.error('[useGetAllSaves] Erro ao obter saves', {
          error: String(err),
        })
        throw err
      }
    },
  })

  return saves ?? []
}
