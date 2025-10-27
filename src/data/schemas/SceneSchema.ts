import z from 'zod'
import { TimeslotEnum } from '../enums/TimeslotId'
import { SceneTagEnum } from '../enums/SceneTag'
import { s } from './_schemas'

export const SceneSchema = z.object({
  id: s.sceneId,
  title: z.string(),

  //** markdown/BBCode simples */
  content: z.string(),

  timeslots: z.array(TimeslotEnum),
  tags: z.array(SceneTagEnum),

  //** o que é necessário para a cena acontecer
  // * pensando em usar para restringir algumas cenas a ter xp acima de n ou ter item y no inventário
  // * se null, sem pré-requisitos
  // */
  preRequire: z.object({
    //** personagem e reputação mínima */
    reputation: z.array(z.record(z.string(), z.number().int())).optional(),

    //** precisa ter os itens válidos no inventário */
    items: z.array(z.string()).optional(),

    // dias possiveis
    weekdays: s.weekdays,
  }).nullable().default(null).optional(),
})