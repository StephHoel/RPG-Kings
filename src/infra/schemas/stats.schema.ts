import z from 'zod'
import { numericId, idString, isoDateOptional } from './shared'

export const StatsSchema = z.object({
  id: numericId.optional(),
  saveId: idString,
  strength: z.number(),
  agility: z.number(),
  intelligence: z.number(),
  charisma: z.number(),
  stamina: z.number(),
  hungry: z.number(),
  mood: z.number(),
  health: z.number(),
  magic: z.number(),
  mana: z.number(),
  updatedAt: isoDateOptional,
  createdAt: isoDateOptional,
})

export type Stats = z.infer<typeof StatsSchema>
