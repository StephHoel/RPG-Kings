import type { EventScene } from './eventScene'
import type { GameEngine } from './gameEngine'
import type { Player } from './player'

export interface GameState {
  player: Player
  currentEvent: EventScene
  engine: GameEngine
  events: EventScene[]
  day: number
}
