import { db } from '@/infra/dexie/database'
import { log } from '@/services/lib'
import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'
import { Sheet } from '@/infra/schemas'

export function useGetSheet(saveId: string): Sheet | null {
  const { data: sheet } = useQuery({
    queryKey: useQueryKeys.sheet(saveId),
    enabled: !!saveId,
    staleTime: 60_000,
    refetchOnWindowFocus: false,

    queryFn: async () => {
      try {
        const s = await db.sheets.get(saveId)

        await log.info('[useGetSheet] Ficha obtida', { saveId, present: !!s })

        return s ?? null
      } catch (err: any) {
        await log.error('[useGetSheet] Erro ao obter ficha', {
          saveId,
          error: String(err),
        })
        throw err
      }
    },
  })

  return sheet ?? null
}
