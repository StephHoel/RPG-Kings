import z from 'zod'
import { numericId } from './shared'
import { SKILL_TYPE } from '@/domain/constants'

export const SkillSchema = z.object({
  id: numericId.optional(),
  name: z.string(),
  type: z.enum(SKILL_TYPE),
  races: z.string().array(),
})

export type Skill = z.infer<typeof SkillSchema>
