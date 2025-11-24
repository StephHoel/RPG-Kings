import { Race } from '@/infra/schemas'

export const racesSeed: Race[] = [
  {
    id: 1,
    name: 'Human',
    hasAnimal: false,
    defaultAnimal: null,
  },
  {
    id: 2,
    name: 'Beastborn',
    hasAnimal: true,
    defaultAnimal: 'Wolf',
  },
  {
    id: 3,
    name: 'Skyfolk',
    hasAnimal: true,
    defaultAnimal: 'Falcon',
  },
]
