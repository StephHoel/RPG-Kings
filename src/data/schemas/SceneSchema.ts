import z from 'zod'
import { s } from './_schemas'
import { WeekdaysEnum } from '@/data'

export const SceneSchema = z.object({
  id: s.sceneId,
  title: z.string(),

  //** markdown/BBCode simples */
  content: z.string(),

  options: z.array(z.string()),
  cost: z.object({
    energy: z.number().nullable(),
    coin: z.number().nullable(),
  }).nullable(),
  hours: z.array(z.number()).nullable().default([]), // if empty array, available in all hours
  weekdays: z.array(WeekdaysEnum).nullable().default([]), // if empty array, available in all weekdays
  
  //** o que é necessário para a cena acontecer
  // * pensando em usar para restringir algumas cenas a ter xp acima de n ou ter item y no inventário
  // */
  preRequire: z.object({
    energy: z.object({
      min: z.int().nullable(),
      max: z.int().nullable(),
    }),

    //** precisa ter os itens válidos no inventário na quantidade certa */
    items: z.array(z.record(z.string(), z.int().min(1))).nullable().default([]),
    
    //** personagem e reputação mínima */
    reputation: z.array(z.record(z.string(), z.int())).nullable().default([]),
  }),
})