import z from 'zod'
import { idString, isoDate, numericId } from './shared'
import { ANIMAL_ENUM, RACE_ENUM } from '@/domain/constants'

export const SheetSchema = z.object({
  id: numericId.optional(), // auto inc
  saveId: idString,
  name: z.string(),
  race: z.enum(RACE_ENUM),
  animal: z.enum(ANIMAL_ENUM).optional(),
  coins: z.number().int(),
  updatedAt: isoDate,
  createdAt: isoDate,
})

export type Sheet = z.infer<typeof SheetSchema>
