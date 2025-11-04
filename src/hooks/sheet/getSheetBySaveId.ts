import { db } from '@/data/db'
import { Sheet } from '@/data/types'
import { useQuery } from '@tanstack/react-query'

export function getSheet(saveId: string): Sheet | null {
  const { data: sheet } = useQuery({
    queryKey: ['sheet', saveId],

    queryFn: async () => {
      const s = await db.sheets.get(saveId)
      return s ?? null
    },

    enabled: !!saveId,
  })

  return sheet !== undefined && sheet !== null ? sheet as Sheet : null
}