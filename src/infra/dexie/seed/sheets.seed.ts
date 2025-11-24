import { Sheet } from '@/infra/schemas'

export const sheetsSeed: Sheet[] = [
  {
    id: 1,
    saveId: 'save_1',
    name: 'Aiden',
    race: 'Beastborn',
    animal: 'Wolf',
    coins: 10,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
]
