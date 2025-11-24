import z from 'zod'
import { numericId } from './shared'
import { RACE_ENUM, SKILL_TYPE, SKILL_ENUM } from '@/domain/constants'

export const SkillSchema = z.object({
  id: numericId.optional(),
  name: z.enum(SKILL_ENUM),
  type: z.enum(SKILL_TYPE),
  races: z.enum(RACE_ENUM).array(),
})

export type Skill = z.infer<typeof SkillSchema>
