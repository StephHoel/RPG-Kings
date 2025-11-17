import { db } from '@/db'
import { Save } from '@/interfaces'
import { log } from '@/lib'
import { LogTypeEnum } from '@/enums'
import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'

export function useGetAllSaves(): Save[] {
  const { data: saves } = useQuery({
    queryKey: useQueryKeys.saves(),
    staleTime: 60_000 * 60,

    queryFn: async () => {
      try {
        const saves = await db.saves.toArray()

        await log(LogTypeEnum.enum.INFO, '[useGetAllSaves] Saves obtidos', { count: saves.length })

        return saves
      } catch (err: any) {
        await log(LogTypeEnum.enum.ERROR, '[useGetAllSaves] Erro ao obter saves', { error: String(err) })
        throw err
      }
    }
  })

  return saves ?? []
}