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
]
