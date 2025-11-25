import z from 'zod'
import { buildEnumRecord, idString, isoDate, numericId } from './shared'
import { ANIMAL_ENUM, RACE_ENUM } from '@/domain/constants'

export const SheetSchema = z.object({
  id: numericId.optional(), // auto inc
  saveId: idString,
  name: z.string(),
  race: buildEnumRecord(RACE_ENUM),
  animal: buildEnumRecord(ANIMAL_ENUM).optional(),
  coins: z.number().int(),
  updatedAt: isoDate,
  createdAt: isoDate,
})

export type Sheet = z.infer<typeof SheetSchema>
