import { db } from '@/data'
import { Milestone } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'

export function getMilestones(saveId: string): Milestone[] | null {
  const { data: milestones } = useQuery({
    queryKey: ['milestones', saveId],

    queryFn: async () => db.milestones.where({ saveId }).toArray() ?? [],

    enabled: !!saveId,
  })

  return milestones && milestones.length > 0 ? milestones : null
}