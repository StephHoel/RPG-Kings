import { z } from 'zod'
import { LogTypeEnum } from '@/enums'
import { s } from '@/utils'

export const LogSchema = z.object({
  id: s.sequencialId.optional(),
  saveId: s.saveId.optional(),
  sceneId: s.sceneId.optional(),

  type: LogTypeEnum,
  message: z.string().optional(),
  payload: z.any().optional(),

  createdAt: s.createdAt,
})
