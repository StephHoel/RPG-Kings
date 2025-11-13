import { z } from 'zod'
import { LogTypeEnum } from '../enums/LogType'
import { s } from './_schemas'

export const LogRowSchema = z.object({
  id: s.sequencialId.optional(),
  saveId: s.saveId.optional(),
  sceneId: s.sceneId.optional(),

  type: LogTypeEnum,
  message: z.string().optional(),
  payload: z.any().optional(),

  createdAt: s.createdAt,
})