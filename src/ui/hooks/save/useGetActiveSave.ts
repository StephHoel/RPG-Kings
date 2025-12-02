import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { getActiveSaveService, log } from '@/services'
import { SaveModel } from '@/domain/models'
import { HookResult } from '@/domain/types'
import { LOG_MESSAGES } from '@/domain/constants'

export function useActiveSave(): HookResult<SaveModel> {
  return useQuery<SaveModel | undefined>({
    queryKey: useQueryKeys.saveActive(),
    staleTime: 60_000 * 60, // 60 minutes

    queryFn: async () => {
      try {
        return await getActiveSaveService()
      } catch (err) {
        const msg = LOG_MESSAGES.save.error.activeSave({ method: useActiveSave.name })

        console.error(msg, err)
        await log.error(msg, { error: String(err) })
      }
    },
  })
}
