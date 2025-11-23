import { z } from 'zod'
import { WeekdaysEnum } from '@/core/enums'

export const s = {
  sequencialId: z.number().nonnegative().min(1),
  saveId: z.string(),
  sceneId: z.string(),

  updatedAt: z.date().default(() => new Date()),
  createdAt: z.date().default(() => new Date()),

  weekdays: z.array(WeekdaysEnum).optional(),
  weekdaysNullable: z.array(WeekdaysEnum).nullable().default(null).optional(),

  hours: z.array(z.number().int().min(0).max(23)).nullable().default(null).optional(),

  weeks: z.array(z.number().int().min(1)).nullable().default(null).optional(),

  stats: z.number().int().default(0).optional(),
}
