export const ANIMAL_ENUM = {
  wolf: 'Lobo',
  bear: 'Urso',
  lion: 'Leão',
  tiger: 'Tigre',
  eagle: 'Águia',
  hawk: 'Falcão',
  owl: 'Coruja',
  snake: 'Cobra',
  horse: 'Cavalo',
  fox: 'Raposa',
  dog: 'Cachorro',
  cat: 'Gato',
  kitsune: 'Raposa de 9 Caudas',
} as const

// Tipo derivado
export type AnimalEnum = (typeof ANIMAL_ENUM)[keyof typeof ANIMAL_ENUM]
