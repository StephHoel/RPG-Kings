import z from 'zod'
import { numericId } from './shared'

export const AnimalSchema = z.object({
  id: numericId.optional(),
  name: z.string(),
  race: z.string(),
})

export type Animal = z.infer<typeof AnimalSchema>
