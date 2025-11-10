import type { Choice } from './choice'

export interface EventScene {
  id: number
  scene: string
  choices: Choice[]
}
