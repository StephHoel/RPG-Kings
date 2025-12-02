import { RACE_ENUM } from '@/domain/constants'
import { Sheet } from '@/infra/schemas'

export const sheetsSeed: Sheet[] = [
  {
    saveId: 'save_1',
    name: 'Aiden',
    race: RACE_ENUM.werewolf,
    coins: 10,
  },
]
