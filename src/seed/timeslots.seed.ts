import { TimeslotEnum } from '@/data/enums/TimeslotId'
import { TimeslotRule } from '@/data/types'

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
];
