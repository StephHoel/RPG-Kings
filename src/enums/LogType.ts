import { z } from 'zod'

export const LogTypeEnum = z.enum({
  SCENE_START: 'Scene Start',
  SCENE_END: 'Scene End',
  ROLL: 'Roll',
  MILESTONE_UNLOCK: 'Milestone Unlock',
  TOAST: 'Toast',
  NETWORK: 'Network',
  ERROR: 'Error',
  INFO: 'Info'
})
