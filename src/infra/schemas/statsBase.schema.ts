import z from 'zod'
import { buildEnumRecord, numericId } from './shared'
import { ANIMAL_ENUM, RACE_ENUM, STAT_TYPE } from '@/domain/constants'

export const StatsBaseSchema = z.object({
  id: numericId.optional(),
  type: buildEnumRecord(STAT_TYPE),
  target: buildEnumRecord(RACE_ENUM).or(buildEnumRecord(ANIMAL_ENUM)),
  strength: z.number(),
  agility: z.number(),
  intelligence: z.number(),
  charisma: z.number(),
  stamina: z.number(),
})

export type StatsBase = z.infer<typeof StatsBaseSchema>
