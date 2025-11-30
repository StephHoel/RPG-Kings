import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { getActiveSaveService, log } from '@/services'
import { SaveModel } from '@/domain/models'
import { HookResult } from '@/domain/types'

export function useActiveSave(): HookResult<SaveModel> {
  return useQuery<SaveModel | undefined>({
    queryKey: useQueryKeys.saveActive(),
    staleTime: 60_000 * 60, // 60 minutes

    queryFn: async () => {
      try {
        return await getActiveSaveService()
      } catch (err) {
        const msg = `[${useActiveSave.name}] Erro ao obter save ativo`

        console.error(msg, err)
        await log.error(msg, undefined, { error: String(err) })
      }
    },
  })
}
