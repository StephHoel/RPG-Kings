import z from 'zod'
import { numericId, idString } from './shared'
import { XP_TYPE } from '@/domain/constants'

export const XPRecordSchema = z.object({
  id: numericId.optional(),
  saveId: idString,
  type: z.enum(XP_TYPE),
  target: z.string(),
  xp: z.number().nonnegative(),
})

export type XPRecord = z.infer<typeof XPRecordSchema>
