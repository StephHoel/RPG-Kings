import { z } from 'zod'

export const SaveSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  createdAt: z.number(),
  updatedAt: z.number(),
  isActive: z.boolean(),
  // relógio in-game
  currentWeek: z.number().int().min(1),
  currentDay: z.union([
    z.literal(0), z.literal(1), z.literal(2),
    z.literal(3), z.literal(4), z.literal(5), z.literal(6),
  ]),
  currentHour: z.number().int().min(0).max(23),
})

export const SheetSchema = z.object({
  id: z.string(),                           // mesmo id do save
  attrs: z.record(z.string(), z.number()),              // ex.: for, agi, int...
  skills: z.record(z.string(), z.number()),             // perícias
  reputation: z.record(z.string(), z.number()).optional(), // opcional no MVP
  coins: z.number().int().nonnegative(),
  tags: z.array(z.string()),
})

export const SceneSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string(),                      // markdown/BBCode simples
  tags: z.array(z.string()).optional(),     // ex.: aula, treino, social
  requires: z.array(z.string()).optional(), // flags/checks opcionais
})

export const TimeslotRuleSchema = z.object({
  id: z.string(),
  // quando vale (todos opcionais; se omitidos, “vale para todos”)
  weekdays: z
    .array(z.union([
      z.literal(0), z.literal(1), z.literal(2),
      z.literal(3), z.literal(4), z.literal(5), z.literal(6),
    ]))
    .optional(),
  hours: z.array(z.number().int().min(0).max(23)).optional(),
  weeks: z.array(z.number().int().min(1)).optional(),
  // pool de cenas possíveis nesse timeslot
  scenePool: z.array(z.object({
    sceneId: z.string(),
    weight: z.number().int().positive().optional(), // peso default = 1
  })),
  requiresTags: z.array(z.string()).optional(), // filtra por tags do Save/Sheet
})

export const MilestoneSchema = z.object({
  id: z.string(),
  saveId: z.string(),
  type: z.enum(['daily','weekly','collection','event','skill','social']),
  key: z.string(),                       // ex.: 'assistir_5_aulas'
  current: z.number().int().nonnegative(),
  target: z.number().int().positive(),
  achievedAtWeek: z.number().int().min(1).optional(), // semana em que concluiu
})

export const InventoryItemSchema = z.object({
  id: z.string(),
  saveId: z.string(),
  name: z.string(),
  quantity: z.number().int().min(1),
  acquiredWeek: z.number().int().min(1),            // “quando comprou”
  durationWeeks: z.number().int().min(0),           // 0 = ilimitado
  expiresAtWeek: z.number().int().min(1).nullable(),// null = ainda válido
  tags: z.array(z.string()).optional(),
})

export const SettingsSchema = z.object({
  id: z.literal('singleton'),
  fontScale: z.number().min(0.8).max(1.5),
  theme: z.enum(['system','light','dark']),
  highContrast: z.boolean().optional(),
})
