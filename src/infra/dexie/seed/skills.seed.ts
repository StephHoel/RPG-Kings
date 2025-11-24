import { Skill } from '@/infra/schemas'

export const skillsSeed: Skill[] = [
  { id: 1, name: 'Night Vision', type: 'fixed', races: ['Beastborn'] },
  { id: 2, name: 'Wind Glide', type: 'fixed', races: ['Skyfolk'] },
  { id: 3, name: 'Alchemy', type: 'develop', races: ['Human', 'Skyfolk'] },
]
