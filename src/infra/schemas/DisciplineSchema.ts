import { s } from '@/core/utils'
import z from 'zod'

export const DisciplineSchema = z.object({
  id: s.sequencialId,
  saveId: s.saveId,
  discipline: z.string(),
  xp: s.stats,

  updatedAt: s.updatedAt,
  createdAt: s.createdAt,
})
