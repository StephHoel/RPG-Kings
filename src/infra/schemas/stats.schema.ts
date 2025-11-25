import z from 'zod'
import { numericId, idString, isoDate } from './shared'

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
  updatedAt: isoDate,
  createdAt: isoDate,
})

export type Stats = z.infer<typeof StatsSchema>
