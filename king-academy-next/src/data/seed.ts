
import { db } from './db'
import type { Scene, TimeslotRule } from './types'

async function seedScenes() {
  const scenes: Scene[] = [
    { id: 'scene_manha_aula', title: 'Aula de Alquimia', content: 'Você entra no laboratório e o cheiro de ervas toma o ar.', tags: ['aula','manhã'] },
    { id: 'scene_tarde_treino', title: 'Treino no Pátio', content: 'O sol das duas da tarde castiga enquanto você pratica.', tags: ['treino','tarde'] },
    { id: 'scene_noite_social', title: 'Clube de Estratégia', content: 'Um grupo se reúne para jogos táticos no salão.', tags: ['social','noite'] },
  ]
  await db.scenes.bulkPut(scenes)
}

async function seedTimeslots() {
  const rules: TimeslotRule[] = [
    {
      id: 'rule_manha_dias_uteis',
      weekdays: [1,2,3,4,5],
      hours: [8,9,10,11],
      scenePool: [
        { sceneId: 'scene_manha_aula', weight: 3 },
        { sceneId: 'scene_tarde_treino', weight: 1 },
      ],
    },
    {
      id: 'rule_tarde',
      hours: [14,15,16],
      scenePool: [
        { sceneId: 'scene_tarde_treino', weight: 2 },
        { sceneId: 'scene_manha_aula', weight: 1 },
      ],
    },
    {
      id: 'rule_noite',
      hours: [19,20,21],
      scenePool: [
        { sceneId: 'scene_noite_social', weight: 2 },
        { sceneId: 'scene_tarde_treino', weight: 1 },
      ],
    },
  ]
  await db.timeslots.bulkPut(rules)
}

export async function seedAll() {
  await seedScenes()
  await seedTimeslots()
}
