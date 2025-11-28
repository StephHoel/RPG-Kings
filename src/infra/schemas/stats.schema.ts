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
  hungry: z.object({
    current: z.number(),
    max: z.number(),
  }),
  mood: z.object({
    current: z.number(),
    max: z.number(),
  }),
  health: z.object({
    current: z.number(),
    max: z.number(),
  }),
  magic: z.object({
    current: z.number(),
    max: z.number(),
  }),
  mana: z.object({
    current: z.number(),
    max: z.number(),
  }),
  updatedAt: isoDateOptional,
  createdAt: isoDateOptional,
})

export type Stats = z.infer<typeof StatsSchema>
