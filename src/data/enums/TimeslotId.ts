import { z } from 'zod'

export const TimeslotEnum = z.enum([
  'morning',
  'afternoon',
  'night',
  'dawn'
])
