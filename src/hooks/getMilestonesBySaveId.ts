import { db } from '@/data/db'
import { Milestone } from '@/data/types'
import { useQuery } from '@tanstack/react-query'

export function getMilestones(saveId: string): Milestone[] | null {
  const { data: milestones } = useQuery({
    queryKey: ['milestones', saveId],

    queryFn: async () => db.milestones.where({ saveId }).toArray() ?? [],

    enabled: !!saveId,
  })

  return milestones !== undefined && milestones !== null && milestones.length > 0 ? milestones as Milestone[] : null
}