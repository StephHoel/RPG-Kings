import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { SaveModel } from '@/domain/models'
import { listSavesService, log } from '@/services'

export function useGetAllSaves(): SaveModel[] {
  const { data: saves } = useQuery({
    queryKey: useQueryKeys.saves(),
    staleTime: 60_000 * 60,

    queryFn: async () => {
      try {
        return await listSavesService()
      } catch (err) {
        const msg = `[${useGetAllSaves.name}] Erro ao listar saves`

        console.error(msg, err)

        await log.error(msg, { error: String(err) })
      }
    },
  })

  return saves ?? []
}
