import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { SaveModel } from '@/domain/models'
import { getSaveService, log } from '@/services'
import { HookResult } from '@/domain/types'

export function useGetSave(saveId: string): HookResult<SaveModel> {
  return useQuery<SaveModel | undefined>({
    queryKey: useQueryKeys.saveId(saveId),
    enabled: !!saveId,
    staleTime: 5 * 60_000, // 5 minutes
    gcTime: 30 * 60_000, // 30 minutes

    queryFn: async () => {
      try {
        return await getSaveService(saveId)
      } catch (err) {
        const msg = `[${useGetSave.name}] Erro ao obter save`

        console.error(msg, err)

        await log.error(msg, undefined, { saveId, error: String(err) })
      }
    },
  })
}
