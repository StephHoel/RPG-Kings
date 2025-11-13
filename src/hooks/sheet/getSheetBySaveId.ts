import { db } from '@/db'
import { Sheet } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'

export function useGetSheet(saveId: string): Sheet | null {
  const { data: sheet } = useQuery({
    queryKey: ['sheet', saveId],

    queryFn: async () => {
      const s = await db.sheets.get(saveId)
      return s ?? null
    },

    enabled: !!saveId,
  })

  return sheet ?? null
}