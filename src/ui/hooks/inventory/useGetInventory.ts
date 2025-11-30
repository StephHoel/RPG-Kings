import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { InventoryModel } from '@/domain/models'
import { getInventoriesService, log } from '@/services'
import { HookResult } from '@/domain/types'

export function useGetInventory(saveId: string): HookResult<InventoryModel[]> {
  return useQuery({
    queryKey: useQueryKeys.inventory(saveId),
    enabled: !!saveId,
    staleTime: 60_000,
    refetchOnWindowFocus: false,

    queryFn: async () => {
      try {
        return await getInventoriesService(saveId)
      } catch (err) {
        const msg = `[${useGetInventory.name}] Erro ao obter inventário`

        console.error(msg, err)

        await log.error(msg, undefined, { saveId, error: String(err) })
      }
    },
  })
}
