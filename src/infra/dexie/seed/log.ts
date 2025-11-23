import { Log } from '@/infra/schemas'

export const logSeed: Log[] = [
  {
    type: 'info',
    message: 'Seed inicial de logs',
    createdAt: new Date(),
  },
  {
    type: 'info',
    message: 'Cena de boas-vindas',
    payload: { seed: 42, saveId: 'save-1', sceneId: 'scene-caminho-predio' },
    createdAt: new Date(),
  },
  {
    type: 'info',
    message: 'Rolagem de teste',
    payload: { d20: 12, mod: +3, saveId: 'save-1', sceneId: 'scene-caminho-predio' },
    createdAt: new Date(),
  },
  {
    type: 'info',
    message: 'Marcou milestone fake',
    payload: { milestone: 'milestone-primeiro-passo', saveId: 'save-1' },
    createdAt: new Date(),
  },
  {
    type: 'info',
    message: 'Progresso salvo',
    createdAt: new Date(),
  },
  {
    type: 'error',
    message: 'Falha simulada',
    payload: { reason: 'simulação' },
    createdAt: new Date(),
  },
]
