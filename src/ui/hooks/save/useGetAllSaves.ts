import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'
import { Save } from '@/infra/schemas'
import { listSavesService } from '@/services'

export function useGetAllSaves(): Save[] {
  const { data: saves } = useQuery({
    queryKey: useQueryKeys.saves(),
    staleTime: 60_000 * 60,

    queryFn: async () => await listSavesService(),
  })

  return saves ?? []
}
