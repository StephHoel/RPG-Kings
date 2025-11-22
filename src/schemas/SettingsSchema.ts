import z from 'zod'
import { ThemeColorEnum } from '@/enums'
import { s } from '@/utils'

// TODO pensar se vamos usar configurações, hoje não é necessário e não vejo motivo para usar
export const SettingsSchema = z.object({
  id: z.literal('singleton'),
  fontScale: z.number().min(0.8).max(1.5),
  theme: ThemeColorEnum,
  highContrast: z.boolean().optional(),

  updatedAt: s.updatedAt,
})
