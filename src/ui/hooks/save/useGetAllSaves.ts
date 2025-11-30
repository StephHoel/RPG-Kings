import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { SaveModel } from '@/domain/models'
import { getAllSavesService, log } from '@/services'
import { HookResult } from '@/domain/types'

export function useGetAllSaves(): HookResult<SaveModel[]> {
  return useQuery({
    queryKey: useQueryKeys.allSaves(),
    staleTime: 60_000 * 60,

    queryFn: async () => {
      try {
        return await getAllSavesService()
      } catch (err) {
        const msg = `[${useGetAllSaves.name}] Erro ao listar saves`

        console.error(msg, err)

        await log.error(msg, undefined, { error: String(err) })
      }
    },
  })
}
