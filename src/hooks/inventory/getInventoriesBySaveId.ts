import { db } from '@/data/db'
import { InventoryItem } from '@/data/types'
import { useQuery } from '@tanstack/react-query'

export function getInventory(saveId: string): InventoryItem[] | null {
  const { data: items } = useQuery({
    queryKey: ['inventory', saveId],

    queryFn: async () => db.inventory.where('saveId').equals(saveId).toArray(),

    enabled: !!saveId,
  })

  return items && items.length > 0 ? items : null
}