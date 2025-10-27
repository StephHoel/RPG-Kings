import { SceneTagEnum } from '@/data/enums/SceneTag'
import { TimeslotEnum } from '@/data/enums/TimeslotId'
import { Scene } from '@/data/types'

export const sceneSeed: Scene[] = [
  {
    id: 'scene-caminho-predio',
    title: 'Caminho até o prédio principal',
    timeslots: [TimeslotEnum.enum.morning],
    tags: [SceneTagEnum.enum.exploration, SceneTagEnum.enum.social],
    content: 'Você cruza o pátio e encontra alguns colegas se arrumando para o primeiro dia.',
    preRequire: null,
  },
  {
    id: 'scene-primeira-aula',
    title: 'Primeira aula do dia',
    timeslots: [TimeslotEnum.enum.morning],
    tags: [SceneTagEnum.enum.study],
    content: 'Uma explicação introdutória sobre a Academia e seus objetivos.',
    preRequire: { reputation: [{ "stock": 0 }] },
  },
  {
    id: 'scene-treino-basico',
    title: 'Treino de habilidades',
    timeslots: [TimeslotEnum.enum.morning],
    tags: [SceneTagEnum.enum.training],
    content: 'Um exercício prático para despertar sua magia interior.',
    preRequire: {  },
  },
  {
    id: 'scene-encontro-noturno',
    title: 'Encontro no pátio ao anoitecer',
    timeslots: [TimeslotEnum.enum.morning],
    tags: [SceneTagEnum.enum.social, SceneTagEnum.enum.exploration],
    content: 'Conversas baixas, promessas de aventuras e segredos sussurrados.',
    preRequire: { items: ['scene-caminho-predio'] },
  },
]
