import z from 'zod'
import { numericId } from './shared'

export const RaceSchema = z.object({
  id: numericId.optional(),
  name: z.string(),
  hasAnimal: z.boolean(),
  defaultAnimal: z.string().nullable(),
})

export type Race = z.infer<typeof RaceSchema>
