import z from 'zod'
import { idString, nonEmptyString } from './shared'

const SceneEffectSchema = z
  .object({
    stats: z.record(z.string(), z.number()).optional(),
    xp: z
      .object({
        target: z.string(),
        amount: z.number(),
      })
      .array()
      .optional(),
    items: z
      .object({
        itemId: z.string(),
        add: z.boolean(),
      })
      .array()
      .optional(),
  })
  .optional()

const PreRequireSchema = z.object({
  hours: z.number().int().array().optional(),
  itemsRequired: z
    .object({
      all: z.string().array().optional(),
      any: z.string().array().optional(),
    })
    .optional(),
  xpRequired: z
    .object({
      target: z.string(),
      min: z.number(),
    })
    .array()
    .optional(),
  skillsRequired: z.string().array().optional(),
  statsRequired: z
    .object({
      stat: z.string(),
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
  next: z.string().nullable(),
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
