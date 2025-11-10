import { Milestone } from '@/interfaces'

export const milestoneSeed: Milestone[] = [
  {
    id: 1,
    description: 'Primeiro passo',
    saveId: '',
    type: 'daily',
    achievedAtWeek: 0,
    createdAt: new Date()
  },
  {
    id: 2,
    description: 'Aluno iniciado',
    saveId: '',
    type: 'event',
    achievedAtWeek: 0,
    createdAt: new Date()
  },
  {
    id: 3,
    description: 'Treinamento começou',
    saveId: '',
    type: 'skill',
    achievedAtWeek: 0,
    createdAt: new Date()
  },
]
