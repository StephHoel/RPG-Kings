import { z } from 'zod'

export const LogTypeEnum = z.enum([
  'scene_start',
  'scene_end',
  'roll',
  'milestone_unlock',
  'toast',
  'network',
  'error',
  'info'
])
