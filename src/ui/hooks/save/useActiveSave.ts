import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { getActiveSaveService, log } from '@/services'

export function useActiveSave() {
  const {
    data: active,
    isLoading,
    error,
  } = useQuery({
    queryKey: useQueryKeys.saveActive(),
    staleTime: 60_000 * 60, // 60 minutes

    queryFn: async () => {
      try {
        return await getActiveSaveService()
      } catch (err) {
        const msg = `[${useActiveSave.name}] Erro ao obter save ativo`

        console.error(msg, err)
        await log.error(msg, { error: String(err) })
      }
    },
  })

  return { activeSaveId: active?.id ?? null, isLoading, error }
}
