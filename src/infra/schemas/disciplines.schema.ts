import z from 'zod'
import { DISCIPLINE_TYPE } from '@/domain/constants'
import { numericId } from './shared'

export const DisciplineSchema = z.object({
  id: numericId.optional(),
  name: z.string(),
  type: z.enum(DISCIPLINE_TYPE),
  skills: z.string().array(),
  stats: z.string().array(),
})

export type Discipline = z.infer<typeof DisciplineSchema>
