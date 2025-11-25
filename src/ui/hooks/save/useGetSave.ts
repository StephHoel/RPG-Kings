import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { SaveModel } from '@/domain/models'
import { getSaveService, log } from '@/services'

export function useGetSave(saveId: string) {
  const { data: save } = useQuery<SaveModel | undefined>({
    queryKey: useQueryKeys.saveId(saveId),
    enabled: !!saveId,
    staleTime: 5 * 60_000, // 5 minutes
    gcTime: 30 * 60_000, // 30 minutes

    queryFn: async () => {
      try {
        return await getSaveService(saveId)
      } catch (err) {
        const msg = `[${useGetSave.name}] Erro ao obter save`

        console.error(msg, err)

        await log.error(msg, { saveId, error: String(err) })
      }
    },
  })

  return save ?? null
}
