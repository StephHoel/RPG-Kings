import { z } from 'zod'

export const ThemeColorEnum = z.enum([
  'system',
  'light',
  'dark'
])
