import z from 'zod'
import { buildEnumRecord, numericId } from './shared'
import { ANIMAL_ENUM, RACE_ENUM } from '@/domain/constants'

export const RaceSchema = z.object({
  id: numericId.optional(),
  name: buildEnumRecord(RACE_ENUM),
  hasAnimal: z.boolean(),
  defaultAnimal: buildEnumRecord(ANIMAL_ENUM).optional(),
})

export type Race = z.infer<typeof RaceSchema>
