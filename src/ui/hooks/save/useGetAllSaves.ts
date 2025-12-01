import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { SaveModel } from '@/domain/models'
import { getAllSavesService, log } from '@/services'
import { HookResult } from '@/domain/types'
import { LOG_MESSAGES } from '@/domain/constants'

export function useGetAllSaves(): HookResult<SaveModel[]> {
  return useQuery({
    queryKey: useQueryKeys.allSaves(),
    staleTime: 60_000 * 60,

    queryFn: async () => {
      try {
        return await getAllSavesService()
      } catch (err) {
        const msg = LOG_MESSAGES.saves.error.getAll({ method: useGetAllSaves.name })

        console.error(msg, err)

        await log.error(msg, { error: String(err) })
      }
    },
  })
}
