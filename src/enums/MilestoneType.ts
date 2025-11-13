import { z } from 'zod'

export const MilestoneTypeEnum = z.enum([
  'daily',
  'weekly',
  'collection',
  'event',
  'skill',
  'social'
])
