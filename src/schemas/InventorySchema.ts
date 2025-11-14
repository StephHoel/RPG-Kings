import { z } from 'zod'
import { s } from './_schemas'

/**
 * InventorySchema defines the structure of an inventory.
 *
 * - `durationWeeks`: If `0`, the item has unlimited duration.
 *   Otherwise, it represents the number of weeks the item will last.
 * - `expiresAtWeek`: If `null`, the item is still valid and has not expired.
 *   Otherwise, it represents the week the item expires.
 */
export const InventorySchema = z.object({
  id: s.sequencialId,
  saveId: s.saveId,
  
  name: z.string(),
  acquiredWeek: z.number().int().min(1),
  durationWeeks: z.number().int().min(0),
  expiresAtWeek: z.number().int().nonnegative().nullable().default(null),
  usedAtWeek: z.number().int().nullable().default(null),

  updatedAt: s.updatedAt,
  createdAt: s.createdAt,
})