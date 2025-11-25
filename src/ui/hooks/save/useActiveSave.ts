import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'
import { getActiveSaveService } from '@/services'

export function useActiveSave() {
  const {
    data: active,
    isLoading,
    error,
  } = useQuery({
    queryKey: useQueryKeys.saveActive(),
    staleTime: 60_000 * 60, // 60 minutes

    queryFn: async () => await getActiveSaveService(),
  })

  return { activeSaveId: active?.id ?? null, isLoading, error }
}
