import type { Attributes } from './attributes'

export interface Player {
  id: string
  name: string
  attributes: Attributes
  inventory: string[]
  xp: number
  level: number
}
