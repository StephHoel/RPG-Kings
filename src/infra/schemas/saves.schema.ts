import { z } from 'zod'
import { idString, isoDate } from './shared'

export const SaveSchema = z.object({
  id: idString,
  isActive: z.boolean(),
  currentWeek: z.number().int().nonnegative(),
  currentDay: z.number().int().nonnegative(),
  currentHour: z.number().int().nonnegative(),
  updatedAt: isoDate,
  createdAt: isoDate,
})

export type Save = z.infer<typeof SaveSchema>
