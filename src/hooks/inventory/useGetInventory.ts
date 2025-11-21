import { db } from '@/db'
import { LogTypeEnum } from '@/enums'
import { log } from '@/lib'
import { Inventory } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'

export function useGetInventory(saveId: string): Inventory[] {
  const { data: items } = useQuery({
    queryKey: useQueryKeys.inventory(saveId),
    enabled: !!saveId,
    staleTime: 60_000,
    refetchOnWindowFocus: false,

    queryFn: async () => {
      try {
        const inventories = await db.inventory.where({ saveId: saveId }).toArray()

        await log(LogTypeEnum.enum.INFO, '[useGetInventory] Inventário obtido', {
          saveId,
          itemsCount: inventories.length,
        })

        return inventories
      } catch (err: any) {
        await log(LogTypeEnum.enum.ERROR, '[useGetInventory] Erro ao obter inventário', {
          saveId,
          error: String(err),
        })

        throw err
      }
    },
  })

  return items ?? []
}
