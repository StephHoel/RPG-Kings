import { z } from 'zod'
import { InventoryItemSchema, LogRowSchema, MilestoneSchema, SaveSchema, SceneSchema, SettingsSchema, SheetSchema, TimeslotRuleSchema } from '@/data/schemas'

// schemas
export type Save = z.infer<typeof SaveSchema>
export type Sheet = z.infer<typeof SheetSchema>
export type Scene = z.infer<typeof SceneSchema>
export type TimeslotRule = z.infer<typeof TimeslotRuleSchema>
export type Milestone = z.infer<typeof MilestoneSchema>
export type InventoryItem = z.infer<typeof InventoryItemSchema>
export type Settings = z.infer<typeof SettingsSchema>
export type LogRow = z.infer<typeof LogRowSchema>

// Atalhos úteis
export type SaveId = Save['id']
export type SceneId = Scene['id']
