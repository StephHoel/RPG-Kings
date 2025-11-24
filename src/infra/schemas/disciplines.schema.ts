import z from 'zod'
import { DISCIPLINE_ENUM, DISCIPLINE_TYPE, SKILL_ENUM, STAT_ENUM } from '@/domain/constants'
import { numericId } from './shared'

export const DisciplineSchema = z.object({
  id: numericId.optional(),
  name: z.enum(DISCIPLINE_ENUM),
  type: z.enum(DISCIPLINE_TYPE),
  skills: z.enum(SKILL_ENUM).array(),
  stats: z.enum(STAT_ENUM).array(),
})

export type Discipline = z.infer<typeof DisciplineSchema>
