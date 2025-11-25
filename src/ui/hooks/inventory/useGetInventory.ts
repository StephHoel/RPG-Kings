import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../../../domain/queryKeys'
import { Inventory } from '@/infra/schemas'
import { getInventoriesService } from '@/services'

export function useGetInventory(saveId: string): Inventory[] {
  const { data: items } = useQuery({
    queryKey: useQueryKeys.inventory(saveId),
    enabled: !!saveId,
    staleTime: 60_000,
    refetchOnWindowFocus: false,

    queryFn: async () => await getInventoriesService(saveId),
  })

  return items ?? []
}
