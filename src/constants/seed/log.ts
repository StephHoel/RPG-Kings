import { LogTypeEnum } from '@/enums'
import { Log } from '@/interfaces'

export const logSeed: Log[] = [
  {
    type: LogTypeEnum.enum.INFO,
    message: 'Seed inicial de logs',
    createdAt: new Date(),
  },
  {
    type: LogTypeEnum.enum.SCENE_START,
    message: 'Cena de boas-vindas',
    payload: { seed: 42, saveId: 'save-1', sceneId: 'scene-caminho-predio' },
    createdAt: new Date(),
  },
  {
    type: LogTypeEnum.enum.ROLL,
    message: 'Rolagem de teste',
    payload: { d20: 12, mod: +3, saveId: 'save-1', sceneId: 'scene-caminho-predio' },
    createdAt: new Date(),
  },
  {
    type: LogTypeEnum.enum.MILESTONE_UNLOCK,
    message: 'Marcou milestone fake',
    payload: { milestone: 'milestone-primeiro-passo', saveId: 'save-1' },
    createdAt: new Date(),
  },
  {
    type: LogTypeEnum.enum.TOAST,
    message: 'Progresso salvo',
    createdAt: new Date(),
  },
  {
    type: LogTypeEnum.enum.ERROR,
    message: 'Falha simulada',
    payload: { reason: 'simulação' },
    createdAt: new Date(),
  },
]
