import z from 'zod'
import { numericId } from './shared'
import { ANIMALS_ENUM, RACES_ENUM } from '@/domain/constants'

export const AnimalSchema = z.object({
  id: numericId.optional(),
  name: z.enum(ANIMALS_ENUM),
  race: z.enum(RACES_ENUM),
})

export type Animal = z.infer<typeof AnimalSchema>
