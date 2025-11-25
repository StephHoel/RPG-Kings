import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../../../domain/queryKeys'
import { Save } from '@/infra/schemas'
import { getSaveService } from '@/services'

export function useGetSave(saveId: string) {
  const { data: save } = useQuery<Save | undefined>({
    queryKey: useQueryKeys.saveId(saveId),
    enabled: !!saveId,
    staleTime: 5 * 60_000, // 5 minutes
    gcTime: 30 * 60_000, // 30 minutes

    queryFn: async () => await getSaveService(saveId),
  })

  return save ?? null
}
