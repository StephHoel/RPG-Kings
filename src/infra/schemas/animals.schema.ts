import z from 'zod'
import { numericId } from './shared'
import { ANIMAL_ENUM, RACE_ENUM } from '@/domain/constants'

export const AnimalSchema = z.object({
  id: numericId.optional(),
  name: z.enum(ANIMAL_ENUM),
  race: z.enum(RACE_ENUM),
})

export type Animal = z.infer<typeof AnimalSchema>
