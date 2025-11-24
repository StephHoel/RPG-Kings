import z from 'zod'
import { numericId } from './shared'
import { ANIMAL_ENUM, RACE_ENUM, STAT_TYPE } from '@/domain/constants'

export const StatsBaseSchema = z.object({
  id: numericId.optional(),
  type: z.enum(STAT_TYPE),
  target: z.enum(RACE_ENUM).or(z.enum(ANIMAL_ENUM)),
  strength: z.number(),
  agility: z.number(),
  intelligence: z.number(),
  charisma: z.number(),
  stamina: z.number(),
})

export type StatsBase = z.infer<typeof StatsBaseSchema>
