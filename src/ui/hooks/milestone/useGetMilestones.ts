import { db } from '@/infra/db'
import { Milestone } from '@/core/types'
import { log } from '@/services/lib'
import { LogTypeEnum } from '@/core/enums'
import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../queries/queryKeys'

export function useGetMilestones(saveId: string): Milestone[] {
  const { data: milestones } = useQuery({
    queryKey: useQueryKeys.milestones(saveId),
    enabled: !!saveId,
    staleTime: 60_000,
    refetchOnWindowFocus: false,

    queryFn: async () => {
      try {
        const rows = await db.milestones.where({ saveId: saveId }).toArray()

        await log(LogTypeEnum.enum.INFO, '[useGetMilestones] Milestones obtido', {
          saveId,
          count: rows.length,
        })

        return rows
      } catch (err: any) {
        await log(LogTypeEnum.enum.ERROR, '[useGetMilestones] Erro ao obter milestones', {
          saveId,
          error: String(err),
        })
        throw err
      }
    },
  })

  return milestones ?? []
}
