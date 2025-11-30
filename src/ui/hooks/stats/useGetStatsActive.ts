import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { StatsModel } from '@/domain/models'
import { getStatsService, log } from '@/services'
import { HookResult } from '@/domain/types'

export function useGetStatsActive(saveId: StatsModel['saveId']): HookResult<StatsModel> {
  return useQuery({
    queryKey: useQueryKeys.statsActive(),
    enabled: !!saveId,
    staleTime: 60_000,
    refetchOnWindowFocus: false,

    queryFn: async () => {
      try {
        return await getStatsService(saveId)
      } catch (err) {
        const msg = `[${useGetStatsActive.name}] Erro ao obter stats`

        console.error(msg, err)

        await log.error(msg, undefined, { saveId, error: String(err) })
      }
    },
  })
}
