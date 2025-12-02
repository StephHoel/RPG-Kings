import { z } from 'zod'
import { idString, isoDateOptional } from './shared'

export const SaveSchema = z.object({
  id: idString,
  isActive: z.boolean(),
  currentWeek: z.number().int().nonnegative(),
  currentDay: z.number().int().nonnegative(),
  currentHour: z.number().int().nonnegative(),
  updatedAt: isoDateOptional,
  createdAt: isoDateOptional,
})

export type Save = z.infer<typeof SaveSchema>
