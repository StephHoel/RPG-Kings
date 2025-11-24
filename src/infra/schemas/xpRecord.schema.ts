import z from 'zod'
import { numericId, idString } from './shared'
import { DISCIPLINE_ENUM, SKILL_ENUM, XP_TYPE } from '@/domain/constants'

export const XPRecordSchema = z.object({
  id: numericId.optional(),
  saveId: idString,
  type: z.enum(XP_TYPE),
  target: z.enum(DISCIPLINE_ENUM).or(z.enum(SKILL_ENUM)),
  xp: z.number().nonnegative(),
})

export type XPRecord = z.infer<typeof XPRecordSchema>
