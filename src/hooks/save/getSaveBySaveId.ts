import { db } from '@/data/db'
import { Save, SaveId } from '@/data/types'
import { useQuery } from '@tanstack/react-query'

export function getSave(saveId: SaveId): Save | null {
  const { data: save } = useQuery({
    queryKey: ['save', saveId],

    queryFn: async () => (saveId ? db.saves.get(saveId) : undefined),

    enabled: !!saveId,
  })

  return save !== undefined && save !== null ? save as Save : null
}