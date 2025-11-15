import { ItemsTagEnum } from '@/enums'
import z from 'zod'
import { s } from '@/utils'

export const ItemSchema = z.object({
  id: s.sequencialId,
  name: z.string(),
  description: z.string(),
  durationWeeks: z.number().int().min(0),
  tags: z.array(ItemsTagEnum).nonempty(),
})