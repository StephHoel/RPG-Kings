import z from 'zod'
import { DISCIPLINE_ENUM, DISCIPLINE_TYPE, SKILL_ENUM, STAT_ENUM } from '@/domain/constants'
import { buildEnumRecord, numericId } from './shared'

export const DisciplineSchema = z.object({
  id: numericId.optional(),
  name: buildEnumRecord(DISCIPLINE_ENUM),
  type: buildEnumRecord(DISCIPLINE_TYPE),
  skills: buildEnumRecord(SKILL_ENUM).array(),
  stats: buildEnumRecord(STAT_ENUM).array(),
})

export type Discipline = z.infer<typeof DisciplineSchema>
