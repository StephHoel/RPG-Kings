import z from 'zod'
import { ThemeColorEnum } from '@/core/enums'
import { s } from '@/core/utils'

// TODO pensar se vamos usar configurações, hoje não é necessário e não vejo motivo para usar
export const SettingsSchema = z.object({
  id: z.literal('singleton'),
  fontScale: z.number().min(0.8).max(1.5),
  theme: ThemeColorEnum,
  highContrast: z.boolean().optional(),

  updatedAt: s.updatedAt,
})
