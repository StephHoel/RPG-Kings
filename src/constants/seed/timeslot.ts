import { TimeslotEnum } from '@/data'
import { TimeslotRule } from '@/interfaces'

export const timeslotSeed: TimeslotRule[] = [
  {
    id: TimeslotEnum.enum.morning,
    scenes: []
  },
  {
    id: TimeslotEnum.enum.afternoon,
    scenes: []
  },
  {
    id: TimeslotEnum.enum.night,
    scenes: []
  },
]
