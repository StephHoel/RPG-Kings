import { z } from 'zod'
import { idString, isoDate, nonNegativeInt, numericId, positiveInt } from './shared'
import { ITEM_TYPE } from '@/domain/constants'

/**
 * InventorySchema defines the structure of an inventory.
 *
 * - `durationWeeks`: If `0`, the item has unlimited duration.
 *   Otherwise, it represents the number of weeks the item will last.
 * - `expiresAtWeek`: If `null`, the item is still valid and has not expired.
 *   Otherwise, it represents the week the item expires.
 */
export const InventorySchema = z.object({
  id: numericId.optional(),
  saveId: idString,
  item: z.string(),
  type: z.enum(ITEM_TYPE),
  acquiredWeek: positiveInt,
  durationWeeks: positiveInt.optional(),
  expiresAtWeek: nonNegativeInt.optional(),
  usedAtWeek: z.number().optional(),
  updatedAt: isoDate,
  createdAt: isoDate,
})

export type Inventory = z.infer<typeof InventorySchema>
