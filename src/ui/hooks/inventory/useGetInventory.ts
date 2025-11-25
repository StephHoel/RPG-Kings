import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { InventoryModel } from '@/domain/models'
import { getInventoriesService, log } from '@/services'

export function useGetInventory(saveId: string): InventoryModel[] {
  const { data: items } = useQuery({
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

        await log.error(msg, { saveId, error: String(err) })
      }
    },
  })

  return items ?? []
}
