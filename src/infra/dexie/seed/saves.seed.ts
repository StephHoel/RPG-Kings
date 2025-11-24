import { Save } from '@/infra/schemas'

export const savesSeed: Save[] = [
  {
    // SaveInicialParaTeste
    id: 'save_1',
    isActive: true,
    currentWeek: 1,
    currentDay: 1,
    currentHour: 8,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
]
