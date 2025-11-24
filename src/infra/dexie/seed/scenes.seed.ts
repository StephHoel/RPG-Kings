import { Scene } from '@/infra/schemas'

export const scenesSeed: Scene[] = [
  {
    id: 'intro_01',
    title: 'Acordar no Dormitório',
    content: '[b]Você acorda com o som de um sino distante...[/b]',
    choices: [
      {
        title: 'Levantar imediatamente',
        cost: { stamina: 5, coin: 0, hour: true },
        next: 'campus_01',
      },
      {
        title: 'Dormir mais um pouco',
        cost: { stamina: 0, coin: 0, hour: true },
        next: null,
      },
    ],
    preRequire: {
      hours: [7],
      statsRequired: [
        {
          stat: 'stamina',
          min: 0,
          max: 100,
        },
      ],
    },
  },
  {
    id: 'campus_01',
    title: 'Primeiro Dia no Campus',
    content: 'O campus está movimentado...',
    choices: [
      {
        title: 'Ir ao refeitório',
        cost: { stamina: 10, coin: 2, hour: true },
        next: null,
      },
    ],
    preRequire: {
      hours: [8],
      statsRequired: [
        {
          stat: 'stamina',
          min: 10,
          max: 100,
        },
      ],
    },
  },
]
