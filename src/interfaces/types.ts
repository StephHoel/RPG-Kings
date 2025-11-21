import {
  AnimalsEnum,
  DevelopSkillsEnum,
  FixedSkillsEnum,
  KitsuneEnum,
  LogTypeEnum,
  RacesEnum,
} from '@/enums'
import {
  SaveSchema,
  SheetSchema,
  SceneSchema,
  MilestoneSchema,
  InventorySchema,
  ItemSchema,
  SettingsSchema as SettingSchema,
  LogSchema,
  DisciplineSchema,
} from '@/schemas'
import { z } from 'zod'

// schemas
export type Save = z.infer<typeof SaveSchema>
export type Sheet = z.infer<typeof SheetSchema>
export type Scene = z.infer<typeof SceneSchema>
export type Milestone = z.infer<typeof MilestoneSchema>
export type Inventory = z.infer<typeof InventorySchema>
export type Item = z.infer<typeof ItemSchema>
export type Setting = z.infer<typeof SettingSchema>
export type Log = z.infer<typeof LogSchema>
export type Discipline = z.infer<typeof DisciplineSchema>

// enums
export type LogType = z.infer<typeof LogTypeEnum>
export type Races = z.infer<typeof RacesEnum>
export type Animals = z.infer<typeof AnimalsEnum>
export type Kitsune = z.infer<typeof KitsuneEnum>
export type LogCategoryLabels = LogType | 'all'
export type DevelopSkill = z.infer<typeof DevelopSkillsEnum>
export type FixedSkill = z.infer<typeof FixedSkillsEnum>
export type Skills = DevelopSkill | FixedSkill

// Atalhos úteis
export type SaveId = Save['id']
export type SceneId = Scene['id']
export type Stats = Sheet['stats']
