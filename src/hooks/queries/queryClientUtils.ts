import { QueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '@/hooks'

export function refreshSaves(queryClient: QueryClient) {
  // Marca queries relacionadas a saves como stale
  queryClient.invalidateQueries({ queryKey: useQueryKeys.saveActive() })

  // Solicita refetch imediato para as queries que batem com a key
  queryClient.refetchQueries({ queryKey: useQueryKeys.saveActive() })
}
