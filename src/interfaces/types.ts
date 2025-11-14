import { LogTypeEnum } from '@/enums'
import { SaveSchema, SheetSchema, SceneSchema, MilestoneSchema, InventorySchema, ItemSchema, SettingsSchema, LogRowSchema } from '@/schemas'
import { z } from 'zod'

// schemas
export type Save = z.infer<typeof SaveSchema>
export type Sheet = z.infer<typeof SheetSchema>
export type Scene = z.infer<typeof SceneSchema>
export type Milestone = z.infer<typeof MilestoneSchema>
export type Inventory = z.infer<typeof InventorySchema>
export type Item = z.infer<typeof ItemSchema>
export type Settings = z.infer<typeof SettingsSchema>
export type LogRow = z.infer<typeof LogRowSchema>

// enums
export type LogType = z.infer<typeof LogTypeEnum>
export type LogCategoryLabels = LogType | 'all'

// Atalhos úteis
export type SaveId = Save['id']
export type SceneId = Scene['id']
