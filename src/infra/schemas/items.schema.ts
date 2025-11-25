import z from 'zod'
import { ITEM_ENUM, ITEM_TYPE } from '@/domain/constants'
import { buildEnumRecord, numericId } from './shared'

export const ItemSchema = z.object({
  id: numericId.optional(),
  name: buildEnumRecord(ITEM_ENUM),
  description: z.string(),
  cost: z.number(),
  durationWeeks: z.number().optional(),
  type: buildEnumRecord(ITEM_TYPE),
})

export type Item = z.infer<typeof ItemSchema>
