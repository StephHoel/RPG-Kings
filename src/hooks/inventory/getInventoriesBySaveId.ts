import { db } from '@/db'
import { LogTypeEnum } from '@/enums'
import { Inventory } from '@/interfaces'
import { log } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'

export function useGetInventory(saveId: string): Inventory[] | null {
  const { data: items } = useQuery({
    queryKey: useQueryKeys.inventory(saveId),

    queryFn: async () => {
      const inventories = await db.inventory.where('saveId').equals(saveId).toArray()

      await log(LogTypeEnum.enum.info, 'Pega todos os itens do inventário', { saveId, itemsCount: inventories.length})
      
      return inventories
    },
  })

  return items ?? null
}