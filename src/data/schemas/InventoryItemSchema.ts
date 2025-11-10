import { z } from 'zod'
import { ItemsTagEnum } from '../enums/ItemsTag'
import { s } from './_schemas'

/**
 * InventoryItemSchema defines the structure of an inventory item.
 *
 * - `durationWeeks`: If `0`, the item has unlimited duration.
 *   Otherwise, it represents the number of weeks the item will last.
 * - `expiresAtWeek`: If `null`, the item is still valid and has not expired.
 *   Otherwise, it represents the week the item expires.
 */
export const InventoryItemSchema = z.object({
  id: s.sequencialId,
  saveId: s.saveId,

  // TODO talvez trocar para itemId quando eu fizer a tabela domínio de itens
  itemName: z.string(),

  // TODO talvez tirar quantidade e salvar individualmente cada item (mesmo q duplicado)
  quantity: z.number().int().min(1),

  acquiredWeek: z.number().int().min(1),
  durationWeeks: z.number().int().min(0),
  expiresAtWeek: z.number().int().nonnegative().optional().nullable().default(null),

  tags: z.array(ItemsTagEnum).optional(),

  updatedAt: s.updatedAt,
  createdAt: s.createdAt,
})