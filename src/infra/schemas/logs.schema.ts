import { z } from 'zod'
import { numericId, isoDate, buildEnumRecord } from './shared'
import { LOG_TYPE } from '@/domain/constants'

export const LogSchema = z.object({
  id: numericId.optional(),
  type: buildEnumRecord(LOG_TYPE),
  message: z.string().nullable().optional(),
  payload: z.any().optional(),
  createdAt: isoDate,
})

export type Log = z.infer<typeof LogSchema>
