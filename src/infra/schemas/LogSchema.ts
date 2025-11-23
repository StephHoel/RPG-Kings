import { z } from 'zod'
import { LogTypeEnum } from '@/core/enums'
import { s } from '@/core/utils'

export const LogSchema = z.object({
  id: s.sequencialId.optional(),
  saveId: s.saveId.optional(),
  sceneId: s.sceneId.optional(),

  type: LogTypeEnum,
  message: z.string().optional(),
  payload: z.any().optional(),

  createdAt: s.createdAt,
})
