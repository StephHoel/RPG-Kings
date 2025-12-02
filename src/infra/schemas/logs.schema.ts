import { z } from 'zod'
import { numericId, isoDateOptional, buildEnumRecord } from './shared'
import { LOG_TYPE } from '@/domain/constants'

export const LogSchema = z.object({
  id: numericId.optional(),
  type: buildEnumRecord(LOG_TYPE),
  message: z.string().nullable().optional(),
  payload: z.any().optional(),
  createdAt: isoDateOptional,
})

export type Log = z.infer<typeof LogSchema>
