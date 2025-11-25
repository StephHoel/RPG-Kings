import z from 'zod'
import { buildEnumRecord, numericId } from './shared'
import { RACE_ENUM, SKILL_TYPE, SKILL_ENUM } from '@/domain/constants'

export const SkillSchema = z.object({
  id: numericId.optional(),
  name: buildEnumRecord(SKILL_ENUM),
  type: buildEnumRecord(SKILL_TYPE),
  races: buildEnumRecord(RACE_ENUM).array(),
})

export type Skill = z.infer<typeof SkillSchema>
