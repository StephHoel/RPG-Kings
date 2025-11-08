export const ruleSeed = [

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
]