import z from 'zod'
import { idString, isoDate, numericId } from './shared'

export const SheetSchema = z.object({
  id: numericId.optional(), // auto inc
  saveId: idString,
  name: z.string(),
  race: z.string(),
  animal: z.string().nullable().optional(),
  coins: z.number().int(),
  updatedAt: isoDate,
  createdAt: isoDate,
})

export type Sheet = z.infer<typeof SheetSchema>
