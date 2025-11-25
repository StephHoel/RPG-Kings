import z from 'zod'
import { buildEnumRecord, numericId } from './shared'
import { ANIMAL_ENUM, RACE_ENUM } from '@/domain/constants'

export const AnimalSchema = z.object({
  id: numericId.optional(),
  name: buildEnumRecord(ANIMAL_ENUM),
  race: buildEnumRecord(RACE_ENUM),
})

export type Animal = z.infer<typeof AnimalSchema>
