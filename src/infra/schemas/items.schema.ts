import z from 'zod'
import { ITEM_TYPE } from '@/domain/constants'
import { numericId } from './shared'

export const ItemListSchema = z.object({
  id: numericId.optional(),
  name: z.string(),
  description: z.string(),
  cost: z.number(),
  durationWeeks: z.number().nullable(),
  type: z.enum(ITEM_TYPE),
})

export type ItemList = z.infer<typeof ItemListSchema>
