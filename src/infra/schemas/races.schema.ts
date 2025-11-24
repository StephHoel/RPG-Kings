import z from 'zod'
import { numericId } from './shared'
import { ANIMAL_ENUM, RACE_ENUM } from '@/domain/constants'

export const RaceSchema = z.object({
  id: numericId.optional(),
  name: z.enum(RACE_ENUM),
  hasAnimal: z.boolean(),
  defaultAnimal: z.enum(ANIMAL_ENUM).optional(),
})

export type Race = z.infer<typeof RaceSchema>
