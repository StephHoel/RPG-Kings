import { db } from './db'

export async function seedAll() {
  const candidateSeeds: Record<string, any[]> = {
    scenes: [
      {
        id: 'scene_manha_aula',
        title: 'Aula de Alquimia',
        content: 'Você entra no laboratório e o cheiro de ervas toma o ar.',
        tags: ['class'],
        timeslots: ['morning']
      },
      {
        id: 'scene_tarde_treino',
        title: 'Treino no Pátio',
        content: 'O sol das duas da tarde castiga enquanto você pratica.',
        tags: ['training'],
        timeslots: ['afternoon']
      },
      {
        id: 'scene_noite_social',
        title: 'Clube de Estratégia',
        content: 'Um grupo se reúne para jogos táticos no salão.',
        tags: ['social'],
        timeslots: ['night']
      },
    ],
    rules: [
      {
        id: 'rule_manha_dias_uteis',
        weekdays: [
          'Monday',
          'Tuesday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        hours: [8, 9, 10, 11],
        scenes: [
          'scene_manha_aula',
          'scene_tarde_treino'
        ],
      },
      {
        id: 'rule_tarde',
        hours: [14, 15, 16],
        scenes: [
          'scene_tarde_treino',
          'scene_manha_aula',
        ],
      },
      {
        id: 'rule_noite',
        hours: [19, 20, 21],
        scenes: [
          'scene_noite_social',
          'scene_tarde_treino',
        ],
      },
    ],
    items: [
      { id: 'item_pocao_pequena', name: 'Poção Pequena', description: 'Restaura uma pequena quantidade de HP' },
      { id: 'item_pedra_mistica', name: 'Pedra Mística', description: 'Material raro para alquimia' },
    ],
    characters: [
      { id: 'char_aluno_01', name: 'Lina', role: 'student' },
      { id: 'char_professor_01', name: 'Professor Orion', role: 'teacher' },
    ],
    reputations: [
      { id: 'rep_vilarejo', faction: 'vilarejo', value: 0 },
    ],
    tags: [
      { id: 'tag_class', name: 'class' },
      { id: 'tag_training', name: 'training' },
      { id: 'tag_social', name: 'social' },
    ],
    quests: [
      { id: 'quest_intro', title: 'Primeira Prova', status: 'available' },
    ],
  }

  for (const [tableName, entries] of Object.entries(candidateSeeds)) {
    const table = (db as any)[tableName]
    if (!table) continue

    const count = typeof table.count === 'function' ? await table.count() : (await table.toArray()).length
    if (count > 0) {
      console.info(`${tableName} já tem dados — pulando`)
      continue
    }

    try {
      if (typeof table.bulkPut === 'function') {
        await table.bulkPut(entries)
      } else if (typeof table.put === 'function') {
        // fallback: inserir um a um
        for (const e of entries) await table.put(e)
      } else {
        console.warn(`Tabela ${tableName} não expõe métodos de escrita conhecidos — pulando`)
        continue
      }
      console.info(`Seeded ${tableName} (${entries.length} itens)`)
    } catch (err) {
      console.error(`Falha ao semear ${tableName}:`, err)
    }
  }
}
