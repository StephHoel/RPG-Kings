import z from 'zod'
import { idString, nonEmptyString } from './shared'
import { ITEM_ENUM, SKILL_ENUM, STAT_ENUM, XP_ENUM } from '@/domain/constants'

const SceneEffectSchema = z
  .object({
    stats: z.record(z.enum(STAT_ENUM), z.number()).optional(),
    xp: z.record(z.enum(XP_ENUM), z.number()).optional(),
    items: z.object({
      add: z.enum(ITEM_ENUM).array().optional(),
      remove: z.enum(ITEM_ENUM).array().optional(),
    }),
  })
  .optional()

const PreRequireSchema = z.object({
  hours: z.number().int().array().optional(),
  itemsRequired: z
    .object({
      all: z.enum(ITEM_ENUM).array().optional(),
      any: z.enum(ITEM_ENUM).array().optional(),
    })
    .optional(),
  xpRequired: z
    .object({
      target: z.string(),
      min: z.number(),
    })
    .array()
    .optional(),
  skillsRequired: z.enum(SKILL_ENUM).array().optional(),
  statsRequired: z
    .object({
      stat: z.enum(STAT_ENUM),
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .array()
    .optional(),
})

const SceneChoiceSchema = z.object({
  title: nonEmptyString,
  cost: z.object({
    stamina: z.number(),
    coin: z.number(),
    hour: z.boolean(),
  }),
  nextId: z.string().optional(),
})

export const SceneSchema = z.object({
  id: idString,
  title: nonEmptyString,
  content: nonEmptyString,
  choices: SceneChoiceSchema.array(),
  preRequire: PreRequireSchema,
  effects: SceneEffectSchema,
})

export type Scene = z.infer<typeof SceneSchema>
export type PreRequireScene = z.infer<typeof PreRequireSchema>
