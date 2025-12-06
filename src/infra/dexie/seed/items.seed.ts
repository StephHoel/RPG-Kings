import { ITEM_ENUM, ITEM_TYPE } from '@/domain/constants'
import { Item } from '@/infra/schemas'

export const itemsSeed: Item[] = [
  {
    name: ITEM_ENUM.notebook,
    description: 'Permite escrever e desenhar por 6 meses',
    cost: 5,
    durationWeeks: 26,
    type: ITEM_TYPE.wearable,
  },
  {
    name: ITEM_ENUM.laptop,
    description: 'Permite acessar a internet, realizar trabalhos escolares, entre outros por 1 ano',
    cost: 50,
    durationWeeks: 60,
    type: ITEM_TYPE.eletronic,
  },
  {
    name: ITEM_ENUM.nanotraje,
    description:
      'Conjunto íntimo altamente tecnológico que adapta-se ao corpo sobrenatural e evita que o usuário fique sem roupa ao transformar-se',
    cost: 200,
    durationWeeks: 520,
    type: ITEM_TYPE.wearable,
  },
  {
    name: ITEM_ENUM.pasta_notebook,
    description:
      'Bolsa protetora para transportar um notebook e documentos, com compartimentos internos',
    cost: 10,
    durationWeeks: 104,
    type: ITEM_TYPE.wearable,
  },
  {
    name: ITEM_ENUM.mochila,
    description:
      'Mochila escolar resistente para carregar livros, cadernos e equipamentos pessoais',
    cost: 15,
    durationWeeks: 156,
    type: ITEM_TYPE.wearable,
  },
]
