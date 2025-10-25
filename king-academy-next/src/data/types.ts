import { z } from 'zod'
import {
  SaveSchema,
  SheetSchema,
  SceneSchema,
  TimeslotRuleSchema,
  MilestoneSchema,
  InventoryItemSchema,
  SettingsSchema,
} from './schemas'

// Tipos inferidos dos schemas (evita divergência entre tipo e validação)
export type Save          = z.infer<typeof SaveSchema>
export type Sheet         = z.infer<typeof SheetSchema>
export type Scene         = z.infer<typeof SceneSchema>
export type TimeslotRule  = z.infer<typeof TimeslotRuleSchema>
export type Milestone     = z.infer<typeof MilestoneSchema>
export type InventoryItem = z.infer<typeof InventoryItemSchema>
export type Settings      = z.infer<typeof SettingsSchema>

// Atalhos úteis
export type SaveId  = Save['id']
export type SceneId = Scene['id']
