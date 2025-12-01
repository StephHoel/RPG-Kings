import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { SheetModel } from '@/domain/models'
import { getSheetService, log } from '@/services'
import { HookResult } from '@/domain/types'
import { LOG_MESSAGES } from '@/domain/constants'

export function useGetSheetActive(saveId: SheetModel['saveId']): HookResult<SheetModel> {
  return useQuery({
    queryKey: useQueryKeys.sheetActive(),
    enabled: !!saveId,
    staleTime: 60_000,
    refetchOnWindowFocus: false,

    queryFn: async () => {
      try {
        return await getSheetService(saveId)
      } catch (err) {
        const msg = LOG_MESSAGES.sheet.error.get({ method: useGetSheetActive.name })

        console.error(msg, err)

        await log.error(msg, { saveId, error: String(err) })
      }
    },
  })
}
