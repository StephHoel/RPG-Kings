import z from 'zod'

export const AnimalsEnum = z.enum({
  Wolf: 'Lobo',
  Bear: 'Urso',
  Lion: 'Leão',
  Tiger: 'Tigre',
  Eagle: 'Águia',
  Hawk: 'Falcão',
  Owl: 'Coruja',
  Snake: 'Cobra',
  Horse: 'Cavalo',
  Fox: 'Raposa',
  Dog: 'Cachorro',
  Cat: 'Gato',
})

export const KitsuneEnum = z.enum({
  Kitsune: 'Raposa de 9 Caudas',
})
