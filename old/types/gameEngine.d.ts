import type { GameState } from './GameState'

export interface GameEngine {
  applyChoice: (state: GameState, choiceIdx: number) => GameState
}