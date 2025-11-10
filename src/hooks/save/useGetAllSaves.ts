import { db } from '@/data'
import { Save } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'

export function useGetAllSaves(): Save[] | null {
  const { data: saves } = useQuery({
    queryKey: useQueryKeys.saves(),

    queryFn: async () => {
      return await db.saves.toArray()
    }
  })

  return saves && saves.length > 0 ? saves : null
}