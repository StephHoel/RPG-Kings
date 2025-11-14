import { z } from 'zod'

export const ItemsTagEnum = z.enum([
  'HEALING',
  'CONSUMABLE'
])
