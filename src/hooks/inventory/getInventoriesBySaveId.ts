import { db } from '@/db'
import { Inventory } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'

export function useGetInventory(saveId: string): Inventory[] | null {
  const { data: items } = useQuery({
    queryKey: ['inventory', saveId],

    queryFn: async () => db.inventory.where('saveId').equals(saveId).toArray(),

    enabled: !!saveId,
  })

  return items ?? null
}