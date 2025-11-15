import z from 'zod'
import { MilestoneTypeEnum } from '@/enums'
import { s } from '@/utils'

export const MilestoneSchema = z.object({
  id: s.sequencialId,
  saveId: s.saveId,

  type: MilestoneTypeEnum,
  description: z.string(),

  achievedAtWeek: z.number().int().min(1),

  createdAt: s.createdAt,
})