import { z } from 'zod'
import { InventoryItemSchema, LogRowSchema, LogTypeEnum, MilestoneSchema, SaveSchema, SceneSchema, SettingsSchema, SheetSchema } from '@/data'

// schemas
export type Save = z.infer<typeof SaveSchema>
export type Sheet = z.infer<typeof SheetSchema>
export type Scene = z.infer<typeof SceneSchema>
export type Milestone = z.infer<typeof MilestoneSchema>
export type InventoryItem = z.infer<typeof InventoryItemSchema>
export type Settings = z.infer<typeof SettingsSchema>
export type LogRow = z.infer<typeof LogRowSchema>

// enums
export type LogType = z.infer<typeof LogTypeEnum>
export type LogCategoryLabels = LogType | 'all'

// Atalhos úteis
export type SaveId = Save['id']
export type SceneId = Scene['id']
