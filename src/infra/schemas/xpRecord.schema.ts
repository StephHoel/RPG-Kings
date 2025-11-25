import z from 'zod'
import { numericId, idString, buildEnumRecord } from './shared'
import { DISCIPLINE_ENUM, SKILL_ENUM, XP_TYPE } from '@/domain/constants'

export const XPRecordSchema = z.object({
  id: numericId.optional(),
  saveId: idString,
  type: buildEnumRecord(XP_TYPE),
  target: buildEnumRecord(DISCIPLINE_ENUM).or(buildEnumRecord(SKILL_ENUM)),
  xp: z.number().nonnegative(),
})

export type XPRecord = z.infer<typeof XPRecordSchema>
