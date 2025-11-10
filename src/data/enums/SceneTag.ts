import { z } from 'zod'

export const SceneTagEnum = z.enum([
  'social',
  'study',
  'training',
  'exploration',
  'class'
])
