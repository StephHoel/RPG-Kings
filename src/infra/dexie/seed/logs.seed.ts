import { LOG_TYPE } from '@/domain/constants'
import { Log } from '@/infra/schemas'

export const logsSeed: Log[] = [
  {
    type: LOG_TYPE.info,
    message: 'Banco populado com sucesso.',
    payload: { saveId: 'save_1' },
    createdAt: new Date(),
  },
]
