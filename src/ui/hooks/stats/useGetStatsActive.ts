import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { StatsModel } from '@/domain/models'
import { getStatsService, log } from '@/services'
import { HookResult } from '@/domain/types'
import { LOG_MESSAGES } from '@/domain/constants'

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
        const msg = LOG_MESSAGES.stats.error.get({ method: useGetStatsActive.name })

        console.error(msg, err)

        await log.error(msg, { saveId, error: String(err) })
      }
    },
  })
}
