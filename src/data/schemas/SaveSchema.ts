import { z } from 'zod'
import { WeekdaysEnum } from '../enums/WeekDays'
import { s } from './_schemas'

export const SaveSchema = z.object({
  id: s.saveId,

  name: z.string().min(1),
  isActive: z.boolean(),
  currentWeek: z.number().int().min(1),
  currentDay: WeekdaysEnum,
  currentHour: z.number().int().min(0).max(23),

  updatedAt: s.updatedAt.optional(),
  createdAt: s.createdAt.optional(),
})