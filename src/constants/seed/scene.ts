import { SceneTagEnum, TimeslotEnum } from '@/data'
import { Scene } from '@/interfaces'

export const sceneSeed: Scene[] = [
  {
    id: 'scene_caminho_predio',
    title: 'Caminho até o prédio principal',
    timeslots: [TimeslotEnum.enum.morning],
    tags: [SceneTagEnum.enum.exploration, SceneTagEnum.enum.social],
    content: 'Você cruza o pátio e encontra alguns colegas se arrumando para o primeiro dia.',
    preRequire: null,
  },
  {
    id: 'scene_primeira_aula',
    title: 'Primeira aula do dia',
    timeslots: [TimeslotEnum.enum.morning],
    tags: [SceneTagEnum.enum.study],
    content: 'Uma explicação introdutória sobre a Academia e seus objetivos.',
    preRequire: { reputation: [{ 'stock': 0 }] },
  },
  {
    id: 'scene_treino_basico',
    title: 'Treino de habilidades',
    timeslots: [TimeslotEnum.enum.morning],
    tags: [SceneTagEnum.enum.training],
    content: 'Um exercício prático para despertar sua magia interior.',
    preRequire: {},
  },
  {
    id: 'scene_encontro_noturno',
    title: 'Encontro no pátio ao anoitecer',
    timeslots: [TimeslotEnum.enum.morning],
    tags: [SceneTagEnum.enum.social, SceneTagEnum.enum.exploration],
    content: 'Conversas baixas, promessas de aventuras e segredos sussurrados.',
    preRequire: { items: ['scene_caminho_predio'] },
  }, {
    id: 'scene_manha_aula',
    title: 'Aula de Alquimia',
    content: 'Você entra no laboratório e o cheiro de ervas toma o ar.',
    tags: [SceneTagEnum.enum.class],
    timeslots: [TimeslotEnum.enum.morning]
  },
  {
    id: 'scene_tarde_treino',
    title: 'Treino no Pátio',
    content: 'O sol das duas da tarde castiga enquanto você pratica.',
    tags: [SceneTagEnum.enum.training],
    timeslots: [TimeslotEnum.enum.afternoon]
  },
  {
    id: 'scene_noite_social',
    title: 'Clube de Estratégia',
    content: 'Um grupo se reúne para jogos táticos no salão.',
    tags: [SceneTagEnum.enum.social],
    timeslots: [TimeslotEnum.enum.night]
  },
]
