import { XPRecord } from '@/infra/schemas'

export const xpRecordsSeed: XPRecord[] = [
  {
    id: 1,
    saveId: 'save_1',
    type: 'class',
    target: 'Combat Training',
    xp: 10,
  },
  {
    id: 2,
    saveId: 'save_1',
    type: 'skill',
    target: 'Night Vision',
    xp: 5,
  },
]
