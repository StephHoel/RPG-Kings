import { Log } from '@/infra/schemas'

export const logsSeed: Log[] = [
  {
    id: 1,
    type: 'info',
    message: 'Banco populado com sucesso.',
    payload: { saveId: 'save_1' },
    createdAt: new Date(),
  },
]
